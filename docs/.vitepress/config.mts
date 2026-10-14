import { defineConfig } from 'vitepress'

// GitHub Pages 部署在项目子路径（username.github.io/repo/）时由 Actions 注入
const base = process.env.DOCS_BASE || '/'

export default defineConfig({
  lang: 'zh-CN',
  title: '漫剧 Minis',
  description: 'TikTok Minis 漫剧付费 + 订阅小程序 · 进度看板与优化池',
  base,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: '进度看板', link: '/' },
      { text: '开发文档', link: '/guide/' },
      { text: '市场调研', link: '/guide/market-research' },
      { text: '优化池提交', link: '/pool/' },
    ],
    outline: { label: '本页目录', level: [2, 3] },
    search: { provider: 'local' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新' },
    footer: {
      message: 'TikTok Minis 漫剧项目组 · 页面底部可评论留言',
    },
  },
})
