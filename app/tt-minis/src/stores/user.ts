import { defineStore } from 'pinia'
import { ref } from 'vue'
import ttSDK from '@/utils/tt'

export const useUserStore = defineStore('user', () => {
  const openId = ref('')
  const nickname = ref('')
  const avatar = ref('')
  const coins = ref(120)
  const isVip = ref(false)
  const loggedIn = ref(false)

  /** 静默登录 */
  async function silentLogin() {
    if (loggedIn.value) return
    const code = await ttSDK.login()
    // TODO: 后端就绪后替换为真实接口 POST /api/auth/login { code }
    openId.value = 'dev_' + code.slice(-8)
    loggedIn.value = true
  }

  /** 显示授权（个人中心触发） */
  async function authorize() {
    const code = await ttSDK.authorize()
    // TODO: 后端就绪后替换为真实用户资料
    nickname.value = nickname.value || 'ドラマユーザー'
    avatar.value = avatar.value || ''
  }

  return { openId, nickname, avatar, coins, isVip, loggedIn, silentLogin, authorize }
})
