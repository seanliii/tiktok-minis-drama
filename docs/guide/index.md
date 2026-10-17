---
title: 开发文档
---

# 开发文档

**2026-10-16 最新订阅进展**：[017 完整验证与后续付款处理](/progress/updates/2026-10-16-017-subscription-access) · [套餐、官方测试与已有会员恢复](/guide/subscription-workflow)。区分已验证的代码、当前会员访问与尚未完成的正式付款核销；不把原始时间或测试回调猜成真实会员期间。

**2026-10-16 最新交接**：[016 全量验证与真实上线缺项](/progress/updates/2026-10-16-016-registration-readiness) · [云端草稿登记及恢复](/guide/platform-registration) · [Aurora 品牌说明](/guide/aurora-brand)。整套本地回归已通过，但云账号、部署、正式订阅和真机审核仍有工作；不是只差补卡。以下较早记录保留当时状态。

**2026-10-16 继续开发**：[后台云端视频直传](/guide/cloud-upload)已从研究方案接成上传任务、官方 SDK 和服务器核验；见 [013 实施与验收记录](/progress/updates/2026-10-16-013-cloud-upload)。云端核验不是剧集创建或上架，真实账号仍需配置与联调。

**当前上传应用已确定：Aurora Drama（日本首发）。** 见[目标应用与地区路线图](/guide/aurora-launch)及[010 代码上传记录](/progress/updates/2026-10-15-010-aurora-upload)。旧 DramaVerseJP 的配置、基本资料和历史版本不自动迁移。

**Aurora 基本信息实际填写结果**：[011 资料保存与验证记录](/progress/updates/2026-10-15-011-aurora-basic-info)。图标、描述、条款链接、日本地区及 SDK 已保存；真实 Team ID、邮箱验证码和声明确认仍待完成，尚未提审。

**云部署与采购参考（2026-10-15）**：[东京首发、阿里云／AWS 配置费用与真实上线缺项](/guide/cloud-deployment)。先区分业务服务器和视频服务；媒资同步、真实订阅及部署适配仍有开发工作，未购买或部署云资源。

**后续实际开发**：[可信代理与 HTTPS 部署回归](/guide/proxy-deployment) · [订阅通知收件箱](/guide/subscription-events)。修复部署后的用户限流，订阅通知不再静默丢弃；两者均不代表平台审核或完整订阅验收已通过。

**最新接入与验收入口**：[012 平台接入与剩余工作](/progress/updates/2026-10-15-012-platform-integration) · [Minis 业务会话与来源检查](/guide/minis-session-transport) · [已有平台剧目的媒资工作流](/guide/platform-media-workflow)。区分本地上传、平台媒资关联、只读订阅查询与真正收费上线，不将研究方案当作已实现功能。

6 篇 TikTok Minis 官方文档（Lark）汇总，要点提炼 + 原文链接。行业与竞品背景见 [市场调研](/guide/market-research)。

**2026-10-14 开发交付入口**：[日本短剧 Minis／App 对标](/guide/jp-benchmark) · [开发交付与团队后续清单](/guide/developer-delivery)。以下旧文档摘要不能代替当前源码、平台状态和当次测试记录。

**实际前后台入口**：[上传、用户账号、订单与解锁使用手册](/guide/local-fullstack) · [008 全栈实施记录](/progress/updates/2026-10-14-008-fullstack)。目前支持真实本地数据库与无真钱付款测试，不以测试代替上线。

**2026-10-15 同流程更新**：[测试与正式共用流程、预发布配置和验收](/guide/environment-parity) · [009 记录](/progress/updates/2026-10-15-009-environment-parity)。没有把本地模拟或离线平台替身说成正式上线。

**架构背景**：[传短剧需要什么后台](/guide/content-upload-architecture)——现成发行工具与自建 Minis 的区别、轻量上传管理、业务服务端和视频云分工。

## 总览

| 文档 | 核心内容 | 原文链接 |
| --- | --- | --- |
| 技术形态说明 | Minis = Web 应用 + JSAPI + CLI 工具链，与微信/抖音小程序的差异 | [查看详情](https://bytedance.larkoffice.com/wiki/JvMAwLZJzigrwAkuOzPcUsGenRb) |
| 开发调试指南 | 工具安装、内测客户端、平台配置、本地调试流程 | [查看详情](https://bytedance.larkoffice.com/wiki/NjgSwYNSHiiMdxkJHHwcTY1lnCg) |
| 静默登录（login） | `TTMinis.login()` 拿 code，后端换 open_id + token | [查看详情](https://bytedance.larkoffice.com/wiki/Fw22w0BuoiDD2vklMPjcos66nEd) |
| 显示授权（authorize） | `TTMinis.authorize()` 申请 user.info.basic 拿昵称头像 | [查看详情](https://bytedance.larkoffice.com/wiki/NBtUwZuWwiFJ2Iklb8zcGAyLnyh) |
| 端内支付 | Beans 扣费：预支付订单 + 支付面板 + Webhook 验签发货 | [查看详情](https://bytedance.larkoffice.com/wiki/LLpyw0GQLiYPGRkcUcLcLQm3nWc) |
| 接入全流程（One Page） | 入驻 10 步：注册 → 认证 → 合规 → 合同 → 开发 → 发版 → 运营 | [查看详情](https://bytedance.larkoffice.com/wiki/MJ2BwFqSxi4r2SkwHS8cRrlsnVb) |

---

## 1. TikTok Minis 技术形态说明

**一句话**：TikTok Minis = 运行在 TikTok 客户端 WebView 中的 Web 应用 + `window.TTMinis` JSAPI + 调试构建打包 CLI 工具链。**不是**传统小程序的「自定义 DSL + 专有运行时」。

**四层结构**：

- **页面层**：标准 Web 工程（index.html、React/Vue、构建产物 dist/）
- **SDK 层**：head 引入 SDK → `TTMinis.init({ clientKey })` → 登录/授权/支付/订阅都走 JSAPI
- **客户端层**：授权弹窗、支付面板等由 TikTok App 原生承接
- **工具链层**：`minis dev`（本地调试）、`minis build`（校验打包）

**与微信/抖音小程序核心差异**：页面用标准 Web 技术栈、入口模型不同、调试靠「本地页面 + playground 调试页 + 手机客户端扫码」、交付是自己构建后 minis build。

**开发思路**：先按 Web 工程设计页面 → 客户端能力放 JSSDK 层封装 → 服务端协作（换 token、支付回调）是正式接入一部分 → 调试分清 Web/JSAPI/客户端三层问题。

[查看原文](https://bytedance.larkoffice.com/wiki/JvMAwLZJzigrwAkuOzPcUsGenRb)

## 2. TikTok Minis 开发调试指南

**开发工具**：

```bash
npm install tiktok-minis-cli@0.0.7 -g --registry=https://registry.npmjs.org/
```

**内测客户端**：目前只支持安卓；M 包（账号地区 US 等）、T 包（账号地区 JP 等）；iOS 需上传平台后扫码查看。账号地区、Google Play/Apple Pay 地区、网络代理地区尽量一致。

**平台准备**：添加测试权限 → 账号准备 → 配置基本信息 → 配置请求域名 → 广告能力配置（可选）→ 支付能力配置（IAP 开通 + 配置回调）。

**本地调试三层协作**：本地业务页面 + playground 调试页 + 手机端 TikTok 内测客户端（扫码连接）。项目需有 package.json（dev/start 脚本）+ minis.config.json。工具已支持支付、订阅、媒资库播放器调试。

[查看原文](https://bytedance.larkoffice.com/wiki/NjgSwYNSHiiMdxkJHHwcTY1lnCg)

## 3. 静默登录（login）能力接入说明

**能力**：前端 `TTMinis.login()` 获取一次性 code → 后端向 TikTok 服务器换 `open_id + access_token + refresh_token`。用户无感知完成，是支付/订阅/资料授权的前置。

**接入流程（6 步）**：

1. 前端初始化 SDK
2. 前端调用 `TTMinis.login()` 拿 code
3. 前端立即把 code 发给后端
4. 后端向 TikTok 服务器换取令牌
5. 后端存储身份与令牌（open_id 作业务主键）
6. 后端在过期前用 refresh_token 刷新

**常见问题**：client_key 不匹配、条款未配置、code 过期或重复使用、token 请求格式错误、access_token 过期（用 refresh_token 刷新）。

[查看原文](https://bytedance.larkoffice.com/wiki/Fw22w0BuoiDD2vklMPjcos66nEd)

## 4. 显示授权（authorize）接入指南

**能力**：业务需要时 `TTMinis.authorize()` 申请 `user.info.basic` 授权，用户同意后后端调 TikTok Open API 获取昵称、头像。

**适用场景**：个人主页展示资料、排行榜、编辑资料页。**不建议**页面一打开就弹授权框。

**流程**：先完成静默登录 → 业务触发 authorize → 用户确认 → 前端把授权码发给后端 → 后端获取用户资料 → 持久化并返回。用户拒绝时优雅降级（默认头像），不要反复弹。

[查看原文](https://bytedance.larkoffice.com/wiki/NBtUwZuWwiFJ2Iklb8zcGAyLnyh)

## 5. 端内支付能力接入指南

**能力**：Minis 内 Beans 扣费购买（解锁章节、虚拟货币/道具/礼包）。

**前置条件**：JSSDK 接入 + 静默登录 + **企业认证** + **平台开启 IAP** + **配置支付 Webhook 回调地址** + 后端具备换 token / 创建预支付订单 / 接收校验 Webhook / 幂等发货能力。

**完整流程（6 步）**：

1. 后端创建预支付订单
2. 后端返回 `trade_order_id`
3. 前端调 `TTMinis.pay()` 拉起支付面板
4. TikTok 服务器异步 Webhook 通知支付结果
5. 后端**验签、幂等、发货**
6. 前端轮询支付结果

**关键提醒**：前端回调成功**不能**立刻发货，必须以 Webhook 为准；同一 trade_order_id 不能重复支付；防重复发货靠订单表唯一索引 + 状态机。

[查看原文](https://bytedance.larkoffice.com/wiki/LLpyw0GQLiYPGRkcUcLcLQm3nWc)

## 6. TT Minis 接入全流程（One Page）

短剧 Minis 入驻 10 步：**账号注册 → 创建 App → 企业认证 → 合规审查（尽早完成！）→ 行业准入审核 → 合同签署 → App 基础配置（基础库版本/多语言/请求域名/IAP/Webhook）→ 开发调试 → 测试验收与发版审核 → 上线运营**。

**流量入口**：广告投放（IAP / IAA）、TikTok 主页/侧边 Minis 入口、Minis 搜索卡片、Feed 流异形卡。

**结算**：线下结算（发票流程）或线上结算（平台结算 + 发票付款），合同阶段确认。

**FAQ 覆盖**：接入流程 / 基础开发 / 授权登录 / 支付结算 / 投放相关。

[查看原文](https://bytedance.larkoffice.com/wiki/MJ2BwFqSxi4r2SkwHS8cRrlsnVb)

---

## 评论与反馈

<Giscus />
