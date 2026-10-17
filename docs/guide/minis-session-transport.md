# Minis 跨站业务会话：Bearer 与 Cookie 分开

本次实现用于“平台域 H5 → 自有 HTTPS API”，不依赖第三方 Cookie，不提供或假定 `TTMinis.request`。
TikTok 的 code 仍由业务后端调用现有 OAuth 换码函数兑换，平台 access/refresh token 仍只加密保存在后端。

## 1. 会话来源与兼容

| 场景 | 传输 | 服务端来源标记 |
|---|---|---|
| 管理员、本地注册/登录用户 | 原 `drama_session` HttpOnly Cookie | `cookie` |
| 新 Minis 登录 | `Authorization: Bearer <业务令牌>` | `minis-bearer` |
| 升级前已存在的 Cookie 会话 | 原 Cookie 继续可用 | 关联表没有记录时按 `cookie` 解释 |

原 `sessions`、`users`、`orders`、`entitlements` 结构和数据不重置。只追加：

```sql
CREATE TABLE IF NOT EXISTS session_transports (
 token_hash TEXT PRIMARY KEY REFERENCES sessions(token_hash) ON DELETE CASCADE,
 transport TEXT NOT NULL CHECK(transport IN ('cookie','minis-bearer'))
);
CREATE TABLE IF NOT EXISTS session_origins (
 token_hash TEXT PRIMARY KEY REFERENCES sessions(token_hash) ON DELETE CASCADE,
 origin TEXT NOT NULL
);
```

新会话与来源标记在同一事务写入。Cookie 令牌即使格式与 Bearer 一样，也不能作为 Bearer 使用；反向也不成立。
Bearer 只授予 `provider=tiktok`、`role=user` 的账户；管理接口以及本地登录、注册、改密码接口只接受 Cookie 路径。
新的 Bearer 同时绑定登录引导时已验证的页面 Origin。旧 Cookie 不需要这条绑定；旧版没有来源绑定的 Bearer 必须重新登录，不按首次请求补写来源。

业务 Bearer 为 `randomBytes(32)` 的 64 位小写十六进制字符串，具有 256 bit 随机性，期限固定 **15 分钟**。
数据库仅保存整段令牌的 SHA-256；不使用 JWT，不把平台 token 下发给页面。

## 2. 明确的无 Cookie 登录引导

```http
POST /api/auth/tiktok
Content-Type: application/json
X-Requested-With: DramaVerseJP
X-Session-Transport: minis-bearer
Origin: <精确的受信任页面Origin>
```

```json
{ "code": "<本次新获得的一次性code>" }
```

必须 **没有 Cookie、没有 Authorization**。前端 `api` 的 `session: 'minis-bootstrap'` 只允许用于这个 POST：
自动使用 `credentials: 'omit'`、禁止重定向、不附加旧令牌，不进行自动重登或请求重放。

成功响应保留原 SessionInfo，并增加：

```json
{
  "user": { "id": "<原业务UUID>", "provider": "tiktok", "role": "user" },
  "entitlements": [],
  "vipExpiresAt": null,
  "businessSession": {
    "token": "<64位业务随机令牌>",
    "tokenType": "Bearer",
    "expiresAt": 0
  }
}
```

`user` 实际包含原有完整公开字段；示例仅列关键字段。`expiresAt` 实际为到期 Unix 毫秒时间戳，`0` 仅为占位。
响应不设置 Cookie；平台 access/refresh token 不在响应中。`/api/auth/me` 不返回业务令牌。

`client_key:open_id` 仍查找原 `users.id`，同一用户重新登录不建第二个账户。
旧 Cookie **会话**兼容，但无显式标记的旧 `/api/auth/tiktok` **登录请求**不再受支持：到达认证路由时返回 `400/MINIS_BOOTSTRAP_REQUIRED`，跨站写策略也可能更早拒绝请求。不能再把管理员 Cookie 换成 TikTok Cookie。

## 3. 冲突、校验与跨站写

- Cookie 与 Authorization 同时出现：`400/SESSION_CREDENTIAL_CONFLICT`，即使值相同也不选一边、不降级。
- 登录引导带 Cookie 或 Authorization：同样拒绝，不兑换 code、不替换管理员会话。
- Authorization 存在但无效、过期、已撤销，或账户禁用/来源标记不匹配：`401/UNAUTHENTICATED`，不回退 Cookie。
- Bearer 进入管理端或本地 Cookie 专用接口：`403/COOKIE_SESSION_REQUIRED`。
- 登录引导必须带受信任的精确 Origin。Bearer 请求带 Origin 时，必须同时匹配会话绑定值和当前白名单；错误 Origin 不能用其他头覆盖，`Origin: null` 不获特例。
- 无 Origin 的 Bearer 仅在下方列明的同源 GET/HEAD 条件下允许；其他方法和不能确认来源的请求仍拒绝。
- 普通 Cookie 路径原有的 Origin、写入标记、SameSite/Secure 和限流行为保留。

预检现在理解 `authorization` 与 `x-session-transport`，但只在适用路径允许；写入仍需 `x-requested-with`。
OPTIONS 没有真实 token，只校验来源、方法和声明头。**预检通过不代表实际请求已登录**。

原本两处 `Sec-Fetch-Site: cross-site` 的写入限制现在仅额外允许：

1. 正确、无 Cookie 的 TikTok 登录引导；
2. 通过数据库核验的 Minis Bearer，且目标不是 Cookie 专用路径。

因此仅伪造一个 Authorization 头不能绕过 Cookie/管理员写保护。不需要把管理员 Cookie 改为 `SameSite=None`。
已允许来源的错误响应仍保留 CORS 响应头。

### 同源 GET/HEAD 与跨站请求

标准浏览器同源 GET/HEAD 可能不带 Origin。当前代码在保留来源校验的前提下支持这一情况：

1. 必须是 GET/HEAD；写请求不能使用此例外。
2. 浏览器 Fetch Metadata 必须表明 `same-origin`，并具有允许的请求模式及 `empty` 目的类型。
3. 由请求协议和主机解析出的规范 Origin，必须等于这枚会话的绑定来源，且仍在白名单。
4. 只有明确配置为可信的代理可影响协议／主机解析；不可信的 forwarded 头不能改变判断。

这不是“看到同源头就登录”，仍要验证真正的 Bearer、账户、期限和来源绑定。测试使用浏览器自然发送的头，没有手工给同源 GET/HEAD 填 Origin；管理员同源 Cookie 路径保持不变。

Minis 包必须正确设置绝对 HTTPS `VITE_API_BASE` 和 API 的 `allowedOrigins`，同时完成平台请求目的域登记；
默认相对 `/api` 不会自动转发到自有域。本任务没有读取真实环境文件或验证控制台配置。

## 4. 前端内存与恢复

凭据只位于 `/Users/xuan/Desktop/cursor/tiktok/app/tt-minis/src/utils/session-transport.ts` 的模块闭包：
不放入 Pinia 状态、localStorage、sessionStorage、URL、日志。

- Minis 自动请求使用 `credentials: 'omit'`，只有固定业务 API 收到 Bearer。
- 原网页模式仍使用 Cookie；不能手工通过 `api` 的 headers 注入 Cookie/Authorization/传输标记。
- 首次初始化、刷新后令牌丢失或客户端期限到达：通过同一个进行中的任务取得新 code，再向真实业务后端登录。
- 先安装令牌，再更新用户状态/加载私有数据；刷新令牌时不在登录函数内部递归加载私有数据，避免循环等待。
- 首次换码成功不会提前把完整会话标记为“初始化完成”；页面等待 `/auth/me` 和私有数据加载结束，避免播放器在身份更新时重复加载并误报作品不存在。
- 同账户、同权益的纯凭据续期不清空片库。权益按字段内容稳定排序比较，不用数组引用判断是否变化。
- 权益确实变化时仍清理片库；正在读取的目录／详情只在账户未变化时最多重新 GET 一次，重新取得当前权限的数据，不直接采用失效结果。退出和换号后不替新账户重读旧操作。
- 服务端返回 401 后可恢复登录；GET/HEAD 最多重试一次。
- **POST/PUT/PATCH/DELETE 不重放**：恢复了登录也返回原请求失败，尤其不自动重发订单/支付请求。网络异常同样不重放。
- 重新登录发现账户变化，不把原用户发起的请求转给新用户。
- 显式退出会暂停本页面自动登录；需要显式登录，或整页重新进入。否则页面刷新函数会把用户刚退出的状态自动登录回来。

退出先取走当前令牌并立即清理页面状态，再用明确的 `revokeBearer` 模式撤销该令牌；
这种模式只允许 POST `/auth/logout`，不带 Cookie、不重登。
无令牌的 Minis 退出不会调用 Cookie 退出路径。网络失败会如实提示，服务器的最长期限仍是 15 分钟。

## 5. 异步和迟到结果

内存凭据有独立的操作序号，用户状态继续使用原来的 generation：

- 退出/换号后才拿到的 code 不再兑换；
- 后端登录响应迟到时不安装，尽力用这枚新令牌撤销它，不触碰当前 Cookie 或新账户；
- 已拿到 200 响应头、但稍后才拿到正文的请求，JSON 解析后再检查身份，防止旧账户数据流入新账户；
- 旧订单请求的清理只能删除自身仍拥有的并发记录，不能删除同用户新会话的新请求记录；
- 旧请求的 401 不能清掉后续登录的新令牌。

由于客户端断网/关闭页面等因素，迟到会话的撤销是尽力执行，不能保证远端每次都收到；令牌不安装到页面，且服务端期限限制仍生效。
没有把“客户端清内存”冒充为“服务器一定完成撤销”。

## 6. 对媒体及其他服务端调用者的语义

`ctx.user(req)` 与 `ctx.sessionHash(req)` 的对外调用形状保持不变。
两者每次都重新读取 sessions、transport、到期及禁用状态，不缓存上一次查询结果；无效会话返回 null。

媒体等异步流程应继续在外部调用之后重查两者，比较用户与会话是否还是发起请求时的值。
退出、过期、禁用、将用户改成不允许的角色、或来源不匹配后，旧的请求对象不会继续获得旧身份。
本任务没有修改媒体、支付、订阅的业务实现。

## 7. 验证与边界

正式测试（不是先前研究目录里的 29 项断言）：

- `/Users/xuan/Desktop/cursor/tiktok/app/tt-minis/tests/server/session-transport.test.ts`：来源/角色/真假令牌、双凭据、来源关联表、旧 Cookie、退出、到期、禁用与迟到兑换。
- `/Users/xuan/Desktop/cursor/tiktok/app/tt-minis/tests/server/session-origin.test.ts`：会话来源绑定、无 Origin 的同源 GET/HEAD、错误来源、历史会话与可信代理。
- `/Users/xuan/Desktop/cursor/tiktok/app/tt-minis/tests/unit/session-transport.test.ts`：真实业务 HTTP + user store/API，仅模拟外部 TikTok；并发恢复、禁止写重放、换号、迟到响应等。
- `/Users/xuan/Desktop/cursor/tiktok/app/tt-minis/tests/unit/catalog-session.test.ts`：真实 HTTP、SQLite 和已发布本地测试剧目，覆盖客户端／服务端到期、续期时 VIP 变化和换号时迟到目录结果；不代替平台媒资验收。
- `/Users/xuan/Desktop/cursor/tiktok/app/tt-minis/tests/fullstack/minis-session.spec.ts`：真实应用模块的动态双 HTTPS WebKit；Cookie 仍为 0，但 Bearer 可连续读取、到期恢复、退出、换号和撤销迟到会话；另有管理员第一方 Cookie 对照。

浏览器测试只监听本机随机端口，不借用固定服务。没有截图、没有关闭第三方 Cookie 策略、没有注入 Cookie。
自签证书例外只用于本次本机 TLS。

本任务输出位于 `/Users/xuan/Desktop/cursor/tiktok/artifacts/minis-session-transport-20261015/`，包含首次失败、后续结果、退出码及源文件哈希。
最新协调要求由主代理统一执行固定端口的全量测试及 `build:fullstack`；本任务不并发启动它们，不改 package 脚本。

**尚未进行 TikTok 真机验收**：真实包 Origin、请求目的域配置、端内原生登录和前后台/外部账号切换行为仍需目标 iOS/TikTok 版本验证。
本地模拟验证的是新 code 对应新用户时的隔离、显式换号与页面重开；不假定原生账号变更一定会触发某个未确认的 SDK 事件。
