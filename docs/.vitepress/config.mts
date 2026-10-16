import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'

// GitHub Pages 部署在项目子路径（username.github.io/repo/）时由 Actions 注入
const base = process.env.DOCS_BASE || '/'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Aurora Drama',
  description: 'Aurora Drama · TikTok Minis 日本短剧应用 · 开发进度、使用说明与上线准备',
  base,
  lastUpdated: true,
  // Keep the existing brand assets used by platform uploads at their source path.
  vite: { publicDir: fileURLToPath(new URL('./public', import.meta.url)) },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: `${base}aurora-icon.png` }],
  ],
  themeConfig: {
    logo: { src: '/aurora-icon.png', alt: 'Aurora Drama' },
    nav: [
      { text: '进度看板', link: '/' },
      { text: '开发文档', link: '/guide/' },
      { text: '日本市场指南', link: '/guide/jp-usage' },
      { text: '市场调研', link: '/guide/market-research' },
      { text: '优化池提交', link: '/pool/' },
    ],
    outline: { label: '本页目录', level: [2, 3] },
    search: { provider: 'local' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新' },
    footer: {
      message: 'Aurora Drama 项目组 · 日本首发 · 页面底部可评论留言',
    },
  },
})
