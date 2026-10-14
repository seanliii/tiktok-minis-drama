# TikTok Minis 技术形态

> 来源：[TikTok Minis 技术形态说明（Lark）](https://bytedance.larkoffice.com/wiki/JvMAwLZJzigrwAkuOzPcUsGenRb)

## 一句话理解

**TikTok Minis = 运行在 TikTok 客户端 WebView 中的 Web 应用 + `window.TTMinis` JSAPI + 一套调试/构建/打包的 CLI 工具链。**

它不是微信/抖音那类「自定义 DSL + 专有运行时」的小程序：

- 页面本身用标准 Web 技术开发（有 `index.html`、前端框架代码、`dist/` 构建产物）
- 通过 JSSDK 接入客户端能力
- 用 `minis dev` 和 `minis build` 完成本地调试与构建交付

## 开发者视角的四层结构

### 1. 页面层

业务页面本质是标准 Web 页面：`index.html`、前端框架代码（React / Vue / 原生均可）、业务 bundle、常规构建产物目录。

### 2. SDK 层

页面在 `<head>` 中接入 TikTok Minis SDK，拿到 `window.TTMinis`，通过 `TTMinis.init({ clientKey })` 初始化。登录、授权、支付、广告、订阅等客户端能力都通过这个 JSAPI 入口调用。

```html
<head>
  <script src="https://connect.tiktok-minis.com/drama/sdk.js"></script>
  <script>
    TTMinis.init({
      clientKey: 'your_client_key',
    })
  </script>
</head>
```

### 3. 客户端层

真正的授权、支付、订阅等能力由 **TikTok 客户端原生承接**（授权弹窗、支付面板等），不是浏览器完成：

- 页面渲染主要是 Web 层能力
- 客户端能力主要由 TikTok App 承接

### 4. 工具链层

```bash
npm install tiktok-minis-cli@0.0.7 -g --registry=https://registry.npmjs.org/
minis -v   # 0.0.7
```

`minis dev` 用于本地调试，`minis build` 用于校验与打包交付。

## 与微信 / 抖音小程序的对比

### 共同点

- 都有客户端容器能力
- 都有 JSAPI 体系
- 都需要平台侧配置（域名白名单、能力开通等）
- 都有调试与构建发布链路

### 核心差异

| 维度 | 微信 / 抖音小程序 | TikTok Minis |
| --- | --- | --- |
| 页面技术栈 | 自定义 DSL（WXML / TTML） | 标准 Web（React / Vue / 原生 HTML） |
| 页面入口模型 | 页面路由由小程序运行时管理 | Web 路由，入口由平台配置 |
| 调试模式 | 开发者工具模拟器 | 本地页面 + playground 调试页 + 手机 TikTok 客户端扫码 |
| 构建交付模型 | 上传源码由平台构建 | 开发者自行构建 → `minis build` 校验打包 |
| 工程接入方式 | 固定工具链 | 更开放，普通 Web 工程即可接入 |

## 正确的开发思路

1. **先按 Web 工程来设计页面**：不要套传统小程序心智
2. **把客户端能力接入放在 JSSDK 层处理**：统一封装 `TTMinis` 调用
3. **把服务端协作当成正式接入的一部分**：登录换 token、支付回调不是可选项
4. **调试时分清楚三层问题**：Web 层问题 / JSAPI 层问题 / 客户端层问题

## 关键限制

- 本地调试**仅支持安卓内测客户端**：M 包（账号地区 US 等）、T 包（账号地区 JP 等）；iOS 需上传到平台后扫码查看效果
- 账号地区、Google Play / Apple Pay 地区、网络代理地区尽量保持一致
- 支付通过 TikTok 虚拟币 **Beans** 完成
