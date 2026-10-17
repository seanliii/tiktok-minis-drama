import { createContentLoader } from 'vitepress'

export default createContentLoader('progress/updates/*.md', {
  excerpt: '<!-- more -->',
  transform(raw) {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        url,
        title: frontmatter.title || '未命名更新',
        date: frontmatter.date instanceof Date
          ? frontmatter.date.toISOString().slice(0, 10)
          : String(frontmatter.date || '').slice(0, 10),
        type: frontmatter.type || '功能',
        status: frontmatter.status || '已完成',
        features: Array.isArray(frontmatter.features) ? frontmatter.features : [],
        excerpt,
      }))
      .sort((a, b) => b.date.localeCompare(a.date) || b.url.localeCompare(a.url))
  },
})
