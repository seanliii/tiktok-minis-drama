<template>
  <div class="profile safe-top">
    <!-- 用户卡 -->
    <div class="user-card">
      <img :src="user.avatar || defaultAvatar" class="avatar" alt="avatar" />
      <div class="user-info">
        <div class="nickname" @click="handleAuthorize">{{ user.nickname || 'ログインする' }}</div>
        <div class="uid" v-if="user.loggedIn">ID: {{ user.openId }}</div>
        <div v-else class="uid">サイレントログイン後に表示されます</div>
      </div>
    </div>

    <!-- 资产卡 -->
    <div class="asset-card">
      <div class="asset-item">
        <span class="asset-icon">🪙</span>
        <div class="asset-num">{{ user.coins }}</div>
        <div class="asset-label">コイン</div>
      </div>
      <div class="asset-divider" />
      <div class="asset-item">
        <span class="asset-icon">🎬</span>
        <div class="asset-num">{{ watchedCount }}</div>
        <div class="asset-label">購入済み</div>
      </div>
      <div class="asset-divider" />
      <div class="asset-item" @click="handleVip">
        <span class="asset-icon">👑</span>
        <div class="asset-num">{{ user.isVip ? '利用中' : '未加入' }}</div>
        <div class="asset-label">VIP</div>
      </div>
    </div>

    <!-- 订阅横幅 -->
    <div class="vip-banner" @click="handleVip">
      <div class="vip-left">
        <div class="vip-title">👑 VIP会員 · 全ドラマ見放題</div>
        <div class="vip-sub">月額 $12.99 · 新規は初月半額</div>
      </div>
      <button class="vip-btn" @click.stop="handleVip">申し込む</button>
    </div>

    <!-- 功能列表 -->
    <van-cell-group :border="false" class="menu">
      <van-cell title="視聴履歴" icon="clock-o" is-link @click="toast('開発中')" />
      <van-cell title="マイ購入" icon="vip-card-o" is-link @click="toast('開発中')" />
      <van-cell title="カスタマーサポート" icon="service-o" is-link @click="toast('開発中')" />
      <van-cell title="設定" icon="setting-o" is-link @click="toast('開発中')" />
    </van-cell-group>

    <p class="footer-note">DramaVerse · TikTok Minis ドラマ</p>

    <!-- 订阅弹窗 -->
    <van-popup v-model:show="showVip" position="bottom" round :style="{ background: 'var(--aurora-card)' }" class="pay-pop">
      <div class="vip-content safe-bottom">
        <div class="vip-pop-title grad-text">DramaVerse VIP</div>
        <div class="vip-benefit">
          <div class="benefit-item">✓ 全ドラマ見放題</div>
          <div class="benefit-item">✓ 毎月 200 コインプレゼント</div>
          <div class="benefit-item">✓ 新作を最優先で視聴</div>
        </div>
        <div class="vip-price">$12.99 <span class="vip-price-sub">/ 月</span></div>
        <button class="pay-btn" :disabled="subscribing" @click="handleSubscribe">
          {{ subscribing ? '処理中…' : '登録する' }}
        </button>
        <div class="pay-note">定期課金です。いつでも TikTok 内で解約できます</div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import ttSDK from '@/utils/tt'

const user = useUserStore()
const showVip = ref(false)
const subscribing = ref(false)
const watchedCount = ref(3)

const defaultAvatar =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Ccircle cx="32" cy="32" r="32" fill="%232b2b3a"/%3E%3Ctext x="32" y="40" font-size="28" text-anchor="middle" fill="%239a9aad"%3E%3F%3C/text%3E%3C/svg%3E'

const toast = (msg: string) => ttSDK.toast(msg)

const handleAuthorize = async () => {
  if (user.nickname) return
  try {
    await user.authorize()
  } catch (e) {
    ttSDK.toast('已取消授权')
  }
}

const handleVip = () => (showVip.value = true)

const handleSubscribe = async () => {
  if (subscribing.value) return
  subscribing.value = true
  try {
    // TODO: 后端就绪后：POST /api/subscriptions 创建订阅 → ttSDK.subscribe(planId)
    await ttSDK.subscribe('aurora_vip_monthly')
    user.isVip = true
    ttSDK.toast('登録が完了しました')
    showVip.value = false
  } catch (e: any) {
    ttSDK.toast('登録が完了していません')
  } finally {
    subscribing.value = false
  }
}
</script>

<style scoped>
.profile {
  background: var(--aurora-bg);
  min-height: 100%;
  padding: 0 16px;
}
.user-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 4px;
}
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid rgba(255, 59, 92, 0.5);
}
.nickname {
  font-size: 17px;
  font-weight: 700;
}
.uid {
  margin-top: 4px;
  font-size: 12px;
  color: var(--aurora-text2);
}
.asset-card {
  display: flex;
  align-items: center;
  background: var(--aurora-card);
  border-radius: 16px;
  padding: 16px 0;
}
.asset-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}
.asset-icon {
  font-size: 20px;
}
.asset-num {
  font-size: 16px;
  font-weight: 700;
}
.asset-label {
  font-size: 11px;
  color: var(--aurora-text2);
}
.asset-divider {
  width: 1px;
  height: 28px;
  background: rgba(255, 255, 255, 0.08);
}
.vip-banner {
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, rgba(255, 184, 0, 0.14), rgba(255, 106, 0, 0.14));
  border: 1px solid rgba(255, 184, 0, 0.35);
  border-radius: 14px;
  padding: 14px 16px;
}
.vip-title {
  font-size: 14px;
  font-weight: 700;
}
.vip-sub {
  font-size: 11px;
  color: var(--aurora-text2);
  margin-top: 3px;
}
.vip-btn {
  border: none;
  color: #1a1a1a;
  font-size: 12px;
  font-weight: 700;
  border-radius: 999px;
  padding: 7px 16px;
  background: linear-gradient(135deg, var(--aurora-gold), #ff6a00);
}
.menu {
  margin-top: 16px;
  background: var(--aurora-card);
  border-radius: 16px;
  overflow: hidden;
}
.menu :deep(.van-cell) {
  background: transparent;
  color: var(--aurora-text);
}
.menu :deep(.van-cell::after) {
  border-color: rgba(255, 255, 255, 0.06);
}
.footer-note {
  margin-top: 24px;
  text-align: center;
  font-size: 11px;
  color: #555;
}
.vip-content {
  padding: 24px 20px;
}
.vip-pop-title {
  font-size: 20px;
  font-weight: 800;
  text-align: center;
}
.vip-benefit {
  margin: 16px 0;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}
.benefit-item {
  font-size: 13px;
  color: #c9c9d6;
  line-height: 2;
}
.vip-price {
  text-align: center;
  font-size: 26px;
  font-weight: 800;
  color: var(--aurora-gold);
}
.vip-price-sub {
  font-size: 13px;
  font-weight: 400;
  color: var(--aurora-text2);
}
.pay-btn {
  width: 100%;
  margin-top: 14px;
  border: none;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  border-radius: 999px;
  padding: 13px 0;
  background: linear-gradient(135deg, var(--aurora-accent), var(--aurora-accent2));
}
.pay-btn:disabled {
  opacity: 0.6;
}
.pay-note {
  margin-top: 12px;
  text-align: center;
  font-size: 10px;
  color: #666;
}
</style>
