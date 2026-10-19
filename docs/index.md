---
title: 进度看板
---

# Aurora Drama · 开发与上线进度

<script setup>
import { withBase } from 'vitepress'
import { data as updates } from './progress/updates.data.js'

const typeBadge = (t) => {
  const map = { '功能': 'tip', '修复': 'warning', '文档': 'info', '测试': 'danger', '上线': 'tip' }
  return map[t] || 'default'
}

const statusBadge = (s) => {
  const map = { '已完成': 'tip', '进行中': 'info', '阻塞': 'danger', '未开始': 'default' }
  return map[s] || 'default'
}
</script>

::: tip 开发已启动（T = 2026-10-14）
**当前交接：条款、隐私和服务域名已切到 `auroradrama.app`。** 两份法律文件已独立部署、匿名及禁用 JavaScript 均可阅读；TikTok 服务端保存及页面刷新均已核对。个人中心、包内清单和后台信任域名移除了个人 GitHub。新前端已上传为版本 3，刷新确认扫描结束、可供测试账号预览，未提审或发布。见 [028 当前交接](/progress/updates/2026-10-19-028-brand-legal-pages)；Apple 编号网页申请及身份核验替代方式见[专门说明](/guide/apple-team-id-web)。

**027 部署背景：域名已购，真实 HTTPS 前后台已启用。** 用户端 **[auroradrama.app](https://auroradrama.app/)**，后台 **[auroradrama.app/admin/](https://auroradrama.app/admin/)**。管理员登录、上传管理、退出及手机／桌面检查通过；生产支付仍禁用，片库为空。视频域名证书、CNAME 与调度已配置，但实际播放和 TikTok 视频查询尚未通过。**没有重复付款、没有重新买主机，也没有提审或向 TikTok 用户开放收费。** 见 [027](/progress/updates/2026-10-19-027-domain-https-activation)。

**026 历史记录：香港 → Mac 合成恢复通过，当时域名未买、业务未启用。** 027 已完成域名、HTTPS、服务启用及真实初始生产库的备份恢复；定期加密备份、失败告警和真实付费业务恢复仍待验收。原始记录见 [026](/progress/updates/2026-10-19-026-deployment-recovery-handoff)。

**025 已发布的阶段结果：平台绑定确认、真实 OAuth 令牌修复、香港前后台构建及 1820 项 Linux 服务端测试。** 完整应用回归和仍未通过的平台视频查询见 [025](/progress/updates/2026-10-18-025-tiktok-binding-and-deployment)，本轮不重复计作新测试。

**024 阶段记录（历史）：真实云上传通过，香港主机已创建。** 当时完成 IAM、空间地域权限修复、真实上传与 SSH；后续平台绑定和令牌修复已进入 025。见 [024 阶段交接](/progress/updates/2026-10-18-024-live-upload-hongkong-server)。

**以下 023 及更早段落保留为历史。当前法律链接以 028、云部署背景以 027 为准，不再重复要求域名付款、BytePlus 登录、创建同一策略、角色、绑定或主机。**

**023 历史记录（北京时间 2026-10-18）**：当时已选定香港主机和品牌域名，但还未接上正确管理会话，STS 返回 `AccessDenied`，主机也尚未购买。**这些旧阻塞已在 024／025 处理，不是当前状态。** 原始记录见 [023 阶段交接](/progress/updates/2026-10-18-023-domain-region-iam-readiness)。

**空间创建记录（北京时间 2026-10-18）**：`auroradrama-jp` 已创建，确认私有访问、不自动发布。Apple 官方支持网页查看 Team ID，无需先安装 Developer App，见 [022 历史交接](/progress/updates/2026-10-18-022-video-space-web-team-id)。

**上一阶段云服务进展（北京时间 2026-10-17）**：BytePlus VOD **已实际开通**，进入正式控制台确认按天结算、按流量计费；ECS 标准服务角色**已授权成功**。没有购买云主机或预付视频套餐。当时专用空间、上传权限、TikTok 账号绑定和实际云部署仍待完成，见 [021 云开通与下一步](/progress/updates/2026-10-17-021-cloud-activation)；空间后续进展以 022 为准。

**公开文档网站已更新并在线验证（北京时间 2026-10-17）**：文档 PR 已合并，GitHub Pages 已成功部署，手机／桌面页面、导航和 Aurora 图标均已实际检查。**不再需要负责人点击旧 GitHub 表单。** 证据见 [020 文档发布记录](/progress/updates/2026-10-17-020-public-docs-release)。本次没有公开新增后台源码，不代替 TikTok 应用提审或云部署。

**023 历史本地复核（北京时间 2026-10-18）**：当时完整 `npm run test:all` 退出码 **0，失败 0、跳过 0**，194 个应用文件指纹一致，但真实配置缺失且 STS 被拒绝。后续云配置和权限问题已在 024／025 处理；原始结果见 [023](/progress/updates/2026-10-18-023-domain-region-iam-readiness)，不能继续当作当前缺项。解约说明等既往功能见 [019](/progress/updates/2026-10-17-019-subscription-management)。

**品牌与发布范围已确认**：对外统一使用 **Aurora Drama**，后台源码、数据库及凭据不随公开网站发布。品牌域名 `auroradrama.app` 已于 2026-10-19 在阿里云国际站注册完成，不再沿用“尚未购买”的旧状态。

**历史进展（018，2026-10-17）**：订阅八类通知、匹配付款确认、每期流水、历史退款隔离与前后台查询已接通。该次整套本地回归 **0 失败、0 跳过**，193 个应用文件指纹一致；本地前后台已升级，13 张原业务表内容不变。见 [018 当时交接与责任清单](/progress/updates/2026-10-17-018-subscription-ledger)及[订阅使用说明](/guide/subscription-workflow)。域名、真实 Team ID、Aurora 邮箱验证、真实部署与平台验收仍待完成；云账号后续进展见上方 021。

**以下为各阶段历史记录。当前云服务与验证进展以 024 为准，既往本地业务验证见 019／023；旧记录中的“未绑卡／VOD 未开通／ECS 待授权／空间未创建／IAM 未配置／主机未买”不再是当前状态，生产 HTTPS、平台绑定和真实端内验收仍未完成。**

**2026-10-16 订阅与会员恢复**：平台报价、持久操作、官方测试入口和已有会员恢复已接通；套餐移到手机首屏，创建不再多一步“准备”确认。整套本地回归通过，新品牌图标已保存到 Aurora 草稿，本机数据升级前后摘要一致。见 [017 最新进展](/progress/updates/2026-10-16-017-subscription-access)。原始公开文档已补到付款通知结构，继续实现核销与每期流水；云部署、正式收款、真机和提审仍未完成。

**2026-10-16 本轮最终验证**：新增云端草稿登记、短期封面授权与回执恢复，用户端／后台统一 Aurora 品牌；整套本地回归通过，本地服务已更新、原数据保留。控制台实查仍为 **2/6 已完成，基本信息和版本均未提审**，BytePlus 账务和 VOD 未开通、域名尚未注册。见 [016 当前进展与责任清单](/progress/updates/2026-10-16-016-registration-readiness)。**正式订阅还有开发与真机验收，不能说只差绑卡。** 以下为各阶段历史记录。

**2026-10-16 开发收尾**：已核验云视频可导入本地草稿单集；补任务分页、账号变化清理与独立备份恢复。实际本机数据已完成换目录恢复及管理员重登验证。见 [015 当前交接](/progress/updates/2026-10-16-015-import-and-migration)和[备份恢复手册](/guide/backup-restore)。云服务、真实支付与平台审核仍未完成。

**2026-10-16 云账号最新核查**：Aurora 的媒体资产管理**已激活，但未绑定 BytePlus 账号**；企业认证、账务、ECS 授权和 VOD 开通仍需完成。BytePlus ECS 公开地域表未列东京或首尔，未采购云资源。见 [014 实际缺项与配合清单](/progress/updates/2026-10-16-014-byteplus-readiness)；下方早期核查保留为历史，不据此重复激活或重复注册。

**目标应用已确定（2026-10-15）：Aurora Drama**，App ID `7670022867891177493`，Client Key `mnp696ef4kyeebk7`。**专用代码包已上传为版本 1，刷新后台确认可供预览；未送审、未发布。** 本次日本市场、日语界面，后续韩国和东南亚分批加入，不提前开放。见 [010 更新](/progress/updates/2026-10-15-010-aurora-upload)与[Aurora 首发说明](/guide/aurora-launch)。

**本轮开发交付**：已从离线前端推进到可运行的**真实本地前后台**：上传管理、用户账号、数据库片库、单集／整剧／测试VIP订单、解锁、收藏续看与退款。使用 [前后台本地手册](/guide/local-fullstack)，查看 [008 实施与验证记录](/progress/updates/2026-10-14-008-fullstack)。旧的 [005 离线验证](/progress/updates/2026-10-14-005-offline-qa)保留。

**本轮按用户要求上传 Aurora 专用代码，不自动提审、发布或真实扣款。** 生产媒资同步、真实订阅和端内联调不能用本地测试代替。见[日本短剧对标](/guide/jp-benchmark)和[团队后续清单](/guide/developer-delivery)。不混用 Aurora 与旧 DramaVerseJP 的配置或已填资料。

**2026-10-15 同流程更新**：测试付款额外确认已移除，预发布／正式共用平台业务代码；增加金额校验、主动平台状态核对、精确跨域配置以及三环境同构建验收。**本轮 525 项自动检查完成，0 失败、0 跳过**，见 [009 更新](/progress/updates/2026-10-15-009-environment-parity)和[环境使用说明](/guide/environment-parity)。其中 TLS 策略用例如实记录了 WebKit 跨站 Cookie 被阻止，不能把用例执行通过说成所有跨站登录可用。SDK／外部平台替身不代表端内真机或官方沙箱。

**Basic Information 必须按目标 App 区分**：004 记录的是旧 DramaVerseJP。Aurora 的名称、日文描述、条款／隐私链接和日本地区已有值，但真实 Apple Team ID、该应用的邮箱验证和必要确认仍未完成，基本信息未提审。见 [011 已保存资料](/progress/updates/2026-10-15-011-aurora-basic-info)及 [016 本轮复核](/progress/updates/2026-10-16-016-registration-readiness)，不能沿用旧应用的邮箱验证。

**会前主体核查**：已确认另一个主体的企业认证、短剧资质及营收已通过／开启；原 DramaVerseJP 主体的行业资质当前为“无法认证”，不能继续写作审核中。建议日本版优先使用已通过主体，并补齐通用上线审核，具体见 [007 核查记录](/progress/updates/2026-10-14-007-japan-organization)。本轮没有新建或迁移应用。
:::

## 必要功能清单（MVP）

| 模块 | 功能 | 优先级 |
| --- | --- | --- |
| 用户体系 | 静默登录（进入即建立身份） | P0 |
| 用户体系 | 显示授权（个人中心触发，拿头像昵称） | P1 |
| 内容展示 | 首页剧单、剧集详情页、竖屏播放页（免费集引流） | P0 |
| 付费解锁 | Beans 单集解锁：预支付订单 + 支付面板 + Webhook 验签发货 | P0 |
| 订阅 | 会员订阅 + 权益校验（已购 / 订阅有效即可播） | P0 |
| 内容上传 | CMS 后台：剧集上传、审核、定价、上下架 | P0 |
| 基础运营 | 观看进度、已购记录、订阅状态展示 | P1 |

后续扩展（进优化池）：排行榜、激励广告（IAA）、多语言、分享裂变、数据看板。

## 最初开发方案（T + N 历史参考）

开发启动日 **2026-10-14** 记为 T。下表是最初估算，不是已经完成的日期，也不是平台审核或上线承诺；实际状态以上方最新交接和下方工作流看板为准。

| 阶段 | 时间 | 内容 | 交付物 |
| --- | --- | --- | --- |
| 准备期 | 现在 ~ T | 等账号；商务并行提交企业认证与合规材料；准备内测包、测试账号、设计稿 | 账号 + clientKey + 素材 |
| 开发 Day 1 | T+0 | 环境搭建（minis-cli + SDK init）+ 前端工程 + 后端骨架 + 登录授权闭环 | 调试环境可用，登录跑通 |
| 开发 Day 2 | T+1 | 内容展示 + 播放（媒资）+ CMS 最小可用（上传/定价/上下架） | 免费集完整链路 |
| 开发 Day 3 | T+2 | 端内支付（含 Webhook 验签发货）+ 订阅 + 权益校验 + 自测 | 付费与订阅全链路 |
| 测试 | T+3 ~ T+4 | 全链路测试、真机验证（安卓内测包）、测试用例 | 测试通过报告 |
| 提审 | T+5 | `minis build` 打包 → 提交平台审核 | 审核中 |
| 上线 | T+8 ~ T+12 | 审核通过后正式上线（随平台审核浮动） | 正式可用 |

### 技术要点（关键注意）

- **登录**：`TTMinis.login()` 拿 code → 后端换 `open_id + access_token + refresh_token`，open_id 作业务主键
- **支付**：以后端 Webhook 为准（验签 + `trade_order_id` 唯一索引幂等 + 状态机），前端回调只做体验轮询
- **订阅**：关注开通 / 续费 / 退订生命周期回调；权益 = 已购章节 OR 订阅有效
- **调试**：本地调试仅安卓内测包（M 包 = US 等 / T 包 = JP 等），iOS 需上传平台扫码
- **媒资**：优先平台媒资库播放器，省转码与 CDN 成本
- **约束**：请求域名须在平台配白名单；支付依赖企业认证 + IAP 开通 + Webhook 地址配置

## 工作流看板

| 工作流 | 当前状态 | 负责人 | 计划时间 |
| --- | --- | --- | --- |
| 账号与商务合规 | 已通过主体可优先用于日本；原JP主体资质需补材料；通用上线审核未完成 | 主体管理员＋商务 | 会上确定主体与负责人 |
| Basic Information | 品牌域名的条款／隐私已保存，服务域名已更新；Team ID、邮箱及声明仍未齐，不能送审 | 应用管理员＋开发 | 见028，不用邮箱代替Team ID |
| 环境准备 | 域名、HTTPS和香港服务已启用；真实初始生产库备份恢复通过，定期加密备份与告警仍待完善 | 开发 | 见027与云部署手册 |
| 基础架构 | 已完成 | AI | T+0 |
| 登录授权 | 本地注册／登录／改密、会话与账户隔离已接通；TikTok真实身份待端内联调 | 开发 | 见008与交付清单 |
| 内容与播放 | 数据库片库、真实文件上传、私有播放、收藏续看已接通；官方播放器待真机 | 开发＋内容运营 | 待合法平台媒资 |
| CMS 上传后台 | 正式HTTPS管理页可登录并读取真实上传配置；完整媒体与平台流程仍待实际片源验收 | 开发 | 见027，生产片库为空 |
| 端内支付 | 共用结算、金额校验、Beans建单／验签和主动状态核对已有；真实扣款未验收 | 开发＋支付测试 | 待支付环境与联调 |
| 订阅 | 套餐、匹配通知、每期流水、退款／撤销记录和会员恢复已实现；生产购买默认关闭 | 开发＋支付测试 | 待正式档位、官方测试与真实收费验收，见018 |
| 测试验收 | 027真实HTTPS六项页面检查及初始生产库恢复通过；既往完整回归见025，平台播放与日本真机仍待验收 | 开发＋QA | 不把管理端或合成订单通过当作观众收款通过 |
| 发版审核 | 法律链接更新包已上传为Aurora版本3，刷新确认可供测试账号预览；未提审未发布 | 发布负责人 | 完成版本真机与基本信息审核 |
| 媒资接入（Media Assets & Player） | IAM、上传、绑定及视频域名证书调度已配置；GetPlayInfo空列表、TikTok查询未通过 | 开发＋媒资管理员 | 见027，继续核对实际媒资流程 |

## 开发记录

每次代码提交都会同步在这里更新一条记录（功能描述 + 界面截图），按日期倒序展示：

<div v-for="u in updates" :key="u.url" class="update-item">
  <div class="update-header">
    <a :href="withBase(u.url)" class="update-title">{{ u.date }} · {{ u.title }}</a>
    <Badge :type="typeBadge(u.type)" :text="u.type" />
    <Badge :type="statusBadge(u.status)" :text="u.status" />
  </div>
  <div v-if="u.features.length" class="update-features">
    <span v-for="f in u.features" :key="f" class="feature-chip">{{ f }}</span>
  </div>
  <div class="update-excerpt" v-html="u.excerpt"></div>
  <div class="update-link"><a :href="withBase(u.url)">查看详情与界面截图 →</a></div>
</div>

<div v-if="!updates.length" class="update-empty">暂无记录，T 日开始开发后每次提交都会更新。</div>

<style scoped>
.update-item { border-left: 3px solid var(--vp-c-brand-1); padding: 0 0 0 16px; margin: 24px 0; }
.update-header { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.update-title { font-size: 17px; font-weight: 600; }
.update-features { margin: 6px 0; display: flex; flex-wrap: wrap; gap: 6px; }
.feature-chip {
  font-size: 12px; color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft); border-radius: 999px; padding: 2px 10px;
}
.update-excerpt { font-size: 14px; line-height: 1.6; }
.update-excerpt :deep(p) { margin: 0; }
.update-link { margin-top: 4px; font-size: 13px; }
.update-empty { color: var(--vp-c-text-2); }
</style>

## 评论与反馈

对当前进度有任何问题，直接在下方留言（需要 GitHub 账号），或到「优化池提交」页发 Issue 提问题 / 建议（可附截图）。

<Giscus />
