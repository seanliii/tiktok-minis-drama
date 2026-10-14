import { createContentLoader } from 'vitepress'

export default createContentLoader('progress/updates/*.md', {
  excerpt: true,
  transform(raw) {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        url,
        title: frontmatter.title || '未命名更新',
        date: frontmatter.date || '',
        author: frontmatter.author || '未署名',
        workstream: frontmatter.workstream || '未分类',
        status: frontmatter.status || '进行中',
        excerpt,
      }))
      .sort((a, b) => String(b.date).localeCompare(String(a.date)))
  },
})
