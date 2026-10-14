---
title: 进度看板
---

# 进度看板

<script setup>
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
新应用 **DramaVerseJP**（App ID `7696338880869500980`，Client Key `mnxhskb12ahzifub`）已创建并定位**日本市场**（日语界面）。前端核心页面已完成，代码包已上传平台等待扫描。旧 Aurora Drama 弃用。使用 / 上传 / 数据说明见 [日本市场指南](/guide/jp-usage)。

**Basic Information 进展**：App 图标 ✅、邮箱验证 ✅（vortex528@gmail.com）、版权声明 ✅、信任域名 3 个 ✅、Terms/Privacy 页面 ✅ 已部署。表单保存存在卡点（Save/Submit 不发请求），交接清单见 [004 更新](/progress/updates/2026-10-14-004-basic-info)。
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

## 开发方案（T + N 相对排期）

账号就绪当天为 T，AI 24h 推进：

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
| 账号与商务合规 | 账号已就绪，行业资质审核中 | 商务 | 持续并行 |
| Basic Information | 图标/邮箱/版权/域名完成，表单保存卡点待人工排查 | 人工 | 2026-10-14 |
| 环境准备 | 已完成 | AI | T+0 |
| 基础架构 | 已完成 | AI | T+0 |
| 登录授权 | 前端完成，后端待接 | AI | T+0 |
| 内容与播放 | 前端完成，媒资待接 | AI | T+1 |
| CMS 上传后台 | 未开始 | AI | T+1 |
| 端内支付 | 前端浮层完成，后端待接 | AI | T+2 |
| 订阅 | 前端浮层完成，后端待接 | AI | T+2 |
| 测试验收 | 未开始 | 测试 | T+3 ~ T+4 |
| 发版审核 | 未开始 | 平台 | T+5 起 |
| 媒资接入（Media Assets & Player） | 未开始（上线前置硬性要求） | AI | 资质过审后 |

## 开发记录

每次代码提交都会同步在这里更新一条记录（功能描述 + 界面截图），按日期倒序展示：

<div v-for="u in updates" :key="u.url" class="update-item">
  <div class="update-header">
    <a :href="u.url" class="update-title">{{ u.date }} · {{ u.title }}</a>
    <Badge :type="typeBadge(u.type)" :text="u.type" />
    <Badge :type="statusBadge(u.status)" :text="u.status" />
  </div>
  <div v-if="u.features.length" class="update-features">
    <span v-for="f in u.features" :key="f" class="feature-chip">{{ f }}</span>
  </div>
  <div class="update-excerpt" v-html="u.excerpt"></div>
  <div class="update-link"><a :href="u.url">查看详情与界面截图 →</a></div>
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
