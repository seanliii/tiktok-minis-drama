# HTTPS 反代与观众 IP 限流

本次修复只处理“上线加了反代后，所有观众共用反代 IP 的限流额度”。不调整支付、媒资、数据库结构或前端，不关闭限流，也不把任何人的转发头都当真。

例如，门卫代所有访客向楼内传话：以前只记门卫的名字，所有访客共用一本次数账；现在只有名单中的门卫可以报告访客地址，其他人自己填写的地址不作数。

## 配置契约

新增服务器环境变量 `DRAMA_TRUSTED_PROXIES`，程序化调用对应 `ServerConfig.trustedProxies`：

| 配置 | 行为 |
| --- | --- |
| 未设置、空字符串、纯空白 | 不信任任何代理；保持直接连接部署的原行为 |
| `127.0.0.1/32` | 只信任从 IPv4 本机地址连接的代理 |
| `127.0.0.1/32,::1/128` | 只有代理确实使用两种本机地址时才选用 |
| 明确 IPv4/IPv6 或 CIDR | 逐项校验，再交给 Express 判断代理链 |
| `true`、`false`、`1`、`2`、`loopback`、主机名、通配符、`/0`、空列表项、错误掩码 | 启动报错，不自动扩大信任 |

程序化空数组 `[]` 可以明确覆盖环境变量。传入数组会复制、逐项检查，布尔值、跳数、函数等不能充当信任策略。

应用仍按 `req.ip` 计数：API 每分钟 600 次、登录相关 POST 每分钟 30 次。可信代理链从实际连接地址向外检查，在第一个不可信地址处停止。没有可信代理时，伪造 `X-Forwarded-For` 不会换到新额度。

这不是“每个账户独享额度”：真正共用同一公网出口的观众仍共用该 IP 的额度；多进程也仍各自持有内存计数。本次不引入 Redis，不声称解决多实例共享限流。

## 单机部署模板

提供的文件：

- `app/tt-minis/deploy/nginx.conf`：完整的 Debian/Ubuntu Nginx 主配置模板。
- `app/tt-minis/deploy/aurora-drama.service`：非 root 的应用 systemd 单元。
- `app/tt-minis/deploy/healthcheck.mjs`：不带身份、只发 GET 的健康探测。
- 三份 `.env*.example`：默认关闭代理信任，并说明何时填写。

模板只适用于下面这条链路：

```text
观众 ── HTTPS:443 ──> 本机 Nginx
                         │ 重置转发头，保留路径、查询和正文
                         └── HTTP ──> 127.0.0.1:5316
                                      Express / API / 管理页 / 用户页
                                      DRAMA_TRUSTED_PROXIES=127.0.0.1/32
```

### 为什么必须成套使用

1. **只监听本机。** 应用绑定 `127.0.0.1`，不能改为 `0.0.0.0` 或将后端端口公开。只开放反代需要的入口。
2. **只信任本机代理。** Nginx 上游写死 `127.0.0.1:5316`，因此不需要把整个内网段或所有本机地址加入列表。
3. **覆盖而不是追加转发头。** Nginx 用真实 TCP 对端 `$remote_addr` 重置 `X-Forwarded-For` 和 `X-Real-IP`；协议、主机、端口使用本服务固定值；清除 `Forwarded`。不使用 `$proxy_add_x_forwarded_for`。
4. **不重写业务协议。** `proxy_pass` 不附带 URI，不剥掉 `/api`；保留回调查询参数、`TikTok-Signature` 和原始正文。应用自己的 256KB 回调、1MB JSON 和上传限制继续生效。
5. **CORS 由应用决定。** 反代不加 `Access-Control-Allow-Origin: *`，不隐藏 Cookie 或 `Retry-After`，不把应用的 JSON 错误改成其他页面。

信任本机地址也意味着信任能在该主机发请求的进程。因此应用机器不应给不可信用户或容器共用；本机恶意进程伪装代理不是这份 IP 信任配置能阻止的。

**这不是 CDN、多级负载均衡或 Docker 网桥模板。** 如果 Nginx 前面还有代理，`$remote_addr` 会是那一层代理地址；需要重新核对完整链路和来源清洗方式，不能靠增加跳数或无条件启用 `real_ip_header` 解决。也不能把此完整配置随意混入已有的 `real_ip` 配置。

### 生产与预发布

生产模板约定：

- 已构建应用放在 `/opt/aurora-drama/app/tt-minis`。
- Node 可执行文件为 `/usr/bin/node`，版本满足项目要求。
- 独立、不可登录的 `aurora-drama` 用户运行应用。
- `.env.production` 由 root 管理，应用组只读，权限 `0640`，不放在任何 `dist-*` 静态目录。
- 数据放在 `/var/lib/aurora-drama`，systemd 自动管理目录，权限 `0700`；应用目录只读。
- 用原有 `scripts/start-environment.mjs production` 启动，保留 HTTPS Origin、管理员凭据、平台身份配置等现有检查。

`ExecStart` 固定主机、端口、数据目录和可信代理列表，避免环境文件意外把应用暴露到公网。Node 的环境文件加载不会覆盖已经存在的进程环境值。支付模式没有被模板改成可付费；生产默认仍为 `disabled`。

使用前需将示例域名 `drama.example.test` 和证书位置替换为经批准的真实值，提供有效证书以及真实 HTTPS Origin。模板不购买云资源，不自动申请证书，不携带任何真实凭据。

预发布使用独立域名、进程、`.env.staging` 和数据目录；同时将上游及应用端口改为 `5315`、模式改为 `staging`，不能指向生产数据。代理信任仍只设 `127.0.0.1/32`。

跨站 Minis 页面还要按既有 CORS 设计填写精确页面来源，需要跨站 Cookie 时显式选择 `DRAMA_COOKIE_SAMESITE=none` 与 `DRAMA_COOKIE_SECURE=true`。本次不会自动改变这些选项，也不证明 TikTok WebView 一定接受第三方 Cookie。

## 本地验证：不安装或部署服务

在项目已有依赖可用的情况下执行：

```bash
cd /Users/xuan/Desktop/cursor/tiktok/app/tt-minis
npm run test:server -- tests/server/proxy-deployment.test.ts tests/server/proxy-deployment-https.test.ts
npm run build:fullstack
npm run test:all
```

新回归会：

- 先后耗尽两名观众的登录额度，验证互不影响；验证 API 的 600 次额度也按观众分开。
- 检查默认不信任、非可信连接伪造头、代理链左端伪造、缺失转发头和错误配置。
- 启动仅监听本机、随机端口的 HTTPS 测试代理，转到同一个 IPv4 后端；用真实 IPv4/IPv6 对端表示两名观众，不伪造 socket 地址。
- 临时生成测试证书，仅将它交给测试客户端信任；不关闭 TLS 验证、不安装系统证书。
- 验证 CORS 预检、Secure/HttpOnly/SameSite Cookie、错误响应及带查询参数的签名回调。
- 执行真实健康探测脚本，确认只有无身份 GET，拒绝错误服务、重定向、403 和不可信证书。
- SQLite、证书和测试进程均在临时目录中创建，结束后关闭和清理；不读真实 `.env` 或 `.local`。

**验证范围要分清：** 这些 HTTPS 回归使用 Node 测试代理，证明应用经过真实 TLS 转发后的行为，不等于已经用 Nginx 启动生产服务。Nginx 与 systemd 模板还必须在具备相应工具的目标系统上做原生语法校验；本机缺少工具时不能把这一项报成通过。

目标系统具备工具、且示例值已经替换后，以下是检查命令，不是启动命令：

```bash
nginx -t -c /opt/aurora-drama/app/tt-minis/deploy/nginx.conf
systemd-analyze verify /opt/aurora-drama/app/tt-minis/deploy/aurora-drama.service
```

`nginx -t` 还会尝试打开配置引用的文件，需要测试所需的证书和权限；`systemd-analyze verify` 不能代替实际运行时验证。不要为了让检查通过而关闭证书校验或扩大文件权限。

## 只读健康探测

对经批准、已经运行的服务：

```bash
cd /Users/xuan/Desktop/cursor/tiktok/app/tt-minis
# 本机直连
node deploy/healthcheck.mjs http://127.0.0.1:5316
# HTTPS反代及一个精确允许的浏览器来源（替换示例域名）
node deploy/healthcheck.mjs https://drama.example.test https://reader.example.test
```

脚本不加载环境文件、不发送 Cookie/Authorization、不登录、不发回调、不创建订单。依次 GET `/api/meta`、`/api/catalog`、`/api/auth/me`；每个请求有 5 秒超时，不跟随重定向，检查状态及接口 JSON 格式。有指定 Origin 时额外检查 CORS。

成功返回退出码 `0` 和以下结构：

```json
{"ok":true,"checks":[{"path":"/api/meta","status":200},{"path":"/api/catalog","status":200},{"path":"/api/auth/me","status":200}]}
```

失败退出码 `1`，只报告失败位置/原因，不打印接口正文或凭据。探测只证明被探测的接口和传输正常，不证明平台登录、媒资审核、真实支付或外部回调已经上线。

每次探测会消耗三次正常 API 额度；本地直连的探测共用本机地址额度。不在生产上跑耗尽额度的回归测试。

## 资料和旧说明

实现以当前安装的 Express 与 `proxy-addr` 源码为依据；Nginx 的无 URI `proxy_pass`、空值 `proxy_set_header` 可对照其官方模块说明。旧云部署指南中 `trust proxy=false` 的描述指修复前状态；当前默认仍为不信任，但可以显式配置上述地址列表。
