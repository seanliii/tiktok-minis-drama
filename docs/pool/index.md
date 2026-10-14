---
title: 优化池提交
---

# 优化池提交

<script setup>
import { onMounted, ref, computed } from 'vue'

const REPO = 'seanliii/tiktok-minis-drama'
const issues = ref([])
const loading = ref(true)
const error = ref('')
const filter = ref('all')

onMounted(async () => {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/issues?state=all&per_page=50`)
    if (!res.ok) throw new Error(String(res.status))
    const data = await res.json()
    issues.value = data.filter((i) => !i.pull_request)
  } catch (e) {
    error.value = '列表加载失败（GitHub API 未登录有频率限制），可直接点击上方按钮到 GitHub 查看全部。'
  } finally {
    loading.value = false
  }
})

const filtered = computed(() => {
  if (filter.value === 'open') return issues.value.filter((i) => i.state === 'open')
  if (filter.value === 'closed') return issues.value.filter((i) => i.state === 'closed')
  return issues.value
})

const fmtDate = (s) => (s || '').slice(0, 10)

const stateText = (i) => (i.state === 'open' ? '待处理' : '已处理')
</script>

## 提交入口

有 Bug、问题或功能建议，点下面按钮直接提交（**截图可直接粘贴或拖入输入框**）：

<div class="pool-actions">
  <a class="vp-btn brand" href="https://github.com/seanliii/tiktok-minis-drama/issues/new?template=bug.yml">提交问题 / Bug（可附截图）</a>
  <a class="vp-btn alt" href="https://github.com/seanliii/tiktok-minis-drama/issues/new?template=feature.yml">提功能建议</a>
</div>

## 优化池列表

::: tip 说明
下方列表实时读取 GitHub Issues。问题被处理关闭后标记「已处理」；功能建议由负责人评估排期，进入进度看板。
:::

<div class="pool-filter">
  <button :class="{ active: filter === 'all' }" @click="filter = 'all'">全部</button>
  <button :class="{ active: filter === 'open' }" @click="filter = 'open'">待处理</button>
  <button :class="{ active: filter === 'closed' }" @click="filter = 'closed'">已处理</button>
</div>

<div v-if="loading" class="pool-empty">加载中…</div>
<div v-else-if="error" class="pool-empty">{{ error }}</div>
<div v-else-if="!filtered.length" class="pool-empty">暂无内容，点击上方按钮提交第一条。</div>
<div v-else>
  <div v-for="i in filtered" :key="i.id" class="pool-item">
    <div class="pool-item-top">
      <a :href="i.html_url" target="_blank" class="pool-title">{{ i.title }}</a>
      <span class="pool-state" :class="i.state">{{ stateText(i) }}</span>
    </div>
    <div class="pool-item-meta">
      <span v-for="l in i.labels" :key="l.id" class="pool-label">#{{ l.name }}</span>
      <span class="pool-meta">{{ fmtDate(i.created_at) }} · 评论 {{ i.comments }}</span>
    </div>
  </div>
</div>

## 评论与反馈

也可以直接在下方留言讨论（需要 GitHub 账号）：

<Giscus />

<style scoped>
.pool-actions { display: flex; gap: 12px; flex-wrap: wrap; margin: 16px 0 24px; }
.vp-btn {
  display: inline-block; border: 1px solid transparent; text-align: center;
  font-weight: 600; white-space: nowrap; transition: color .25s, border-color .25s, background-color .25s;
  border-radius: 20px; padding: 0 20px; line-height: 38px; font-size: 14px; text-decoration: none;
}
.vp-btn.brand { border-color: var(--vp-button-brand-border); color: var(--vp-button-brand-text); background-color: var(--vp-button-brand-bg); }
.vp-btn.brand:hover { background-color: var(--vp-button-brand-hover-bg); }
.vp-btn.alt { border-color: var(--vp-button-alt-border); color: var(--vp-button-alt-text); background-color: var(--vp-button-alt-bg); }
.vp-btn.alt:hover { border-color: var(--vp-button-alt-hover-border); color: var(--vp-button-alt-hover-text); background-color: var(--vp-button-alt-hover-bg); }
.pool-filter { display: flex; gap: 8px; margin: 8px 0 16px; }
.pool-filter button {
  border: 1px solid var(--vp-c-divider); background: transparent; color: var(--vp-c-text-2);
  border-radius: 6px; padding: 4px 14px; font-size: 13px; cursor: pointer;
}
.pool-filter button.active { color: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); }
.pool-item { border-bottom: 1px solid var(--vp-c-divider); padding: 12px 4px; }
.pool-item-top { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.pool-title { font-size: 15px; font-weight: 600; }
.pool-state { font-size: 12px; border-radius: 999px; padding: 2px 10px; }
.pool-state.open { color: #16a34a; background: rgba(22, 163, 74, .12); }
.pool-state.closed { color: var(--vp-c-text-2); background: var(--vp-c-bg-mute); }
.pool-item-meta { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-top: 6px; }
.pool-label { font-size: 12px; color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); border-radius: 999px; padding: 2px 10px; }
.pool-meta { font-size: 12px; color: var(--vp-c-text-3); }
.pool-empty { color: var(--vp-c-text-2); padding: 16px 0; }
</style>
