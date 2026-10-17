# Aurora Drama · 开发与上线文档

Aurora Drama 是面向日本首发的 TikTok Minis 短剧项目，后续韩国和东南亚按内容、语言与平台要求分批开放。

**最新开发交接：[019 解约说明、完整验证与上线缺项](docs/progress/updates/2026-10-17-019-subscription-management.md)；公开网站发布记录见 [020](docs/progress/updates/2026-10-17-020-public-docs-release.md)。** 负责人已授权开发直接完成文档提交、合并和发布，不再需要点击此前的 GitHub 表单。早期 DramaVerseJP 记录保留为历史，不是当前应用配置。

**公开文档已实际更新：** PR #1 已合并，GitHub Pages 工作流成功，1280px／390px 共 12 项公网页面检查、导航与品牌图标均通过。完整前后台业务的云部署、真实付款和 TikTok 应用审核仍是另外的工作，不因文档发布而完成。

**这个公开仓库本次只同步文档、条款／隐私和品牌资源。新增的业务后台源码、实际环境配置、用户数据、订单数据库、密钥和备份没有公开。** 原有 `app/` 目录仍是此前公开的版本，不代表最新版完整前后台。团队开发者须先通过授权渠道取得新版代码，再按使用手册操作。

| 板块 | 地址 | 说明 |
| --- | --- | --- |
| 进度看板 | https://seanliii.github.io/tiktok-minis-drama/ | 必要功能清单、T+N 开发方案、工作流看板、**全部开发记录**（每次代码提交同步更新，含功能描述与界面截图） |
| 开发文档 | https://seanliii.github.io/tiktok-minis-drama/guide/ | 使用手册、内容上传、会员订阅、部署、备份与平台接入说明 |
| 优化池提交 | https://seanliii.github.io/tiktok-minis-drama/pool/ | 一键提交问题 / 建议（**支持粘贴截图**），列表实时展示处理状态；每页底部可直接评论留言 |

## 当前状态

- 目标应用：**Aurora Drama**，App ID `7670022867891177493`。
- 最新本地前后台、云上传／登记接入、订阅通知与每期流水、解约说明已完成本地整套验证，详见 019；外部平台和 SDK 使用明确的测试替身。
- **真实云部署、官方 Sandbox、TikTok 真机、真实收费和应用审核仍未完成。** 文档网站上线不是短剧应用上线。
- 域名尽量采用 `auroradrama` 相关名称，具体仍须核对注册状态、团队权属和价格；未购买或绑定新域名。

## 本地预览文档

```bash
npm ci
npm run docs:dev
```

按 GitHub Pages 子目录校验正式静态构建：

```bash
DOCS_BASE=/tiktok-minis-drama/ npm run docs:build
```

文档站可独立构建，不需要实际支付凭据、用户数据库或 BytePlus 密钥。

## 目录结构

```
.
├── docs/                              # 文档站点（VitePress）
│   ├── .vitepress/
│   │   ├── config.mts                 # Aurora品牌、导航与公开资源配置
│   │   └── theme/                     # giscus 评论区组件
│   ├── index.md                       # 进度看板（首页）
│   ├── pool/index.md                  # 优化池提交
│   └── progress/
│       ├── updates.data.js            # 开发记录自动聚合（按日期倒序）
│       ├── updates/                   # 每次提交对应一条记录
│       └── screenshots/               # 界面截图
├── .github/
│   ├── ISSUE_TEMPLATE/                # 问题（可附图）/ 功能建议模板
│   ├── workflows/deploy-pages.yml     # 仅构建和发布文档到GitHub Pages
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
