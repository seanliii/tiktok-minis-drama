---
title: 日本短剧 Minis 与 App 对标（2026-10-14）
---

# 日本短剧 Minis 与 App 对标（2026-10-14）

> 团队文档草稿｜研究基准日：2026-10-14｜不构成日本真机验收或正式上线证明。

> 后续补充：本页保留最初研究范围，不能当作当前功能完成清单。后续已实际浏览 BUMP 与 Teller Drama 网站及分类／新作入口，品牌与体验原则见[Aurora 品牌说明](/guide/aurora-brand)；前后台与云登记进展见[云端剧目登记](/guide/platform-registration)。仍未将竞品网页观察冒充日本 Minis 真机测试。

## 1. 先说清楚证据边界

**本稿是一手资料对标，加一家 ReelShort 日文公开网站的网页观察；没有亲测其他短剧 App，也没有亲测日本 TikTok Minis。**
两份调研笔记已合并；网页观察来自主代理本轮记录，本稿补读截图和公开 HTML，不把商店宣传截图当成自己的操作结果。
没有登录竞品、消费、下载或录制短剧；没有复制竞品封面、影片、文案或代码作为项目素材。
本文不采用未经核实的营收、市场排名、下载量、单集价格或订阅金额；“未核实”不代表“没有”。

| 证据级别 | 本文含义 | 不能推导的结论 |
| --- | --- | --- |
| **实际网页看到** | 本轮 ReelShort 日文公开网页截图可见的布局、文字和入口 | 不能证明按钮已操作成功、原生 App 同样实现或日本 Minis 可达 |
| **官方功能说明** | 官网、官方商店、条款和开发者文档明确描述的能力 | 不能代替实际播放、收藏、奖励到账或付款履约 |
| **日本Minis上线公告** | 运营公司明确宣布品牌通过 Minis 面向日本上线 | 历史公告不保证当前每个日本账号、客户端和网络均可访问 |
| **待真机验证** | 本次未获得足够端内操作证据，交给团队按第 8 节复测 | 不写成“没有功能”“全部通过”或“日本已全面开放” |

官网静态 HTML 的内容提取属于资料核对，不另算第二家渲染网页实测。
独立 App、普通网站、TikTok 普通短视频／Drama Center 系列、Minis 是不同产品入口，不能互换证据。

## 2. 样本与日本关联

| 样本 | 运营／开发者 | 与日本市场的直接依据 | 本轮证据范围 |
| --- | --- | --- | --- |
| BUMP | emole株式会社／EMOLE INC.，日本 | 日本公司、日文官网及日本区商店 | 官方功能说明 [B1–B4] |
| テラードラマ（Teller Drama） | TELLER NOVEL INC.，日本 | 东京开发者、日本制作独占原创和日本区商店 | 官方功能说明 [T1–T2] |
| TopShort | HAN BOOK PTE. LTD.，新加坡；商店展示 Joy Hunter | 日本区日文产品介绍 | 官方功能说明 [P1–P3] |
| DramaBox | STORYMATRIX PTE. LTD.，新加坡 | 日本区日文介绍明确日中韩作品 | 官方功能说明 [D1–D3] |
| ReelShort | New Leaf Publishing, Inc.，美国 | 日文公开网站与日本区商店 | 实际网页看到＋官方功能说明 [R1–R2] |
| RJOY Minis | RJ RISINGJOY PTE. LTD.，新加坡 | 公司 2026-06-15 公告明确美国、日本首发范围 | 日本Minis上线公告；端内待验证 [M1] |

日本本土运营方样本是 BUMP、Teller Drama；不能把有日语版本的新加坡／美国公司写成日本本土公司。
POCKET DRAMA 优先检索后仍未完成“日本本土运营方＋短剧 App”身份核实，不强行纳入。
近似名称 PocketDrama: Short & Reels 的官方商店开发者为美国 CEMETRIK LLC [C1]，不可混同。
“ポケットドラマCD”等近似名称也不能仅凭名字被算作视频短剧产品。

## 3. 唯一网页观察：ReelShort 日文网站

观察地址为 [ReelShort 日本语网站](https://www.reelshort.com/ja)，不是 TikTok Minis 或原生 App。
主代理截图在本机 `/tmp/dramaverse-qa-20261014/reference-reelshort-ja.png`；本稿只引用观察结论，不复制图片进站点。

- **实际网页看到：**顶部有首页、分类、粉丝社区、品牌文字，以及搜索、语言、账户与充值入口。
- **实际网页看到：**剧集按卡片分组，呈现排行样式与独占短剧区，有“全部見る”入口。
- **实际网页看到：**卡片有日文标题、题材与“新着”“吹き替え”等标记，帮助区分新作、配音和内容类型。
- **不能宣称：**未据此验证搜索结果正确、进入某集、收藏成功、断点恢复、充值价格或扣费结果。
- **对我们的启发：**发现页应让用户知道“是什么、什么语言、从哪里开始看”，而不只是摆一排封面。

这些是界面组织参考，不是“ReelShort 最热门”或“该品牌已加入日本 Minis”的证据。

## 4. 用户体验对比：已知与未知放在同一张表

除 ReelShort 已注明的网页观察，其余已知项均为**官方功能说明**；所有未核实项均进入**待真机验证**。

| 样本 | 发现与选集 | 免费方式 | 收藏与续看 | 付费透明度 |
| --- | --- | --- | --- | --- |
| BUMP | 官网有推荐、题材和作品清单；商店说明榜单；选集器未核实 | 等待免费、看广告免费；部分全剧免费，每日次数有限 | 收藏入口、断点恢复未核实 | 条款确认购买币／赠币、周／月订阅；单集币数和日元金额未核实 |
| Teller Drama | 商店说明“今日TOP10”和新作；选集器未核实 | 无需注册、每日赠币、看广告、等待免费 | 收藏及续看未核实 | 有 IAP 标识；币包面额、订阅和实际价格未核实 |
| TopShort | 商店说明类似 TikTok 的摘要浏览；选集器未核实 | 特典可免费看片；有广告，但奖励广告规则未核实 | 政策提及收藏数据；商店说明多设备同步，不能等同断点续看实测 | 有 IAP 与自动续费文字；coins 体系及日区金额未核实 |
| DramaBox | 商店说明多题材、每周更新独占作品；实际分类／选集器未核实 | 每日登录免费、任务增加可看内容；奖励广告未核实 | 收藏与断点续看未核实 | 条款说明充值 Coin，部分作品需付费会员；周期、币价和日元金额未核实 |
| ReelShort | 网页可见分类、剧单和卡片标记；选集操作未核实 | 商店有广告／IAP 标识；免费集数、等待和奖励广告未核实 | 网页／App 的收藏与续看操作未核实 | 网页有充值入口；商店说明按需付费；价格、币包和权益细节未核实 |
| RJOY Minis | 上线公告未提供可复核的发现／选集操作 | 免费范围、广告与任务均未核实 | 收藏、续看均未核实 | 币种、订阅、价格和权益说明均未核实 |

不能把 Google Play 的“ほしいものリストに追加”当成 App 收藏，也不能由“含广告”推断奖励广告解锁。
完整剧集可看、跨设备可同步、隐私政策采集观看数据，都不足以单独证明断点续看成立。

### 内容形态与时长

| 样本 | 官方说明能支持的内容形态 | 时长证据 |
| --- | --- | --- |
| BUMP | 兼有真人作品与动画，横／竖屏；具体作品演员页支持真人身份 | 商店说明每集约 1–3 分钟 |
| Teller Drama | 日本原创、中韩剧及音声剧；真人／动漫构成未核实 | 商店说明每集 1–3 分钟 |
| TopShort | 恋爱喜剧、复仇、不伦等短剧；真人／动漫构成未核实 | 未核实，不用“短尺”猜分钟数 |
| DramaBox | 日中韩、纯爱、复仇等题材；真人／动漫构成未核实 | 商店说明每集 1–2 分钟 |
| ReelShort | 商店说明竖屏独占短剧；封面不能证明真人拍摄方式或片库比例 | 商店以约一分钟剧集作产品介绍，不视为每集实测值 |
| RJOY Minis | 公告列出 AI 动漫与 AI 人物影像内容；不能把 AI 人物叫作真人实拍 | 未核实 |

Teller Drama 链接的通用条款含 Teller Novel 小说 VIP 描述，不能移用为短剧订阅已证实。
TopShort 的收藏信息来自较早的隐私政策，仅作声明证据；DramaBox 英文通用条款的美元表述不是日本价格。

## 5. 日本 Minis：RJOY 已有公告，其他仅作候选

RisingJoy 公司官网 2026-06-15 公告明确：RJOY 通过 TikTok Minis 首先面向美国与日本观众 [M1]。
本轮重新读取到该公司原文；它是**日本Minis上线公告**，不是 TikTok 对该品牌的独立体验背书。
公告中的原创排期不等于公告当天全部已交付，也不能推导 2026-10-14 所有日本账号均可打开。
RJOY 的实际入口、日语界面、免费剧集、字幕、切集及解锁，仍为**待真机验证**。

TikTok 2026-06-29 官方文章将日本列入 Minis Center 市场；发布资料文档也列出日本 [M2、K1]。
平台支持日本不代表任一品牌获批、任一账号可达；开发者扫码预览不等于普通用户正式访问。

| 候选 | 当前可写结论 | 升级为日本已验证样本还缺什么 |
| --- | --- | --- |
| ShortMax | 仅为后续核验候选，不作为已确认日本 Minis | 品牌入驻一手原文、日本覆盖证据及正常端内路径 |
| NetShort | 同上；日语官网／独立 App 不代替 Minis 身份 | 同上；访问失败也不证明下线 |
| Starshort／StarShort | 同上；没有取得足够一手入驻资料 | 同上；先核对名称与运营方，避免同名混淆 |

TopShort 在本文作为独立 App 对标，其 Minis 身份仍未核实；也不宣称 ReelShort、DramaBox 已加入或尚未加入 Minis。

## 6. DramaVerseJP：已完成的是前端基础，不是完整商业服务

下表按主代理本轮同步的实现范围记录；本稿不另行宣称完成源码审计、正式服务验收，也不写最终测试数量。

| 当前已完成的前端范围 | 必须保留的说明 |
| --- | --- |
| 无阻塞访客进入 | 不把账号授权作为演示首页的无理由门槛；不代表真实静默登录接通 |
| 明确标注 sample | 演示内容、账号和权益不能冒充正式片库、真人账号或已购状态 |
| 本机收藏与历史 | 只承诺本机保存，不宣称账户同步、换机保留或云端续看 |
| 分段选集 | 长剧集清单分段浏览；实际发布状态仍需服务端数据 |
| 免费／锁定区分 | UI 区分可看与锁定；不能靠前端变量决定真实观看权益 |
| 离线 test 视频 | 用于本地可重复测试，不代表正式版权内容或 VePlayer 已接通 |
| 故障提示与重试 | 前端有恢复入口；真实网络、客户端和服务端错误仍需联调 |
| 取消不假成功 | 取消不能显示已登录、已付款、已订阅或已解锁；真实 SDK 回调仍需核验 |

**下一阶段仍包含开发，不是“只剩运营填资料”。** 像建好售票窗口，还必须连上票务系统，才知道能收多少钱、卖哪张票。

| 仍需开发／联调 | 验收要求与协作方 |
| --- | --- |
| 账号与会话 | SDK 登录、服务端令牌交换、授权取消、过期及跨设备进度；前端＋后端 |
| 订单与支付 | 真实商品、订单、付款回调／查询、重复通知处理、取消、恢复购买与退款；后端＋前端＋平台 |
| 权益与免费策略 | 已购／订阅状态、赠币与购买币、等待次数、广告奖励确认；后端决定，前端如实显示 |
| CMS／片库 | 内容、日语元数据、集序、地区、审核／上架／下架状态；后端＋内容运营 |
| VePlayer | 官方播放器、媒资标识、版本兼容、字幕、切集、销毁与错误恢复；前端＋后端＋平台 |
| 发布与日本覆盖 | 真实资质、版权、地区、测试名单、内容与版本审核；运营＋研发＋平台，不能用假资料替代 |

## 7. 开发者文档的新旧流程：不要拼接命令

当前开发主流程采用 **`tiktok-minis-cli@0.0.7`**；项目依赖与实际安装包均已核对，不称它为永久最新版本。
应用脚本使用 `minis build`；这与当前 Develop／Debug 文档的 `tiktok-minis-cli`、`minis dev`／`minis build` 相符 [K2–K3]。
Legacy Development 页面仍使用 `@tiktok-minis/cli`、`ttdx minis ...`，属于另一套说明，不混用包名和命令 [K8]。
本轮原调研已读取这些官方正文；合稿重读开发页时连接超时，因此没有把重读说成成功。
**本稿不沿用旧的 50MB／30MB 上限断言，也不硬编码另一个永久上限；以实际 Developer Portal 与当前上传校验为准。**
开发配置、预览成功、审核通过、正式发布必须分别记录 [K1–K4]。

- JS SDK 初始化、客户端能力与业务后端是不同环节；普通浏览器显示页面不代表 SDK 可用 [K5、K9]。
- 官方短剧播放链路采用 **VePlayer**；离线 test 视频和普通 HTML 视频演示不能当成正式接入通过 [K6]。
- 内容必须满足绑定、审核与上架要求；审核通过但未上架不等于可播放，不用原始视频地址绕过 [K7]。
- Android 本地调试、iOS 上传扫码和测试名单按当前官方流程准备；不扩大为所有正式用户必须装测试客户端 [K2–K3]。

## 8. 团队真机比较：八步执行，当前均未以本稿宣布通过

1. **记录环境。** 由有授权的测试人员使用本人设备，记录日期、设备／OS、TikTok 与 App 版本、日本环境依据和界面语言。
   日本网络、日语 UI 不单独证明账号地区；报告用匿名测试编号，不索取密码或 `client_secret`。
2. **核对产品和入口。** 独立 App 从官方日本商店核对开发者；RJOY 记录普通用户实际看到的搜索、Minis Center 或官方锚点路径。
   排除普通外链、商店跳转、短视频和 Drama Center；一次搜不到只记“本次环境未发现”。自家开发预览另行标记。
3. **比较发现页。** 同题材寻找一部剧，记录搜索／分类、日语／配音／字幕标记、原创说明和点到目标的实际路径。
   不只记按钮存在，还要记能否到达正确作品；不抄标题封面制作自家样本。
4. **比较选集和播放。** 在正常授权的免费范围测试首次播放、暂停、下一集、指定集、分段选集和返回；记录错集、黑屏与双音轨。
   按实际内容记录首帧和切集等待，不填估计秒数；不下载、抓取或录制短剧。
5. **比较收藏和续看。** 收藏后返回再进入，观看一段后退出重开，测试前后台切换、刷新与本机历史。
   本机恢复与跨设备同步分开；未实际使用第二台设备就把跨设备写成未测。
6. **比较免费方式。** 核对免费集、等待倒计时、每日次数、广告奖励与赠币用途，记录失败、关闭及奖励到账状态。
   没看完广告不写已发奖；无实际广告条件就标未测，不绕过地区、登录或付费限制。
7. **比较价格与取消。** 只查看付款确认前的单集币数、币包日元价、订阅周期、自动续费和权益说明，并测试退出与取消。
   不发生真实消费；实际扣款、履约和退款记未测。测试消费另需明确授权与受控方案。
8. **验证自家真实链路。** 在批准的预览环境联调账号、订单、权益、CMS 与 VePlayer，用自有授权内容测断网、过期、下架和重试。
   预览通过后仍需内容／版本审批；获准正式发布后再用非测试账号验证日本普通用户入口，不能把预览结果升级为上线结果。

### 可复制的单次记录模板

```text
测试编号／日期／执行人代号：
样本／运营方／入口类型：独立 App／公开网站／Minis 正式／自家预览
设备／OS／TikTok 版本／App 版本：
日本环境依据／界面语言：仅记录必要信息，不保存账号身份
来源 URL／普通用户入口步骤：
发现页：搜索词、分类、语言标记、到达结果
选集与播放：免费集范围、集序、首帧、切集、暂停、错误
收藏与续看：本机／跨设备分开，实际恢复位置
免费机制：等待、次数、广告动作、赠币与到账结果
价格透明度：币数、日元金额、周期、续费提示；未看到填未核实
取消／故障／重试：实际动作、结果、是否误报成功
证据级别：实际网页看到／官方功能说明／日本Minis上线公告／待真机验证
真机实测范围：具体已执行步骤；未执行项另列，不能覆盖升级整份资料
结论：通过／失败／本次环境未发现／未测；后续责任人
脱敏非视频 UI 截图编号／未测项／限制：
```

不要记录密码、Cookie、访问令牌、二维码令牌、`client_secret` 或视频播放地址；不需要这些秘密才能比较产品体验。

## 9. 一手来源：完整 URL 与使用范围

以下均为公开一手入口；“链接存在”不等于本次页面所有内容都可访问，具体限制见第 10 节。

- **B1｜BUMP 产品官网：** [https://www.bump.studio/](https://www.bump.studio/)；推荐、题材、运营方；公司：[https://emole.co.jp/](https://emole.co.jp/)。
- **B2｜BUMP 日本商店：** [https://play.google.com/store/apps/details?id=com.emole.bump&hl=ja&gl=JP](https://play.google.com/store/apps/details?id=com.emole.bump&hl=ja&gl=JP)。
- **B3｜BUMP 收费条款：** [https://frontend.bump.systems/rules/service-terms](https://frontend.bump.systems/rules/service-terms)；第 9–15 条。
- **B4｜BUMP 真人作品资料：** [https://www.bump.studio/lists/3000mankasege](https://www.bump.studio/lists/3000mankasege)；演员与制作信息。
- **T1｜Teller Drama 官网：** [https://teller.jp/short-drama](https://teller.jp/short-drama)；产品入口，静态正文不足。
- **T2｜Teller Drama 日本商店：** [https://play.google.com/store/apps/details?id=jp.teller.drama&hl=ja&gl=JP](https://play.google.com/store/apps/details?id=jp.teller.drama&hl=ja&gl=JP)。
- **P1｜TopShort 官网：** [https://www.topshortapp.com/](https://www.topshortapp.com/)；产品入口，静态正文不足。
- **P2｜TopShort 日本商店：** [https://play.google.com/store/apps/details?id=com.tikshorts.novelvideos&hl=ja&gl=JP](https://play.google.com/store/apps/details?id=com.tikshorts.novelvideos&hl=ja&gl=JP)。
- **P3｜TopShort 政策：** [https://www.tikshortsbox.com/agreement/privacypolicy.html](https://www.tikshortsbox.com/agreement/privacypolicy.html)；2023-06-10 版本，不代表当前 UI。
- **D1｜DramaBox 官网：** [https://www.dramabox.com/ja](https://www.dramabox.com/ja)；本次 403，不用作已见界面证据。
- **D2｜DramaBox 日本商店：** [https://play.google.com/store/apps/details?id=com.storymatrix.drama&hl=ja&gl=JP](https://play.google.com/store/apps/details?id=com.storymatrix.drama&hl=ja&gl=JP)。
- **D3｜DramaBox 通用条款：** [https://support.dramaboxdb.com/terms.html](https://support.dramaboxdb.com/terms.html)；Coin 与付款说明，不是日区价目表。
- **R1｜ReelShort 日文官网：** [https://www.reelshort.com/ja](https://www.reelshort.com/ja)；本轮唯一渲染网页观察对象。
- **R2｜ReelShort 日本商店：** [https://play.google.com/store/apps/details?id=com.newleaf.app.android.victor&hl=ja&gl=JP](https://play.google.com/store/apps/details?id=com.newleaf.app.android.victor&hl=ja&gl=JP)。
- **C1｜同名排除资料：** [https://play.google.com/store/apps/details?id=com.pocketshorts.dramareels.swipeup&hl=ja&gl=JP](https://play.google.com/store/apps/details?id=com.pocketshorts.dramareels.swipeup&hl=ja&gl=JP)。
- **M1｜RisingJoy 公司公告，2026-06-15：** [https://www.risingjoy.media/news/25](https://www.risingjoy.media/news/25)；美日 Minis 声明与 AI 内容形态。
- **M2｜TikTok 官方平台说明，2026-06-29：** [https://ads.tiktok.com/business/en-US/blog/tiktok-growth-max-mini-series](https://ads.tiktok.com/business/en-US/blog/tiktok-growth-max-mini-series)；日本支持范围。
- **K1｜基础资料：** [https://developers.tiktok.com/docs/en/tiktok-minis-basic-information-specifications](https://developers.tiktok.com/docs/en/tiktok-minis-basic-information-specifications)。
- **K2｜当前开发流程：** [https://developers.tiktok.com/docs/en/tiktok-minis-develop-your-mini-app](https://developers.tiktok.com/docs/en/tiktok-minis-develop-your-mini-app)。
- **K3｜调试流程：** [https://developers.tiktok.com/docs/en/debug-your-mini-app](https://developers.tiktok.com/docs/en/debug-your-mini-app)。
- **K4｜发布流程：** [https://developers.tiktok.com/docs/en/tiktok-minis-release-your-mini-app](https://developers.tiktok.com/docs/en/tiktok-minis-release-your-mini-app)。
- **K5｜技术总览：** [https://developers.tiktok.com/docs/en/tiktok-minis-technical-overview](https://developers.tiktok.com/docs/en/tiktok-minis-technical-overview)。
- **K6｜官方播放器：** [https://developers.tiktok.com/docs/en/minis-player](https://developers.tiktok.com/docs/en/minis-player)。
- **K7｜媒资管理：** [https://developers.tiktok.com/docs/en/media-asset-management](https://developers.tiktok.com/docs/en/media-asset-management)。
- **K8｜Legacy 开发说明：** [https://developers.tiktok.com/docs/en/minis-development-stage](https://developers.tiktok.com/docs/en/minis-development-stage)；只用于识别旧 CLI。
- **K9｜SDK 基础能力：** [https://developers.tiktok.com/docs/en/minis-sdk-basic-utility](https://developers.tiktok.com/docs/en/minis-sdk-basic-utility)；初始化与能力兼容。

## 10. 访问限制与交接说明

- 原调研已执行 `web.run`，未返回可引用正文时改用 curl 读取官方 HTML；没有伪造搜索引用编号。
- Google Play 使用 `hl=ja&gl=JP`，实际返回日本／日语页面；商店介绍是产品宣称，不保证所有日本设备均可安装。
- BUMP 的 Apple 日本区链接本次跳转中国区首页，未用于价格；BUMP FAQ 出现 SSL 连接错误，未假称读到。
- TopShort 与 Teller 官网需 JavaScript 才有完整界面；DramaBox 官网 403，均没有用空页面或错误页推断功能不存在。
- 官方开发文档以原 Minis 调研读取的正文为据；合稿时部分连接超时，后续操作仍需对照实际门户。
- 本稿只提供可追溯结论和后续验收清单，不覆盖其他旧市场文档，也不把旧文档中的数字当作事实继承。
- 原始笔记保留于 `/tmp/dramaverse-qa-20261014/jp-app-research.md` 与 `/tmp/dramaverse-qa-20261014/jp-minis-research.md`；它们不是公开站点依赖。
- 本次只新增本文，不修改其他文件、不执行 commit；最终测试数量、代码提交和发布状态由主代理另行汇总。
