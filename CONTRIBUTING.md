# 团队协作规范

本文档站点的完整协作说明见 [docs/team/how-to-update.md](docs/team/how-to-update.md)，此处为 GitHub 侧简要规范。

## 基本约定

1. 所有变更通过 **PR 合并到 `main` 分支**，合并后 GitHub Actions 自动部署到 GitHub Pages。
2. 提交进度走三步：新增 `docs/progress/updates/YYYY-MM-DD-标题.md` → 更新 `docs/progress/index.md` 看板 → 提交 PR。
3. PR 请使用「进度更新」模板，方便 review。

## 分支与提交

- 分支命名：`docs/xxx`（文档）、`feat/xxx`（功能建议）、`fix/xxx`（勘误）
- 提交信息：`docs: 更新 P4 支付进度` / `feat: 建议增加收藏功能`
- 一个 PR 只做一件事，便于追溯

## 进度记录 frontmatter 必填字段

| 字段 | 说明 |
| --- | --- |
| `title` | 更新标题 |
| `date` | 日期，格式 `YYYY-MM-DD`（用于排序） |
| `author` | 负责人姓名 |
| `workstream` | 所属工作流：商务合规 / P0~P7 / 全局 |
| `status` | 未开始 / 进行中 / 已完成 / 阻塞 |

## 功能需求建议

- 提交 issue，标签 `enhancement`，描述场景与预期
- 由项目负责人评估后排期，纳入 `docs/guide/timeline.md` 与看板
