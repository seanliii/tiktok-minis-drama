# Aurora 后台云端视频直传实施计划

> 执行方式：沿用已确认的“开发继续完成”范围和现有直传研究；独立文件并行实现，主任务负责接线、整体验证与提交。先写失败测试，再实现，分项不重复跑整套测试。

**目标：** 管理员在现有后台选 MP4，文件通过官方 SDK 直接进入指定 BytePlus 空间；业务服务器保存任务并核验 BytePlus 与 TikTok 可见性，不把上传进度或前端 VID 当成发布成功。

**架构：** 现有 Vue 管理端增加独立云上传面板；Express/SQLite 保存任务、签发限定空间的临时上传凭据、查询实际媒体。管理员继续使用同源 HttpOnly Cookie，普通 Minis 用户不能访问；新模块不改现有本地上传、订单、会话或发布规则。

**技术：** Vue、Express、SQLite；锁定官方 `@byteplus/uploader@1.1.3`、`@byteplus/sts@1.0.3`、`@byteplus/sdk-core@1.0.2`。不手写签名算法，不使用存在多余构建依赖的旧 VOD SDK；VOD 查询通过官方 SDK 通用请求／签名能力接入。

**依据：** `/Users/xuan/Desktop/cursor/tiktok/artifacts/direct-upload-research-20261016/CONTRACT.md` 与其中保存的官方文档和分发源码。

## 范围与边界

- 只新增云上传任务，不将原本地上传改成测试假云上传；缺少配置时明确不可用。
- 服务器固定账号、空间、region、VOD appId 与上传角色，不接受浏览器选择任意账号／endpoint／role。
- 上传角色只允许指定空间的 ApplyUploadInfo、CommitUploadInfo；长期 AK/SK 不下发。
- 浏览器关闭 SDK localStorage、调试与日志；凭据仅内存。同页暂停和继续可用，不承诺关闭页面后分片续传。
- 后端检查实际 VID、空间、任务标记、文件字节数、视频格式、未发布状态；再用已有 TikTok queryVideo 核对。任一项不确定保留待核验，不自动公开、不发权。
- 任务绑定管理员、剧目和集数；幂等创建，候选 VID 只接受一次；重试核验不重复上传。退出、取消、配置或目标变更时丢弃迟到结果。
- 可以保存／重新打开已核实任务，不能称为云端 album 已创建。日语数字枚举与新 album 完整协议仍缺，禁止猜值。
- 无真实凭据时测试全部使用隔离数据库和外部服务替身，不上传商业影片、不提审、不扣费。

## 文件与并行职责

### 任务 1：共享契约与持久任务（主任务）

- 新增：`shared/cloud-upload.ts`、`server/cloud-upload.ts`、`server/cloud-upload-config.ts`、`tests/server/cloud-upload.test.ts`。
- 修改：`server/types.ts`、`server/config.ts`、`server/schema.sql`、`server/app.ts`。
- 输出：配置查询、任务创建／列表／详情、临时凭据、候选 VID 提交和核验、取消。
- [x] 失败测试覆盖权限、配置、重复创建、序号占用、核验失败、退出／取消／配置变化的迟到结果。
- [x] 最小实现与专项通过；候选VID占用问题先复现再修复。

### 任务 2：官方云 API 适配（独立实现）

- 新增：`server/byteplus-upload-client.ts`、`tests/server/byteplus-upload-client.test.ts`。
- 消费：共享 `BytePlusUploadConfig`、`CloudUploadCredentials`。
- 输出：`createBytePlusUploadClient(config)`，方法 `issueCredentials(sessionName)` 和 `getMedia(vid)`。
- [x] 检查真实 SDK 源码与官方字段，测试签名、限定空间、固定 endpoint、响应校验与错误脱敏。
- [x] 只跑该模块测试，不修改业务路由、package 或共享配置。

### 任务 3：上传适配与界面（独立实现）

- 新增：`admin/cloud-uploader.ts`、`admin/components/CloudUploadPanel.vue`、`tests/unit/cloud-uploader.test.ts`。
- 消费：共享 HTTP 类型、既有管理员 api 和官方浏览器上传 SDK。
- 输出：文件验证、任务列表、开始／暂停／继续／取消、候选 VID 后端核验、可恢复错误。
- [x] 测试关闭持久缓存、格式校验、回调隔离、取消后不处理迟到完成。
- [x] 主任务将面板接入 MediaWorkspace，并统一 busy 防离页保护。

### 任务 4：接线与验收（主任务）

- [x] 增加动态端口的真实后台浏览器测试，外部 SDK／云服务明确替换，验证从选文件到服务器核验记录。
- [x] 检查本地上传回归、401 清屏、没有凭据进入持久存储／日志；Minis包检查在最终构建执行。
- [x] 更新部署样例、接入清单和能力边界。
- [x] 所有代码合并后跑一次全量、构建、依赖审计；修复必须回到失败原因，不降低校验。
- [x] 功能分支阶段提交 `a53df5f`，并留下已完成与真实平台剩余事项。

## 最终状态

云上传代码与本地验证完成；实际云端验收仍受外部配置限制。2026-10-16 只读检查 Aurora 后台，媒体资产管理仍显示“未激活”，没有代为激活、绑定云账号或接受收费条款。

完整测试、模块边界和团队下一步见 `/Users/xuan/Desktop/cursor/tiktok/docs/progress/updates/2026-10-16-013-cloud-upload.md`。
