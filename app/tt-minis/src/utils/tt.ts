/**
 * TikTok Minis SDK 统一封装
 * 真机：window.TTMinis（官方 JSAPI）
 * 浏览器开发：本地模拟（mock）
 * 参考官方文档：https://bytedance.larkoffice.com/wiki/NjgSwYNSHiiMdxkJHHwcTY1lnCg
 */

type PayParams = { trade_order_id?: string; tradeOrderId?: string }

const isRealEnv = () =>
  typeof window !== 'undefined' && !!(window as any).TTMinis && typeof (window as any).TTMinis.login === 'function'

export const ttSDK = {
  isMiniApp: isRealEnv,

  /** 静默登录：获取一次性 code */
  login(): Promise<string> {
    if (!isRealEnv()) {
      return new Promise((r) => setTimeout(() => r('mock_code_' + Date.now()), 200))
    }
    const TT = (window as any).TTMinis
    return new Promise<string>((resolve, reject) => {
      try {
        TT.login()
          .then((res: any) => resolve(res?.code || res))
          .catch((err: any) => reject(err))
      } catch (e) {
        // 兼容回调风格
        TT.login({
          success: (res: any) => resolve(res?.code || res),
          fail: (err: any) => reject(err),
        })
      }
    })
  },

  /** 显示授权：申请基础资料 */
  authorize(): Promise<any> {
    if (!isRealEnv()) {
      return new Promise((r) =>
        setTimeout(() => r({ code: 'mock_auth_code', userInfo: { nickname: '漫剧用户', avatarUrl: '' } }), 200),
      )
    }
    const TT = (window as any).TTMinis
    return new Promise<any>((resolve, reject) => {
      try {
        TT.authorize({ scope: 'user.info.basic' })
          .then(resolve)
          .catch(reject)
      } catch (e) {
        TT.authorize({
          scope: 'user.info.basic',
          success: resolve,
          fail: reject,
        })
      }
    })
  },

  /** 端内支付：拉起 Beans 支付面板 */
  pay(params: PayParams): Promise<any> {
    if (!isRealEnv()) {
      console.log('[mock pay]', params)
      return new Promise((r) => setTimeout(() => r({ paid: true }), 800))
    }
    const TT = (window as any).TTMinis
    return new Promise<any>((resolve, reject) => {
      try {
        TT.pay(params).then(resolve).catch(reject)
      } catch (e) {
        TT.pay({ ...params, success: resolve, fail: reject })
      }
    })
  },

  /** 端内订阅 */
  subscribe(planId: string): Promise<any> {
    if (!isRealEnv()) {
      console.log('[mock subscribe]', planId)
      return new Promise((r) => setTimeout(() => r({ subscribed: true }), 800))
    }
    const TT = (window as any).TTMinis
    return new Promise<any>((resolve, reject) => {
      try {
        TT.subscribe({ planId }).then(resolve).catch(reject)
      } catch (e) {
        TT.subscribe({ planId, success: resolve, fail: reject })
      }
    })
  },

  /** 轻提示 */
  toast(title: string) {
    if (!isRealEnv()) {
      console.log('[toast]', title)
      return
    }
    try {
      ;(window as any).TTMinis.showToast({ title })
    } catch (e) {
      console.log('[toast]', title)
    }
  },
}

export default ttSDK
