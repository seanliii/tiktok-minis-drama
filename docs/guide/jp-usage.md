---
title: 日本市场使用指南（上传 / 预览 / 数据）
---

# 日本市场使用指南

**2026-10-15 已确定使用 Aurora Drama（App ID `7670022867891177493`，Client Key `mnp696ef4kyeebk7`）推进日本首发。** 旧 DramaVerseJP 的资料与上传记录是历史，不自动迁移。当前日语／日本范围不变，韩国及东南亚后续扩展，详见[Aurora 首发说明](/guide/aurora-launch)。

::: warning 当前是开发验证阶段
现在既有离线预览，也有[可运行的本地前后台](/guide/local-fullstack)：账号、数据库片库、上传管理、订单与测试解锁已经接通，但不是可直接收费上线的产品。真实平台媒资、生产订阅、部署和端内实测仍需完成。详细职责和上传后测试见[开发交付清单](/guide/developer-delivery)，日本竞品证据见[日本短剧对标](/guide/jp-benchmark)。
:::

> Android **本地调试**使用平台提供的测试客户端；iOS 可走上传后扫码预览。不要把测试客户端要求写成日本正式用户的安装要求。以目标 App 当时的官方指南及测试权限为准。

## 1. 在 TikTok 端内使用（预览 / 测试）

### 1.1 安装 TikTok 日本区测试客户端

| 项目 | 说明 |
| --- | --- |
| 平台 | Android（iOS 无内测包） |
| 客户端 | TikTok 日本区测试包（**T 包**） |
| 获取方式 | 由 TikTok 运营侧提供下载链接；安装后需绑定测试账号 |
| 测试账号 | 在平台「Roles and access → Test accounts」添加 TikTok 账号 |

### 1.2 打开 Aurora Drama

1. 打开 T 包 TikTok
2. 在平台「Code version」页选择「Use QR code to preview」生成预览二维码
3. 用已具备对应测试权限的账号扫码 → 端内打开 Aurora Drama 的指定版本
4. 或者：将预览版设为「Partial rollout，投放 0%」，仅测试账号可访问

### 1.3 预览模式要点

- 独立离线预览可测试首页、详情、选集、明确标识的本地样例视频、收藏、续看和失败恢复。
- 完整服务版提供真实注册账号、上传片库、服务端订单与权益；**只在明确标识的本地 Sandbox 进行无真钱测试**，不会把前端回调当成购买凭证。
- SDK 与真实 TikTok 账号、官方播放器、支付／订阅的端内联调需另行完成。浏览器测试通过不等于端内通过。

## 2. 代码上传（每次更新怎么做）

### 2.1 打包要求（平台硬性校验）

- 使用当前官方 CLI 输出的 zip 包，以该版本工具及实际上传页面校验为准；不要混用旧教程的固定容量限制。
- zip 内必须包含当前工具生成的 `minis.config.json` 等所需产物，不手工拼装新旧工具的文件结构。
- `index.html` 第一个 script 必须是 Minis SDK 并调用 `TTMinis.init({ clientKey })`
- 必须实现 TikTok Login API（静默登录）
- 不允许空文件（0 字节）
- 禁用 `eval`、`Function` 构造器、字符串版 `setTimeout/setInterval`
- 网络请求域名必须声明在 `minis.config.json` 的 `domain.allowList` + 平台「Development configuration → Security → Trusted domains」

### 2.2 上传步骤

1. **管理员先决定目标 App**：DramaVerseJP 与 Aurora Drama 是不同 App，Client Key、后端、支付和媒资配置不能混用。
2. 在应用目录执行 `npm ci`、`npm run test:all`。
3. 执行 `npm run build:minis`；当前固定为 `tiktok-minis-cli@0.0.7` 的 `minis build`，它会报告包路径并完成检查。
4. 执行 `npm run check:minis` 重新检查。`dist-preview/` 是网页体验产物，**不要上传**。
5. 由发布负责人到目标 App 的 **Code version** 上传官方 CLI 产物，等待扫描结果。
6. 配好测试名单，分别完成 Android／iOS 日本环境端内预览，按[交付清单](/guide/developer-delivery#_5-上传后必须补做的真机测试)测试。
7. 必要开发联调与前置审核完成后，再由发布负责人选择提审和发布方式。**2026-10-15 已上传 Aurora 版本 1，但未提审／发布；可预览不等于真实业务已接通。**

### 2.3 当前工程配置

| 项目 | 值 |
| --- | --- |
| App 名 | Aurora Drama |
| App ID | `7670022867891177493` |
| Client Key | `mnp696ef4kyeebk7` |
| 技术栈 | Vue 3 + Vite + Vant 4 + Pinia |
| 页面 | 首页剧单 / 详情 / 播放 / 个人中心 / 搜索 |
| 本地业务服务 | 独立管理网页、Node.js API、SQLite、私有媒体文件、账户与测试订单 |
| 语言 | 日语（日本市场） |

## 3. 数据查看（Analytics）

平台侧路径：**Aurora Drama → GROWTH → Analytics**

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

- 具体报表与更新频率以目标应用实际后台为准，本轮未对真实业务数据进行测试。
- 营收页面能打开不代表功能已启用；本轮读取 Aurora Drama 的 IAP 页仍提示需先上线。
- 没有实际用户、真实订单和可播放片库时，不展示演示评分／播放次数冒充业务数据。

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

以下保留此前旧 DramaVerseJP 的核查背景，**不是当前 Aurora 的上线完成度**。Aurora 的版本与前置缺项以 [010 本轮记录](/progress/updates/2026-10-15-010-aurora-upload)为准：

| 步骤 | 状态 | 说明 |
| --- | --- | --- |
| Complete business verification | ✅ | 2026-10-14 本轮核查原JP主体与建议选用主体的企业认证均已验证；不能混用主体ID |
| Apply for industry qualification | 🔶 | **纠正旧状态**：原JP主体当前显示“无法认证”，需补相关文件；另一个已通过主体可优先评估，见 [007 核查](/progress/updates/2026-10-14-007-japan-organization) |
| Apply for general launch approval | ⬜ | 通用上线审核适用于所有地区；建议选用主体当前未完成。日本不因此需要先完成美国专属审核 |
| Activate media asset management | ⬜ | 媒资管理（BytePlus）激活（status=2） |
| Add basic information | 🔶 | 图标、描述、Terms·Privacy、JP、版权声明、SDK 已保存并刷新验证，邮箱仍已验证；**缺真实 Apple Team ID（不是邮箱），尚未提审**。原因和后续操作见 [004 更新](/progress/updates/2026-10-14-004-basic-info) |
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
