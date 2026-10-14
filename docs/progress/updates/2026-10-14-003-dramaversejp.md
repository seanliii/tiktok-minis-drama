---
title: 新建 DramaVerseJP（日本市场）+ 代码包上传平台成功
date: 2026-10-14
type: 功能
status: 已完成
features:
  - 平台新建 Mini Drama 应用 DramaVerseJP
  - 全界面日语化（日本市场定位）
  - 官方 CLI 生成 minis.manifest.json 打包
  - 代码资产上传平台（Version 1，linting 中）
  - 日本市场使用指南文档
---

弃用 Aurora Drama，新建 **DramaVerseJP**（App ID `7696338880869500980`），定位日本市场，前端已完成日语化并成功上传平台。

<!-- more -->

## 平台进展

| 项目 | 值 |
| --- | --- |
| App 名 | DramaVerseJP |
| App ID | `7696338880869500980` |
| Client Key | `mnxhskb12ahzifub` |
| 代码资产 | Asset `7696329454767081479`，Version 1（code linting 中） |
| 预览 | 待 lint 完成后创建 Preview 版本（最多 30 个） |

## 提审前置条件（当前阻塞项）

1. Basic information approval —— 需补充 App 图标（1024×1024）、描述、Terms/Privacy URL
2. Industry verification approval —— 行业资质审核
3. Monetization feature —— 需开通短剧变现功能

## 功能描述

- **日语化**：首页 / 详情 / 播放 / 个人中心 / 搜索全部文案切换为日语
- **日本题材剧单**：復讐の令嬢 / 社長の契約花嫁 / 追放された勇者 / ゾンビアポカリプス / 異世界転生 等 8 部 mock 剧
- **官方打包规范**：`minis.config.json` + `minis.manifest.json`（`ttdx minis build:after` 生成）+ SDK 首脚本 init + 回调风格 login（`authResponse.code`）
- **打包命令**：`npm run build:minis` 一键构建 + 生成 manifest

## 界面展示

![DramaVerseJP 首页](../screenshots/dramaverse-home.png)

![DramaVerseJP 详情页](../screenshots/dramaverse-detail.png)

![DramaVerseJP 播放页](../screenshots/dramaverse-player.png)

![DramaVerseJP 个人中心](../screenshots/dramaverse-profile.png)

## 下一步

- 等 lint 完成 → 创建 Preview 版本 → 生成二维码（T 包扫码）
- 补齐 Basic information（图标 / 描述 / Terms / Privacy）
- 企业认证与行业资质（商务侧）
- 媒资激活（BytePlus）+ 后端登录/支付/Webhook
