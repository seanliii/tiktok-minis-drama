# TikTok Minis 漫剧项目

TikTok Minis「漫剧」付费 + 订阅小程序。团队协作站点，只有两个板块：

| 板块 | 地址 | 说明 |
| --- | --- | --- |
| 进度看板 | https://seanliii.github.io/tiktok-minis-drama/ | 必要功能清单、T+N 开发方案、工作流看板、**全部开发记录**（每次代码提交同步更新，含功能描述与界面截图） |
| 开发文档 | https://seanliii.github.io/tiktok-minis-drama/guide/ | 6 篇 TikTok Minis 官方文档汇总（技术形态 / 调试 / 登录 / 授权 / 支付 / 接入全流程） |
| 优化池提交 | https://seanliii.github.io/tiktok-minis-drama/pool/ | 一键提交问题 / 建议（**支持粘贴截图**），列表实时展示处理状态；每页底部可直接评论留言 |

## 开发节奏

- **启动时间待定**：等待 TikTok for Developers 账号、Minis App（clientKey）、企业认证材料就绪
- 账号到位当天记为 **T**，从 T 开始：AI 24h 开发 3 天（T+0 ~ T+2）+ 测试 2 天（T+3 ~ T+4）→ T+5 提审 → T+8 ~ T+12 上线（随平台审核浮动）

## 目录结构

```
.
├── docs/                              # 文档站点（VitePress）
│   ├── .vitepress/
│   │   ├── config.mts                 # 站点配置（两板块导航）
│   │   └── theme/                     # giscus 评论区组件
│   ├── index.md                       # 进度看板（首页）
│   ├── pool/index.md                  # 优化池提交
│   └── progress/
│       ├── updates.data.js            # 开发记录自动聚合（按日期倒序）
│       ├── updates/                   # 每次提交对应一条记录
│       └── screenshots/               # 界面截图
├── .github/
│   ├── ISSUE_TEMPLATE/                # 问题（可附图）/ 功能建议模板
│   ├── workflows/deploy-pages.yml     # GitHub Pages 自动部署（待推送）
│   └── PULL_REQUEST_TEMPLATE/         # PR 模板
├── CONTRIBUTING.md                    # 协作规范
└── README.md
```

## 如何反馈问题 / 提建议

1. 到「优化池提交」页点按钮发 Issue（截图直接粘贴）
2. 或在任意页面底部评论区留言（需 GitHub 账号，登录后首次会请求授权 giscus 评论应用）

## 官方参考文档（Lark）

- [TikTok Minis 技术形态说明](https://bytedance.larkoffice.com/wiki/JvMAwLZJzigrwAkuOzPcUsGenRb)
- [TikTok Minis 开发调试指南](https://bytedance.larkoffice.com/wiki/NjgSwYNSHiiMdxkJHHwcTY1lnCg)
- [TikTok Minis 静默登录（login）能力接入说明](https://bytedance.larkoffice.com/wiki/Fw22w0BuoiDD2vklMPjcos66nEd)
- [TikTok Minis 显示授权（authorize）接入指南](https://bytedance.larkoffice.com/wiki/NBtUwZuWwiFJ2Iklb8zcGAyLnyh)
- [TikTok Minis 端内支付能力接入指南](https://bytedance.larkoffice.com/wiki/LLpyw0GQLiYPGRkcUcLcLQm3nWc)
- [TT Minis 接入全流程（One Page）](https://bytedance.larkoffice.com/wiki/MJ2BwFqSxi4r2SkwHS8cRrlsnVb)
