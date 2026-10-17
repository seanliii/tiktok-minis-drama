---
title: 视频空间已创建 · Team ID 可网页查询，上传权限与真实联调待完成
date: 2026-10-18
type: 文档
status: 进行中
features:
  - 已创建Aurora日本专用视频空间，确认私有访问且上传后不自动发布
  - IAM策略编辑器输入不可靠，异常草稿已退出，未提交或授予权限
  - Apple官方支持网页查看Team ID及发起入会，不必先安装Developer App
  - VOD SDK App ID来自SDK应用管理，不能用TikTok或云账号编号代替
  - 主机和域名完成候选询价，尚未购买、部署或执行真实用户付款
---

# 022 · 视频空间已创建，继续完成权限与上线准备

目标仍是 **Aurora Drama（`7670022867891177493`）日本首发**。本轮没有操作旧 DramaVerseJP 或美国项目。

**北京时间 2026-10-18 02:22:09，专用视频空间 `auroradrama-jp` 已实际创建。** 已进入空间并读取上传、存储与公开访问设置，不是只填了创建表单。

**空间存在不等于后台已经能上传，更不等于已经上线或开通真实收费。** 当前仍有 IAM 配置、SDK 应用参数、平台绑定、实际部署及官方环境验证。

<!-- more -->

## 1. 本轮实际完成

| 项目 | 已核实结果 |
| --- | --- |
| 云平台登录 | 经负责人允许，完成新登录会话的验证并进入控制台 |
| 视频空间 | `auroradrama-jp`，项目 `default` |
| 空间区域 | `ap-southeast-1`，控制台显示 Asia Pacific (Johor) |
| 自动发布 | 读取结果为 **Unpublished**，不自动发布 |
| 默认工作流 | 触发状态 Disabled，默认工作流 None |
| 原片读写访问 | **Private** |
| URL 签名 | 已启用，控制台显示有效期 1800 秒；未读取或公开签名密钥 |
| 实际上传 | 尚未上传，不能将上述配置读取当作文件访问控制的运行验证 |

这些保护设置是新空间的默认状态，本轮做的是**确认并保留**，不把它写成已经修改了全部安全设置。未开通额外加速套餐，未购买主机或域名。

## 2. IAM 权限还没有完成

已核对现有后台服务用户，准备的范围仍然是：

- 上传角色：仅指定空间的 `vod:ApplyUploadInfo` 和 `vod:CommitUploadInfo`；
- 后台签发者：指定上传角色的代入权限，以及指定空间的 `vod:GetMediaInfos` 核验权限；
- 不授予删片、公开发布、账务、服务器管理或整个云账号的管理员权限。

控制台策略编辑器的一次输入把新内容追加到了默认模板中；后续正常编辑点击又被编辑器覆盖层拦截。**没有点击提交。** 已通过正常导航退出异常草稿，随后精确搜索拟定策略名称，列表显示 **No data**。

因此，**策略没有创建，上传角色没有创建，新权限没有授予。** 三份最小权限 JSON 已在私有目录准备并做本地结构检查；这不是 BytePlus 云端验证。须先解决编辑器的正常输入问题，或由有权限的管理员通过受支持方式录入，再回查实际策略并运行权限测试。不能强行绕过编辑器、提交残留的全资源模板或扩大权限来换取成功。

## 3. Team ID 不必通过安装 App 来查询

Apple 官方的[账户主页说明](https://developer.apple.com/help/account/basics/account-landing-page)明确列出：**Membership details（会员资格详情）中可以查看 Team ID**。

如果公司已有 Apple 开发者团队：

1. 使用浏览器登录 [Apple Developer 账户](https://developer.apple.com/account/)。
2. 确认选择的是本项目所属公司的团队，不是无关个人或其他公司的团队。
3. 进入 Membership details，读取 Team ID；也可以直接请该团队负责人提供。
4. 提供真实编号后，再继续填写 Aurora 的基本信息；不用为了查编号先升级到 26 系统或安装 Apple Developer App。

如果没有相应团队／会员信息，先向主体负责人确认公司是否已有开发者资格。Apple 的[入会说明](https://developer.apple.com/help/account/membership/program-enrollment)也明确支持从网页发起申请，但身份核验、组织资格和付款仍须按该账号实际要求办理。

**未取得真实 Team ID，未购买 Apple 会员。** 不把邮箱、TikTok App ID、云账号编号或别人的 Team ID 当作可提交资料，也不承诺所有新入会身份验证都能由开发代办。

## 4. 还需要一个不同的 VOD SDK App ID

官方 [Web Upload SDK 文档](https://docs.byteplus.com/en/docs/byteplus-vod/docs-web-upload-sdk)要求初始化时提供 VOD 的 `appId`。根据[应用管理说明](https://docs.byteplus.com/en/docs/byteplus-vod/docs-sdk-management)，路径为 **SDK management → Applications**，创建应用后由平台生成 App ID。

Web/H5 应用登记的是使用 SDK 的**网站域名**，不是视频播放域名。后台上传页使用的正式域名须先确认；不能随意填写不属于项目的域名来拿编号。

`BYTEPLUS_VOD_APP_ID` 的实际值尚未取得。不得用 TikTok App ID、BytePlus 账号 ID 或控制台埋点编号代填。也不能为了获得 App ID 擅自购买播放器许可套餐。

## 5. 最后还差哪些工作

| 工作 | 下一步与责任 |
| --- | --- |
| 视频上传权限 | 先解决 IAM 编辑器问题，录入、回查并实际测试最小权限；开发继续接线核验 |
| SDK 参数与 TikTok 绑定 | 取得真实 VOD SDK App ID；确认平台所需权限及专用身份，再明确授权绑定。当前未向 TikTok 传送 AK/SK |
| 主机、域名、HTTPS | 候选已询价，未下单；还需注册人资料与具体费用确认，再由开发部署服务、环境变量、独立数据及备份 |
| Aurora 基本信息 | 公司真实 Team ID、该应用邮箱验证、版权／域名／地区声明逐项完成 |
| 内容与运营 | 合法日文片源、封面、字幕、免费集数、价格及客服安排由内容／运营负责人确认 |
| 真实验证 | 先跑一部测试剧的上传、审核和播放；再验收日本账号登录、官方 Sandbox、购买／续费／取消／退款及恢复 |
| 提审与上线 | 生产 HTTPS API 配置完成后重新构建前端、上传对应版本，再提交应用与内容审核 |

尚未购买的域名候选、具体订单草稿、客户资料和私有配置不放在本页公开。当前本地业务实现与历史测试证据继续见 [019](/progress/updates/2026-10-17-019-subscription-management)，云服务上一阶段见 [021](/progress/updates/2026-10-17-021-cloud-activation)。
