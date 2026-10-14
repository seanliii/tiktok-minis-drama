<template>
  <div class="search-page safe-top">
    <div class="search-head">
      <van-search
        v-model="keyword"
        placeholder="搜索漫剧 / 题材"
        shape="round"
        background="transparent"
        @search="doSearch"
      />
    </div>
    <div class="hot-tags">
      <span class="hot-label">热门搜索：</span>
      <span
        v-for="t in hotTags"
        :key="t"
        class="hot-tag"
        @click="keyword = t; doSearch()"
      >{{ t }}</span>
    </div>
    <div class="drama-grid">
      <DramaCard v-for="d in results" :key="d.id" :drama="d" mode="grid" @click="$router.push(`/drama/${d.id}`)" />
    </div>
    <van-empty v-if="keyword && !results.length" description="没有找到相关漫剧" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { dramas } from '@/utils/mock'
import DramaCard from '@/components/DramaCard.vue'

const keyword = ref('')
const hotTags = ['逆袭', '重生', '系统', '霸总', '玄幻']

const results = computed(() => {
  if (!keyword.value.trim()) return dramas
  const kw = keyword.value.trim().toLowerCase()
  return dramas.filter(
    (d) =>
      d.title.toLowerCase().includes(kw) ||
      d.category.includes(kw) ||
      d.tags.some((t) => t.toLowerCase().includes(kw)),
  )
})

const doSearch = () => {
  // 触发计算属性刷新
}
</script>

<style scoped>
.search-page {
  background: var(--aurora-bg);
  min-height: 100%;
}
.search-head {
  padding: 8px 16px 0;
}
.search-head :deep(.van-search__content) {
  background: var(--aurora-card);
}
.search-head :deep(.van-field__control) {
  color: var(--aurora-text);
}
.hot-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px 16px 16px;
}
.hot-label {
  font-size: 12px;
  color: var(--aurora-text2);
}
.hot-tag {
  font-size: 12px;
  color: #c9c9d6;
  background: var(--aurora-card);
  border-radius: 999px;
  padding: 4px 12px;
}
.drama-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 0 16px 20px;
}
</style>
