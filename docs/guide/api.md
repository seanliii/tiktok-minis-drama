# 核心 API 接入

> 来源：[静默登录说明](https://bytedance.larkoffice.com/wiki/Fw22w0BuoiDD2vklMPjcos66nEd) ｜ [显示授权指南](https://bytedance.larkoffice.com/wiki/NBtUwZuWwiFJ2Iklb8zcGAyLnyh) ｜ [端内支付指南](https://bytedance.larkoffice.com/wiki/LLpyw0GQLiYPGRkcUcLcLQm3nWc)

## 能力总览

| 能力 | 前端 JSAPI | 后端参与 | 业务场景 |
| --- | --- | --- | --- |
| 静默登录 | `TTMinis.login()` | code 换 token | 首次进入建立身份，无感知 |
| 显示授权 | `TTMinis.authorize()` | 授权码换用户资料 | 个人主页、排行榜展示头像昵称 |
| 端内支付 | `TTMinis.pay()` | 预支付订单 + Webhook 发货 | Beans 解锁章节、购买权益 |
| 端内订阅 | `TTMinis.subscribe()` | 订阅管理 + Webhook | 会员订阅 |

---

## 一、静默登录（login）

### 适用场景

- 用户首次进入应用时建立身份
- 观看进度、资产、订阅状态绑定到用户
- 支付、订阅、资料授权等后续能力的**统一前置步骤**

### 接入流程（6 步）

1. 前端初始化 SDK（`TTMinis.init({ clientKey })`）
2. 前端调用 `TTMinis.login()` 获取一次性 code
3. 前端立即把 code 发送给开发者后端
4. 后端向 TikTok 服务器换取 `open_id + access_token + refresh_token`
5. 后端存储身份与令牌（`open_id` 建议作为业务主键长期保存）
6. 后端在 `access_token` 过期前用 `refresh_token` 刷新

### 前端示例

```js
// 页面加载时初始化
TTMinis.init({ clientKey: 'your_client_key' })

// 静默登录：获取 code 并立即交给后端
async function silentLogin() {
  const res = await TTMinis.login()
  const { code } = res
  return fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  }).then((r) => r.json())
}
```

### 后端要点

- `client_key` / `client_secret` 只保存在后端，绝不进前端代码
- code 一次性且有效期短，拿到后立即使用
- 存储 `open_id`、`access_token`、`refresh_token`、过期时间
- 提供刷新任务：过期前用 `refresh_token` 换取新 `access_token`

### 常见问题

| 问题 | 排查 |
| --- | --- |
| client_key 与 client_secret 不匹配 | 检查平台应用配置，确认密钥对应正确 App |
| 服务条款与隐私政策未配置 | 平台补齐后再调用 |
| code 已过期或被重复使用 | 重新调用 `TTMinis.login()` 获取新 code |
| token 接口请求格式错误 | 检查请求头 Content-Type 与参数格式 |
| access_token 已过期 | 用 refresh_token 刷新，刷新失败则重新走登录 |

---

## 二、显示授权（authorize）

### 适用场景

- 用户点击「个人主页」需要展示头像昵称
- 用户进入「排行榜」展示资料
- 用户进入「编辑资料」页拉取基础资料

**不建议**：页面一打开就弹授权框、无明确场景强制打断体验。

### 接入流程

1. 先完成静默登录（后端已保存 `open_id`）
2. 业务需要时触发 `TTMinis.authorize()`，申请 `user.info.basic` 授权
3. 用户确认授权
4. 前端把授权结果（新授权码）发给后端
5. 后端基于已有 `access_token` 调用 TikTok Open API 获取昵称、头像
6. 后端持久化资料并返回前端

### 最佳实践

- 授权入口绑定明确用户意图（如点击头像）
- 用户拒绝授权时优雅降级（展示默认头像），不要反复弹
- 资料以后端落库为准，前端不直接信任

---

## 三、端内支付（pay）

### 能力简介

在 Minis 内完成 **Beans 扣费**购买。适用：解锁剧情章节、购买虚拟货币 / 道具 / 礼包。

### 前置条件

- 完成 Minis JSSDK 接入与静默登录
- **开发者完成企业认证**
- **平台已开启 IAP 能力**
- **平台已配置支付 Webhook 回调地址**
- 后端具备：登录换 token、通过 `open_id + access_token` 创建预支付订单、接收并校验 Webhook、幂等发货

### 完整流程（6 步）

1. 后端创建预支付订单
2. 后端返回 `trade_order_id`
3. 前端调用 `TTMinis.pay()` 拉起支付面板
4. TikTok 服务器**异步通知**支付结果（Webhook）
5. 后端完成**验签、幂等、发货**
6. 前端轮询支付结果，成功后刷新权益

### 前端示例

```js
async function unlockEpisode(episodeId) {
  // 1. 后端创建预支付订单
  const { trade_order_id } = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ episode_id: episodeId }),
  }).then((r) => r.json())

  // 2. 拉起支付面板
  await TTMinis.pay({ trade_order_id })

  // 3. 轮询订单结果（以 Webhook 发货为准）
  return pollOrderResult(trade_order_id)
}
```

### 后端 Webhook 处理要点

1. **验签**：按平台规范校验回调签名，防止伪造
2. **幂等**：`trade_order_id` 建唯一索引，重复回调直接返回成功应答
3. **状态机**：订单状态单向流转（待支付 → 已支付 → 已发货）
4. **发货**：增加用户已购权益（章节解锁 / 权益写入）
5. **应答**：处理完成后返回平台要求的成功响应

### 常见问题

| 问题 | 说明 |
| --- | --- |
| 接入支付前一定要先做显式授权吗 | 以官方口径为准，静默登录是必须前置；显式授权按业务场景触发 |
| 前端回调成功能否立刻发货 | **不能**，必须以后端收到 Webhook 并验签为准 |
| 同一 trade_order_id 能否重复支付 | 不能，订单唯一，重复拉起会失败 |
| 如何防重复发货 | 订单表唯一索引 + 状态机幂等 |
| 支付面板报「出错了，请稍后重试」 | 检查订单创建参数、IAP 配置、App 状态 |

---

## 四、端内订阅（subscribe）

- 与支付流程类似：后端创建订阅订单 → 前端调 `TTMinis.subscribe()` → 平台 Webhook 通知
- 额外关注**订阅生命周期回调**：开通、续费、退订、过期
- 权益校验：`已购章节 OR 订阅有效期内` 即可播放
- 订阅状态以后端记录为准，前端展示依赖后端接口

---

## 五、调试工具

```bash
npm install tiktok-minis-cli@0.0.7 -g --registry=https://registry.npmjs.org/
minis dev    # 本地调试
minis build  # 校验与打包
```

项目要求：

- 根目录存在 `package.json`，至少提供 `dev` 或 `start` 启动脚本
- 根目录存在 `minis.config.json`
- 本地调试依赖三层协作：本地业务页面 + playground 调试页 + 手机端 TikTok 内测客户端（仅安卓）

详见 [开发调试指南](https://bytedance.larkoffice.com/wiki/NjgSwYNSHiiMdxkJHHwcTY1lnCg)。
