# TikTok Minis 漫剧项目

TikTok Minis「漫剧」付费 + 订阅小程序：**开发文档 + 接入指南 + 团队进度看板**，一站式团队协作站点。

- 站点地址：GitHub Pages 自动部署（合并到 `main` 分支即自动发布）
- 本地预览：`npm install && npm run docs:dev`

## 目录结构

```
.
├── docs/                        # 文档站点（VitePress）
│   ├── .vitepress/config.mts    # 站点配置（导航 / 侧边栏）
│   ├── index.md                 # 站点首页
│   ├── guide/                   # 开发文档
│   │   ├── tech-form.md         # TikTok Minis 技术形态
│   │   ├── architecture.md      # 漫剧开发架构
│   │   ├── onboarding.md        # 接入全流程
│   │   ├── api.md               # 核心 API 接入（登录/授权/支付/订阅）
│   │   └── timeline.md          # 开发时间计划
│   ├── progress/                # 进度看板
│   │   ├── index.md             # 看板（工作流状态 + 更新自动汇总）
│   │   └── updates/             # 团队进度记录（按模板新增文件）
│   └── team/
│       └── how-to-update.md     # 团队协作指南
├── CONTRIBUTING.md              # GitHub 协作规范（简要版）
└── .github/
    ├── workflows/deploy-pages.yml          # GitHub Pages 自动部署
    └── PULL_REQUEST_TEMPLATE/progress_update.md  # 进度更新 PR 模板
```

## 如何提交进度 / 功能

团队任何成员都可以通过 PR 提交进度与功能建议，合并后站点自动更新，详见 [团队协作指南](docs/team/how-to-update.md)。三步走：

1. 在 `docs/progress/updates/` 下按模板新增一条进度记录
2. 更新 `docs/progress/index.md` 中的工作流看板
3. 提交 PR（使用进度更新模板）

## 官方参考文档（Lark）

- [TikTok Minis 技术形态说明](https://bytedance.larkoffice.com/wiki/JvMAwLZJzigrwAkuOzPcUsGenRb)
- [TikTok Minis 开发调试指南](https://bytedance.larkoffice.com/wiki/NjgSwYNSHiiMdxkJHHwcTY1lnCg)
- [TikTok Minis 静默登录（login）能力接入说明](https://bytedance.larkoffice.com/wiki/Fw22w0BuoiDD2vklMPjcos66nEd)
- [TikTok Minis 显示授权（authorize）接入指南](https://bytedance.larkoffice.com/wiki/NBtUwZuWwiFJ2Iklb8zcGAyLnyh)
- [TikTok Minis 端内支付能力接入指南](https://bytedance.larkoffice.com/wiki/LLpyw0GQLiYPGRkcUcLcLQm3nWc)
- [TT Minis 接入全流程（One Page）](https://bytedance.larkoffice.com/wiki/MJ2BwFqSxi4r2SkwHS8cRrlsnVb)
