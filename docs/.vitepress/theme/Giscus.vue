<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps({
  repo: { type: String, default: 'seanliii/tiktok-minis-drama' },
  repoId: { type: String, default: 'R_kgDOVIm1xA' },
  category: { type: String, default: 'General' },
  categoryId: { type: String, default: 'DIC_kwDOVIm1xM4DIXkt' },
  mapping: { type: String, default: 'pathname' },
  reactionsEnabled: { type: String, default: '1' },
  inputPosition: { type: String, default: 'top' },
  lang: { type: String, default: 'zh-CN' },
  theme: { type: String, default: 'preferred_color_scheme' },
  loading: { type: String, default: 'lazy' },
})

const container = ref<HTMLElement | null>(null)

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('data-repo', props.repo)
  script.setAttribute('data-repo-id', props.repoId)
  script.setAttribute('data-category', props.category)
  script.setAttribute('data-category-id', props.categoryId)
  script.setAttribute('data-mapping', props.mapping)
  script.setAttribute('data-reactions-enabled', props.reactionsEnabled)
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', props.inputPosition)
  script.setAttribute('data-theme', props.theme)
  script.setAttribute('data-lang', props.lang)
  script.setAttribute('data-loading', props.loading)
  container.value?.appendChild(script)
})
</script>

<template>
  <div ref="container" class="giscus-wrap" />
</template>

<style scoped>
.giscus-wrap {
  margin-top: 32px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
}
</style>
