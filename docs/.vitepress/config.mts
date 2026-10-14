import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// GitHub Pages 部署在项目子路径（username.github.io/repo/）时由 Actions 注入
const base = process.env.DOCS_BASE || '/'

export default withMermaid(
  defineConfig({
    lang: 'zh-CN',
    title: '漫剧 Minis',
    description: 'TikTok Minis 漫剧付费 + 订阅小程序 · 开发文档与进度看板',
    base,
    lastUpdated: true,
    mermaid: {
      themeVariables: { fontSize: '14px' },
    },
    themeConfig: {
      nav: [
        { text: '首页', link: '/' },
        { text: '开发文档', link: '/guide/tech-form' },
        { text: '进度看板', link: '/progress/' },
        { text: '团队协作', link: '/team/how-to-update' },
      ],
      sidebar: {
        '/guide/': [
          {
            text: '开发文档',
            items: [
              { text: 'TikTok Minis 技术形态', link: '/guide/tech-form' },
              { text: '漫剧开发架构', link: '/guide/architecture' },
              { text: '接入全流程', link: '/guide/onboarding' },
              { text: '核心 API 接入', link: '/guide/api' },
              { text: '开发时间计划', link: '/guide/timeline' },
            ],
          },
        ],
        '/progress/': [
          {
            text: '进度看板',
            items: [
              { text: '看板总览', link: '/progress/' },
              { text: '如何提交进度', link: '/team/how-to-update' },
            ],
          },
        ],
        '/team/': [
          {
            text: '团队协作',
            items: [
              { text: '如何提交进度', link: '/team/how-to-update' },
              { text: '进度看板', link: '/progress/' },
            ],
          },
        ],
      },
      outline: { label: '本页目录', level: [2, 3] },
      search: { provider: 'local' },
      docFooter: { prev: '上一篇', next: '下一篇' },
      lastUpdated: { text: '最后更新' },
      footer: {
        message: 'TikTok Minis 漫剧项目组 · 文档由团队成员共同维护',
      },
    },
  })
)
