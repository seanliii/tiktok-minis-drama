# Aurora Drama · 短剧 Minis 项目

> **最新交接：香港 Linux → Mac 的实际恢复演练已通过。** 使用合成用户与订单完成在线备份、加密传输、异机恢复及独立核对；不等于定期生产备份已经启用。香港生产配置确实存在，标准启动检查仍因缺真实 HTTPS 来源而失败，业务服务未启用。域名注册商账号页已在正确 Chrome 打开，当前最先需要负责人完成注册人及付款资料。**生产业务、HTTPS、端内播放、真实付款和提审均未完成。** 见 [026 当前交接](docs/progress/updates/2026-10-19-026-deployment-recovery-handoff.md)。

> **025 阶段结果（已发布）**：平台绑定已刷新确认，真实 OAuth 星号令牌问题已修复，香港前后台已构建；本地完整隔离回归及 Linux 1820 项服务端测试见 [025](docs/progress/updates/2026-10-18-025-tiktok-binding-and-deployment.md)。所选域名未注册、VOD 缺播放域名，TikTok 视频查询尚未通过，不能将这些写成已上线。

> **公开文档网站已发布并在线验证**：文档 PR #1 已合并，对应 GitHub Pages 工作流已成功；手机／桌面共 12 项页面检查、导航和 Aurora 图标均通过。无需再操作旧 GitHub 表单。范围仍仅限公开文档、品牌资源及文档构建配置；见 [020 发布证据](docs/progress/updates/2026-10-17-020-public-docs-release.md)。这不是应用提审、云资源购买或后台源码公开。

> **024 阶段记录（历史）**：正确 Chrome 会话、IAM、真实上传及香港主机已完成首轮核验；当时 TikTok 绑定还未完成。后续绑定和令牌修复已进入 025，不再沿用旧状态。见 [024 阶段交接](docs/progress/updates/2026-10-18-024-live-upload-hongkong-server.md)。

> **视频空间创建记录（北京时间 2026-10-18）**：`auroradrama-jp` 已创建，确认私有访问和上传后不自动发布；Apple Team ID 支持网页查询，不必先安装 Developer App。见 [022 历史交接](docs/progress/updates/2026-10-18-022-video-space-web-team-id.md)。

> **023 历史本地复核**：该轮完整回归无失败或跳过，但当时真实 STS 仍被拒绝。后续 024 已完成真实上传与权限修复，并重新执行完整回归；以 024 为准，不能再沿用旧拒绝状态。

> **上一阶段云服务进展（北京时间 2026-10-17）**：VOD 已开通，按天结算、按流量计费；ECS 标准服务角色已授权。该次没有购买服务器或预付视频套餐，见 [021 云开通记录](docs/progress/updates/2026-10-17-021-cloud-activation.md)。不再按旧记录重复绑卡、开通或创建空间。

> **本地功能进展（北京时间 2026-10-17，历史）**：补齐订阅页的解约／停止续费说明；未登录、网络失败或购买未配置时也可阅读，不假装执行取消。该轮完整本地回归 **0 失败、0 跳过**，194 个应用文件指纹一致，当时的本地页面及原业务数据已复核。见 [019 当时进展](docs/progress/updates/2026-10-17-019-subscription-management.md)。**真实 Team ID／邮箱及内容／地区声明、真实部署和平台验收仍未完成。**

> **上一阶段（北京时间 2026-10-17）**：订阅八类通知、匹配确认、每期流水、历史退款隔离、用户／后台历史与消费者重启恢复已接入；同一次全量本地回归通过，193 个应用文件前后不变。本机前后台已更新，13 张原业务表内容指纹一致。见 [018 账本交接与配合清单](docs/progress/updates/2026-10-17-018-subscription-ledger.md)及[订阅手册](docs/guide/subscription-workflow.md)。**当时尚未部署云服务、未官方真机验收或真实收费、未提审。**

## 历史里程碑

以下保留各阶段当时的记录；云服务与当前验证进展以 **026** 为准，既往应用回归与绑定见 **025**。不把历史待开发项当成仍未实现，也不把离线通过当成上线。

> **2026-10-16 订阅继续推进**：套餐、原操作恢复、官方测试入口及已有会员实时访问已接通；完整本地回归通过，本地服务已更新且原业务数据摘要一致。新品牌图标也已保存到 Aurora 后台草稿。见 [017 验证与后续实现](docs/progress/updates/2026-10-16-017-subscription-access.md)及[订阅使用说明](docs/guide/subscription-workflow.md)。**原始公开文档已补到通知结构，接下来继续付款核销和每期流水；尚未正式收款、云部署、真机验收或提审。**

> **2026-10-16 本轮验收完成**：云端草稿登记、短期封面授权、回执恢复与统一 Aurora 品牌已接入，整套本地回归通过；本地服务已更新并保留原业务数据。见 [016 当时进展与上线缺项](docs/progress/updates/2026-10-16-016-registration-readiness.md)。**当时云服务未开通部署，Aurora 基本信息和版本未提审，正式订阅仍需开发与真机验收。**

> **2026-10-16 开发收尾**：云端已核验视频可导入本地草稿单集；增加任务分页、跨账号清理和独立数据备份恢复。主任务已实际备份并恢复本机业务数据。见 [015 收尾与剩余事项](docs/progress/updates/2026-10-16-015-import-and-migration.md)及[备份恢复手册](docs/guide/backup-restore.md)。云端新剧登记、正式订阅、部署与真机验收仍未完成。

> **2026-10-16 云账号后续核查**：Aurora 媒资功能**已激活、尚未绑定 BytePlus**；企业 KYC、账务、ECS 服务授权和 VOD 开通仍有缺项。BytePlus ECS 公开地域表未列东京或首尔，不按 VOD 地域推断主机可购买地域。见 [014 当前缺项与配合清单](docs/progress/updates/2026-10-16-014-byteplus-readiness.md)。未绑卡、未采购，真实云上传与用户付款未验收。

> **2026-10-16 云上传接入**：后台新增直接上传 BytePlus 的任务与界面，服务器核验实际文件和 TikTok 可见性。详见[云上传使用与配置](docs/guide/cloud-upload.md)及[013 验收记录](docs/progress/updates/2026-10-16-013-cloud-upload.md)。真实云权限尚未配置；新建云端剧目和正式订阅仍未全部完成。

> **当前应用已确定（2026-10-15）**：使用 **Aurora Drama，App ID `7670022867891177493`，Client Key `mnp696ef4kyeebk7`**。本次日本日文首发，韩国和东南亚作为后续分批扩展，不提前开放。见 [Aurora 首发说明](docs/guide/aurora-launch.md)与[010 上传记录](docs/progress/updates/2026-10-15-010-aurora-upload.md)。下方 DramaVerseJP 名称和旧 App 信息属于历史阶段。

> **平台接入后续进展**：新增不依赖第三方 Cookie 的 Minis 业务会话、已有平台剧目的关联与审核／上下架管理、逐次播放凭证，以及管理员订阅只读核对。见 [012 接入、验证与剩余工作](docs/progress/updates/2026-10-15-012-platform-integration.md)。**视频直传云端、新建云端剧目、正式 VIP 生命周期和 TikTok 真机付款仍未完成；不是只补 Team ID 就能收费上线。**

> **2026-10-14 开发状态**：已接通可持久化的本地前后台：上传管理、注册登录、片库、订单、单集／整剧／测试 VIP 解锁、收藏续看及退款。**Sandbox 不扣真钱，未上线。** 使用步骤见 [前后台本地手册](docs/guide/local-fullstack.md)、[008 实施验证](docs/progress/updates/2026-10-14-008-fullstack.md)；平台资料和真实联调见 [团队清单](docs/guide/developer-delivery.md)。

> **2026-10-15 同流程更新**：移除测试付款额外确认，预发布／正式共用平台身份、内容和订单代码，增加金额预检查、主动平台状态核对以及真实服务的三环境验收。见 [环境配置与实际边界](docs/guide/environment-parity.md)、[009 更新](docs/progress/updates/2026-10-15-009-environment-parity.md)。仍未执行官方沙箱、真机或真钱测试；WebKit 跨站 Cookie 的限制已明确记录。

## 直接打开前后台

```bash
cd app/tt-minis
npm ci
npm run local
```

- 用户端：`http://127.0.0.1:5310/#/`
- 管理端：`http://localhost:5310/admin/`
- 初始随机管理员凭据：`app/tt-minis/.local/admin-credentials.txt`（仅本机，禁止提交）。
- 用户在用户页注册自己的观看账号。建议按上述不同主机名同时打开两种角色，避免共用一份 Cookie。
- 数据在 `.local/` 保留；全部回归使用 `npm run test:all`，测试不动开发者数据。

**真实短剧媒资与生产订阅不能用测试代替。** 当前本地发布不会自动完成 TikTok 内容审核；真实端内收款还需平台配置、剩余接入及真机验收。

TikTok Minis「漫剧」付费 + 订阅小程序。团队协作站点，只有两个板块：

| 板块 | 地址 | 说明 |
| --- | --- | --- |
| 进度看板 | https://seanliii.github.io/tiktok-minis-drama/ | 必要功能清单、T+N 开发方案、工作流看板、**全部开发记录**（每次代码提交同步更新，含功能描述与界面截图） |
| 开发文档 | https://seanliii.github.io/tiktok-minis-drama/guide/ | 6 篇 TikTok Minis 官方文档汇总（技术形态 / 调试 / 登录 / 授权 / 支付 / 接入全流程） |
| 优化池提交 | https://seanliii.github.io/tiktok-minis-drama/pool/ | 一键提交问题 / 建议（**支持粘贴截图**），列表实时展示处理状态；每页底部可直接评论留言 |

## 开发节奏

- **开发已于 2026-10-14 启动**，不再等待新的开发账号或另建同一应用。
- 最初以 **T = 2026-10-14** 估算开发、测试和提审节奏。下述 T+N 仅是早期计划，不是上线承诺；当前须先完成域名、真实业务与平台验收，再以实际提交时间跟踪审核。

## 目录结构

```
.
├── docs/                              # 文档站点（VitePress）
│   ├── .vitepress/
│   │   ├── config.mts                 # 站点配置（两板块导航）
│   │   └── theme/                     # giscus 评论区组件
│   ├── index.md                       # 进度看板（首页）
│   ├── pool/index.md                  # 优化池提交
│   └── progress/
│       ├── updates.data.js            # 开发记录自动聚合（按日期倒序）
│       ├── updates/                   # 每次提交对应一条记录
│       └── screenshots/               # 界面截图
├── .github/
│   ├── ISSUE_TEMPLATE/                # 问题（可附图）/ 功能建议模板
│   ├── workflows/deploy-pages.yml     # GitHub Pages 自动部署（已配置并运行）
│   └── PULL_REQUEST_TEMPLATE/         # PR 模板
├── CONTRIBUTING.md                    # 协作规范
└── README.md
```

## 如何反馈问题 / 提建议

1. 到「优化池提交」页点按钮发 Issue（截图直接粘贴）
2. 或在任意页面底部评论区留言（需 GitHub 账号，登录后首次会请求授权 giscus 评论应用）

## 官方参考文档（Lark）

- [TikTok Minis 技术形态说明](https://bytedance.larkoffice.com/wiki/JvMAwLZJzigrwAkuOzPcUsGenRb)
- [TikTok Minis 开发调试指南](https://bytedance.larkoffice.com/wiki/NjgSwYNSHiiMdxkJHHwcTY1lnCg)
- [TikTok Minis 静默登录（login）能力接入说明](https://bytedance.larkoffice.com/wiki/Fw22w0BuoiDD2vklMPjcos66nEd)
- [TikTok Minis 显示授权（authorize）接入指南](https://bytedance.larkoffice.com/wiki/NBtUwZuWwiFJ2Iklb8zcGAyLnyh)
- [TikTok Minis 端内支付能力接入指南](https://bytedance.larkoffice.com/wiki/LLpyw0GQLiYPGRkcUcLcLQm3nWc)
- [TT Minis 接入全流程（One Page）](https://bytedance.larkoffice.com/wiki/MJ2BwFqSxi4r2SkwHS8cRrlsnVb)
