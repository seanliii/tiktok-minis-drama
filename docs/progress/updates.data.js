import { createContentLoader } from 'vitepress'

export default createContentLoader('progress/updates/*.md', {
  excerpt: true,
  transform(raw) {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        url,
        title: frontmatter.title || '未命名更新',
        date: frontmatter.date || '',
        type: frontmatter.type || '功能',
        status: frontmatter.status || '已完成',
        features: Array.isArray(frontmatter.features) ? frontmatter.features : [],
        excerpt,
      }))
      .sort((a, b) => String(b.date).localeCompare(String(a.date)))
  },
})
