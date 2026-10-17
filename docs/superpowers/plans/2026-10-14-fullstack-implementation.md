# 短剧前后台贯通实施清单

本次用户已明确要求实施既有架构，不停留在方案。范围是本地可持久化、可上传、可管理、可注册登录与可验证订单解锁的完整系统；不自动上线、不动美国App、不执行真实扣费。

## 接口约定与负责文件

- 公共数据结构：`app/tt-minis/shared/contracts.ts`。
- 单一 SQLite 数据库：`server/schema.sql`；生产迁移到其他数据库须另行验证，不宣称当前已多节点可用。
- 业务服务：Node 22、Express、文件系统私有存储、服务端会话与角色。客户端只取得被授权的数据和短期播放凭证。
- 独立 PC 管理后台：`admin/`，不放进 TikTok 平台包。
- 消费者前端：既有 `src/`，`preview` 模式保留独立离线样例；`service` 模式读取真实后端，不能在后端失败时静默回退样例片库。
- 付款：默认 `sandbox`，无真钱；真实订单、事件与权益均持久化。生产不得开启 sandbox、不得接受本地管理员伪造平台付款成功。

## API 契约

所有 JSON 错误为 `{error:{code,message}}`；成功按下述对象返回。所有非 webhook 写请求携带 `X-Requested-With: DramaVerseJP`，使用 HttpOnly 同站会话，校验 Origin。前端使用同源 `/api`。

### 账户（服务端主任务）
- GET `/api/meta` → Meta；GET `/api/auth/me` → SessionInfo。
- POST `/api/auth/register` `{email,password,nickname}` → SessionInfo，只创建普通用户。
- POST `/api/auth/login` `{email,password}` → SessionInfo。
- POST `/api/auth/logout` → `{ok:true}`，撤销会话。
- POST `/api/auth/password` `{oldPassword,newPassword}` → `{ok:true}`，更新哈希并撤销其他会话。
- POST `/api/auth/tiktok` `{code}` → SessionInfo；无平台配置明确503，不能把code当身份。

### 片库与文件（服务端主任务）
- GET `/api/catalog` → `{dramas:Drama[]}`，只返回已发布日本内容。
- GET `/api/dramas/:id` → `{drama:Drama}`。
- GET/POST `/api/admin/dramas` → `{dramas}` / `{drama}`。
- PATCH `/api/admin/dramas/:id` `{title,desc,category,language,regions,tags,freeEpisodes,episodePrice,bundlePrice,coverAssetId,rightsConfirmed,isSample,version}` → `{drama}`，版本冲突409。
- POST `/api/admin/dramas/:id/publish` `{version}` → `{drama}`；本地发布不冒充平台过审。需至少一集、连续序号、视频、封面、版权确认。
- POST `/api/admin/dramas/:id/unpublish` → `{drama}`；立即影响片库及播放授权。
- POST `/api/admin/dramas/:id/episodes` `{seq,title,durationSeconds,assetId,subtitleAssetId?,platformEpisodeId?,byteplusVid?}` → `{episode}`。
- PATCH `/api/admin/episodes/:id` 同上 → `{episode}`。
- DELETE `/api/admin/episodes/:id` → `{ok:true}`；只允许未发布且未存在购买关联的内容，已发布先下架。
- POST `/api/admin/assets?kind=video|cover|subtitle` multipart `file` → `{asset:Asset}`，真实上传、哈希、限制大小与文件类型。
- GET `/api/admin/assets` → `{assets}`；GET `/api/admin/users` → `{users}`；GET `/api/admin/audit` → `{events}`。
- GET `/api/admin/integrations` → `{mode,paymentMode,mediaMode,tiktokConfigured,requirements:string[]}`，不返回秘密。
- GET `/api/assets/:id` 仅封面／字幕公开可读，视频不公开。
- POST `/api/episodes/:id/playback` → Playback，未登录付费401、无权402、未发布404。
- GET `/api/media/stream/:token` Range流媒体；每次验证会话、有效期、发布状态、权益，禁止直接猜文件路径。

### 收藏／历史（服务端主任务）
- GET `/api/library` → Library；PUT `/api/library/favorites/:dramaId` `{saved:boolean}` → Library。
- PUT `/api/library/progress` `{dramaId,episodeId,currentTime,duration,completed}` → Library，确认该用户有权播放。
- DELETE `/api/library/history` → Library，不能影响他人。

### 商业（主代理）
- POST `/api/orders` `{kind:'episode'|'drama'|'vip',targetId?:number,idempotencyKey:string}` → `{order}`。价格以数据库/配置为准，不接受前端amount。
- GET `/api/orders` → `{orders}`；GET `/api/orders/:id` → `{order}`，只允许订单主人。
- POST `/api/orders/:id/cancel` → `{order}`。
- POST `/api/orders/:id/sandbox-confirm` `{outcome:'paid'|'failed'}` → `{order}`，仅local+sandbox、订单主人，显式二次确认；重复事件不重复发权。
- GET `/api/admin/orders` → `{orders}`；POST `/api/admin/orders/:id/refund` `{reason}` → `{order}`，仅sandbox，撤销本单权益。
- GET `/api/admin/entitlements` → `{entitlements}`。
- POST `/api/webhooks/tiktok` 原始体签名校验；真实格式以官方资料验证后实现，不伪造生产完成。
- `registerCommerce(router,ctx)`、`activeEntitlements(ctx,userId)`、`hasEpisodeAccess(ctx,userId|null,episodeId)`由商业模块导出供核心路由使用。

## 可执行交付步骤

- [x] 先写失败接口／浏览器用例：普通用户越权、真实上传与下架、订单去重、付款取消、退款撤权、跨用户隔离。
- [x] 实现数据库、账户、私有文件、片库与管理API。
- [x] 接独立管理员网页：登录、新剧、封面／多集上传、发布／下架、订单／用户／日志。
- [x] 接消费者API：注册登录、片库、试看、下单、测试支付、解锁、服务器收藏／续看。
- [x] 实现服务端订单／权益与平台接口边界；真实服务未配置时明确阻止，不降级假成功。
- [x] 用两个不同普通用户和一个管理员跑完上传到付费解锁、退款、重登与重启持久化。
- [x] 跑服务端单测、原有离线回归、新全栈E2E、三种构建、审计、干净安装验证。
- [x] 生成启动手册、会前未测项、真实证据与独立产物，阶段性中文commit；不推送、上传或提审。

## 实施中核查与决定

- 旧离线单测明确固定 preview，服务单测固定 service；不用默认测试模式混淆两种产品形态。
- 生产与本地默认目录分开，数据库环境标记拒绝跨环境误用；保留历史数据，不自动删除。
- 真实付款结果不明时保留 processing，不仅凭本地取消／超时重新建单；迟到真实回执仍处理。
- 部分追回单位与累计语义未核实，不自动累加或全额撤权，先存逐次投递并提供管理页只读核对。
- 真实订阅、BytePlus／平台审核同步、跨源端内部署未假装实现；明确保留为需要平台资料的后续开发与验收。
- 外部监督程序返回认证401，未算通过；用独立代码审阅、实际接口与浏览器测试继续核验。
- 新建单与本地付款共用内容可用性判断，修复内容已隐藏仍可售；真实迟到回执不因此被拒收。
- 最终 `npm run test:all`：331通过、0失败、0跳过。独立运行包仅安装生产依赖后启动、账号重启保留通过；主工作区旧会话、旧已付订单及付费播放重启后保留。业务代码提交 `db8be2f`。
