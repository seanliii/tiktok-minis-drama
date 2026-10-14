---
title: 进度看板
---

# 进度看板

<script setup>
import { data as updates } from './updates.data.js'

const badgeType = (status) => {
  const map = {
    '已完成': 'tip',
    '进行中': 'info',
    '阻塞': 'danger',
    '未开始': 'default',
  }
  return map[status] || 'default'
}
</script>

::: tip 如何更新
团队成员按 [团队协作指南](/team/how-to-update) 提交进度：新增 `docs/progress/updates/` 下的记录文件 + 更新下方看板状态，合并 PR 后本站自动更新。「更新记录」由构建自动汇总，按日期倒序展示。
:::

## 工作流看板

| 工作流 | 当前状态 | 负责人 | 开始日期 | 目标日期 | 最后更新 |
| --- | --- | --- | --- | --- | --- |
| 商务合规（认证 / 审查 / 合同） | 进行中 | 待指定 | 2026-10-15 | 2026-10-27（随审核浮动） | 2026-10-14 |
| P0 环境准备 | 未开始 | AI | 2026-10-15 | 2026-10-15 | — |
| P1 基础架构 | 未开始 | AI | 2026-10-15 | 2026-10-15 | — |
| P2 登录授权 | 未开始 | AI | 2026-10-15 | 2026-10-15 | — |
| P3 内容与播放 | 未开始 | AI | 2026-10-16 | 2026-10-16 | — |
| P4 端内支付 | 未开始 | AI | 2026-10-16 | 2026-10-16 | — |
| P5 订阅 | 未开始 | AI | 2026-10-17 | 2026-10-17 | — |
| P6 测试验收 | 未开始 | 测试 | 2026-10-18 | 2026-10-19 | — |
| P7 发版审核 | 未开始 | 平台 | 2026-10-20 | 2026-10-26 | — |

## 里程碑

| 里程碑 | 目标日期 | 达成标准 | 状态 |
| --- | --- | --- | --- |
| M1 立项与文档 | 2026-10-14 | 文档站点上线，排期明确 | 已完成 |
| M2 合规材料提交 | 2026-10-20 | 企业认证 + 合规材料 + 行业准入提交 | 未开始 |
| M3 环境跑通 | 2026-10-15 | SDK init + 内测包扫码调试成功 | 未开始 |
| M4 登录闭环 | 2026-10-15 | 静默登录 + 显示授权联调通过 | 未开始 |
| M5 可看剧 | 2026-10-16 | 内容展示 + 播放 + 免费集完整链路 | 未开始 |
| M6 可付费 | 2026-10-16 | 支付全链路（含 Webhook 验签发货） | 未开始 |
| M7 可订阅 | 2026-10-17 | 订阅开通 + 权益校验 | 未开始 |
| M8 测试验收 | 2026-10-19 | 全链路测试通过 | 未开始 |
| M9 提审 | 2026-10-20 | minis build + 提交审核 | 未开始 |
| M10 上线 | 2026-10-27 | 审核通过，正式上线（随合规完成日浮动） | 未开始 |

## 更新记录（自动汇总）

<div v-for="u in updates" :key="u.url" class="update-item">
  <div class="update-header">
    <a :href="u.url" class="update-title">{{ u.date }} · {{ u.title }}</a>
    <Badge :type="badgeType(u.status)" :text="u.status" />
  </div>
  <div class="update-meta">负责人：{{ u.author }} ｜ 所属工作流：{{ u.workstream }}</div>
  <div class="update-excerpt" v-html="u.excerpt"></div>
  <div class="update-link"><a :href="u.url">查看详情 →</a></div>
</div>

<div v-if="!updates.length" class="update-empty">暂无更新记录，按团队协作指南提交第一条进度。</div>

<style scoped>
.update-item { border-left: 3px solid var(--vp-c-brand-1); padding: 0 0 0 16px; margin: 24px 0; }
.update-header { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.update-title { font-size: 17px; font-weight: 600; }
.update-meta { color: var(--vp-c-text-2); font-size: 13px; margin: 4px 0 8px; }
.update-excerpt { font-size: 14px; line-height: 1.6; }
.update-excerpt :deep(p) { margin: 0; }
.update-link { margin-top: 4px; font-size: 13px; }
.update-empty { color: var(--vp-c-text-2); }
</style>
