/**
 * TikTok Minis SDK 统一封装（官方规范）
 * 真机：window.TTMinis（官方 JSAPI，回调风格 authResponse.code）
 * 浏览器开发：本地模拟（mock）
 * 参考：https://developers.tiktok.com/docs/en/minis-sdk-get-started
 */

type PayParams = { trade_order_id?: string; tradeOrderId?: string; orderInfo?: string }

const isRealEnv = () =>
  typeof window !== 'undefined' && !!(window as any).TTMinis && typeof (window as any).TTMinis.login === 'function'

export const ttSDK = {
  isMiniApp: isRealEnv,

  /** 静默登录：获取一次性 code（无授权弹窗） */
  login(): Promise<string> {
    if (!isRealEnv()) {
      return new Promise((r) => setTimeout(() => r('mock_code_' + Date.now()), 200))
    }
    const TT = (window as any).TTMinis
    return new Promise<string>((resolve, reject) => {
      try {
        // 官方推荐：回调风格，response.authResponse.code
        TT.login((response: any) => {
          const code = response?.authResponse?.code
          if (code) resolve(code)
          else reject(response)
        })
      } catch (e) {
        reject(e)
      }
    })
  },

  /** 显示授权：用户点击按钮后调用，申请 user.info.basic */
  authorize(): Promise<string> {
    if (!isRealEnv()) {
      return new Promise((r) =>
        setTimeout(() => r('mock_auth_' + Date.now()), 200),
      )
    }
    const TT = (window as any).TTMinis
    return new Promise<string>((resolve, reject) => {
      try {
        TT.authorize((response: any) => {
          const code = response?.authResponse?.code
          if (code) resolve(code)
          else reject(response)
        })
      } catch (e) {
        reject(e)
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
        TT.pay({
          ...params,
          success: resolve,
          fail: (err: any) => reject(new Error(err?.errMsg || 'pay failed')),
        })
      } catch (e) {
        reject(e)
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
        TT.subscribe({
          planId,
          success: resolve,
          fail: (err: any) => reject(new Error(err?.errMsg || 'subscribe failed')),
        })
      } catch (e) {
        reject(e)
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
