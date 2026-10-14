---
title: 日本市场使用指南（上传 / 预览 / 数据）
---

# 日本市场使用指南

DramaVerseJP（App ID `7696338880869500980`）是面向**日本市场**的 TikTok Minis 短剧应用。本文档说明如何在 TikTok 端内使用、如何上传代码、如何看数据。

> 注意：日本市场对应 **TikTok 日本区内测包（T 包）**，仅 Android 可安装。正式发布后面向日本区 TikTok 全量用户。

## 1. 在 TikTok 端内使用（预览 / 测试）

### 1.1 安装 TikTok 日本区测试客户端

| 项目 | 说明 |
| --- | --- |
| 平台 | Android（iOS 无内测包） |
| 客户端 | TikTok 日本区测试包（**T 包**） |
| 获取方式 | 由 TikTok 运营侧提供下载链接；安装后需绑定测试账号 |
| 测试账号 | 在平台「Roles and access → Test accounts」添加 TikTok 账号 |

### 1.2 打开 DramaVerseJP

1. 打开 T 包 TikTok
2. 在平台「Code version」页选择「Use QR code to preview」生成预览二维码
3. 用 T 包扫码 → 端内直接打开 DramaVerseJP
4. 或者：将预览版设为「Partial rollout，投放 0%」，仅测试账号可访问

### 1.3 预览模式要点

- 预览版本可以完整测试：首页 → 详情 → 播放 → 支付 → 订阅全链路
- 支付会走真实 Beans 扣费（或测试环境沙箱，取决于平台配置）
- 登录/授权弹窗由 TikTok 客户端原生承接

## 2. 代码上传（每次更新怎么做）

### 2.1 打包要求（平台硬性校验）

- zip 压缩包，**解压后 ≤ 30 MB**
- zip 内**必须包含** `minis.config.json`
- `index.html` 第一个 script 必须是 Minis SDK 并调用 `TTMinis.init({ clientKey })`
- 必须实现 TikTok Login API（静默登录）
- 不允许空文件（0 字节）
- 禁用 `eval`、`Function` 构造器、字符串版 `setTimeout/setInterval`
- 网络请求域名必须声明在 `minis.config.json` 的 `domain.allowList` + 平台「Development configuration → Security → Trusted domains」

### 2.2 上传步骤

1. 本地构建：`cd app/tt-minis && npm run build`
2. 复制配置进产物：`cp minis.config.json dist/`
3. 打包：`cd dist && zip -r dramaversejp-vX.Y.Z.zip .`
4. 打开平台 → **DramaVerseJP → Code version → Upload code asset**
5. 上传 zip → 等待安全扫描通过 → Add asset
6. 选择发布方式：
   - **Production**：全量发布（需要审核通过）
   - **Partial rollout（0%）**：仅测试账号可见 = 预览模式

### 2.3 当前工程配置

| 项目 | 值 |
| --- | --- |
| App 名 | DramaVerseJP |
| App ID | `7696338880869500980` |
| Client Key | `mnxhskb12ahzifub` |
| 技术栈 | Vue 3 + Vite + Vant 4 + Pinia |
| 页面 | 首页剧单 / 详情 / 播放 / 个人中心 / 搜索 |
| 语言 | 日语（日本市场） |

## 3. 数据查看（Analytics）

平台侧路径：**DramaVerseJP → GROWTH → Analytics**

### 3.1 可看的数据

| 类别 | 指标 |
| --- | --- |
| 用户 | DAU/MAU、新用户数、留存率、用户画像（地区/设备/语言） |
| 内容 | 播放次数、人均播放时长、完播率、剧集热度排行 |
| 收入 | 支付订单数、Beans 消耗、订阅数、ARPU、收入趋势 |
| 漏斗 | 首页 → 详情 → 播放 → 支付转化率 |

### 3.2 日本市场重点关注

- **免费集 → 付费集转化率**：日本短剧用户付费习惯与东南亚差异大，重点看第 1 付费集解锁率
- **订阅 vs 单集购买比例**：日本用户更习惯订阅制（对标 Netflix/U-NEXT），订阅数据优先优化
- **剧集题材热度**：日本市场「復讐・異世界・恋愛」题材占比高，按品类看播放与付费
- **用户留存**：日本用户对品质敏感，第 2 集留存低说明前 3 集内容不行

### 3.3 数据更新频率

- 实时看板（部分指标延迟数分钟）
- 日维度报表 T+1
- 收入类数据需企业认证 + 结算合同完成后可见

## 4. 内容上传规范（Media Assets）

> 2026-09-28 新规：新通过行业资质的短剧开发者**必须**接入平台媒资库（Media Assets）与官方播放器（BytePlus VePlayer）。视频只有经过平台审核 + 上架后，才能在 Minis 内由官方播放器播出；**不允许绕过平台直接用自己的播放地址**。

### 4.1 媒资托管链路

```
自己上传 BytePlus 存储 / 或通过 TikTok Open API 自动同步
        → TikTok 开发者平台媒资库（绑定 BytePlus 账号）
        → 提交审核（Moderation）
        → 上架（Listing）
        → Minis 内用官方播放器按 album_id + episode_id 播放
```

### 4.2 视频文件格式规范

| 类别 | 支持格式 | 大小限制 |
| --- | --- | --- |
| 视频 | MP4、FLV、ASF(WMV)、RM、RMVB、MPEG、MOV、AVI、FLASH、MPEG-TS(MTS)、M4S、M3U8、MKV | 单文件 ≤ 20 GB |
| 音频 | MP3、M4A、WAV、WMA、AMR、AAC、OGG | 单文件 ≤ 20 GB |
| 字幕 | VTT、SRT、ASS、TTML；多语言字幕包**必须包含英文**；英语视频可直接上传（字幕包可选） | — |

### 4.3 审核时长

| 类别 | 说明 | 审核时长 |
| --- | --- | --- |
| Normal | 已完结短剧，建议先传 500–1000 部铺量 | **2 周** |
| Urgent | 连载中（首播新剧 / 近期有消费的老剧），**每机构每天限传 35 部** | **1–3 个工作日** |

### 4.4 内容红线（平台审核标准）

| 大类 | 禁止内容 |
| --- | --- |
| 安全与文明 | 暴力犯罪、仇恨歧视、极端组织、骚扰霸凌、虐待剥削 |
| 心理健康 | 自杀自残、饮食障碍、危险挑战 |
| 敏感主题 | 裸露与性行为、血腥惊悚、动物虐待 |
| 真实性与诚信 | 谣言与选举诚信、**AI 生成内容必须明确标注**、抄袭侵权、刷量造假 |
| 商业合规 | 违禁品交易、欺诈诈骗；品牌推广必须使用平台「内容披露设置」标注商业内容 |
| 隐私安全 | 泄露他人隐私信息、攻击平台系统 |

### 4.5 播放规则（重要）

- 播放 = **审核状态 × 上架状态** 双重控制：
  - 未提审 / 审核中 / 审核未通过 / 已过审未上架 / 已下架 → **一律不可播放**
  - 某版本中**任一集**审核失败 → **该版本全部剧集不可播放**（需整改后重新提审）
- 播放必须传 `album_id + episode_id` 调官方播放器，平台校验版权、审核、上架、账号绑定
- 一部剧的所有集必须属于**同一个 BytePlus 账号的同一个空间**
- 不允许自研播放器（必须用 BytePlus VePlayer）

### 4.6 接入步骤（何时做）

1. 行业资质过审后 → 平台「Industry solutions → Media asset management → Activate」
2. 注册 BytePlus 账号（VOD 服务，签约约 **1 周**，有短剧优惠价）→ 拿 Account ID + AccessKeyID + SecretAccessKey
3. 平台「Manage accounts → Connect BytePlus account」绑定并验证 AK/SK
4. 通过 Open API 完成视频上传 / 提交审核 / 上架（或先传 BytePlus 再免重复上传直接提审）
5. 前端播放页改为调用官方播放器（传 `album_id` / `episode_id`）

## 5. 上线前清单（0/6 → 6/6）

当前 DramaVerseJP 的启动清单完成度：

| 步骤 | 状态 | 说明 |
| --- | --- | --- |
| Complete business verification | ⬜ | 企业认证（组织 Owner 操作） |
| Apply for industry qualification | 🔶 | 行业资质已提交，审核中（status=4） |
| Apply for general launch approval | ⬜ | 发布审批 |
| Activate media asset management | ⬜ | 媒资管理（BytePlus）激活（status=2） |
| Add basic information | 🔶 | 图标 ✅ / 邮箱验证 ✅ / 版权声明 ✅ / 信任域名 ✅ / Terms·Privacy ✅；**表单保存卡点**（Save/Submit 不发请求，疑似 Apple Team ID 或前端校验），交接清单见 [004 更新](/progress/updates/2026-10-14-004-basic-info) |
| Submit version for review | ⬜ | 版本提审 |

## 6. 常见问题

**Q：预览为什么打不开？**
A：确认用 T 包（日本区测试客户端）+ 测试账号白名单；预览版需「Partial rollout 0%」。

**Q：支付测试会不会真扣钱？**
A：取决于平台支付环境配置。建议先在测试环境走通 Webhook 再配置正式环境。

**Q：媒资（视频）怎么传？**
A：2026-09-28 起新过审的短剧开发者必须使用平台 Media Assets & Player（BytePlus）。视频审核通过后只能由平台播放器播放。详见本文档第 4 节。

**Q：AI 生成的剧集封面/预告片能不能用？**
A：可以用，但平台要求**明确标注 AIGC**，且不得用于误导用户或侵权。

**Q：域名白名单怎么配？**
A：Development configuration → Security → Trusted domains，只支持 https 且不能带通配符和路径，最多 20 个。
