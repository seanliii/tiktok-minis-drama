<template>
  <div v-if="drama" class="detail safe-top">
    <!-- 头图 -->
    <div class="hero">
      <img :src="drama.cover" :alt="drama.title" class="hero-bg" />
      <div class="hero-mask" />
      <div class="hero-info">
        <h1 class="hero-title">{{ drama.title }}</h1>
        <div class="hero-meta">
          <span class="tag" v-for="t in drama.tags" :key="t">{{ t }}</span>
          <span class="sep">·</span>
          <span>{{ drama.playCount }}播放</span>
          <span class="sep">·</span>
          <span class="score">⭐ {{ drama.rating }}</span>
        </div>
        <p class="hero-desc">{{ drama.desc }}</p>
      </div>
      <van-icon name="arrow-left" class="back-btn" size="22" color="#fff" @click="$router.back()" />
    </div>

    <!-- 付费引导横幅 -->
    <div class="banner">
      <div class="banner-text">
        <div class="banner-title">前 {{ drama.freeEpisodes }} 集免费看</div>
        <div class="banner-sub">解锁全部 {{ drama.totalEpisodes }} 集仅需</div>
      </div>
      <div class="banner-right">
        <span class="banner-price">🪙 66</span>
        <button class="unlock-btn" @click="handleUnlockAll">解锁全集</button>
      </div>
    </div>

    <!-- 选集 -->
    <section class="ep-section">
      <div class="section-title-row">
        <h3 class="section-title">选集</h3>
        <span class="ep-count">共 {{ drama.totalEpisodes }} 集 · {{ drama.freeEpisodes }} 集免费</span>
      </div>
      <div class="ep-grid">
        <div
          v-for="ep in drama.episodes"
          :key="ep.id"
          class="ep-item"
          :class="{ free: ep.isFree }"
          @click="openEpisode(ep)"
        >
          <span class="ep-num">{{ ep.id % 100 }}</span>
          <span v-if="ep.isFree" class="ep-free-tag">免费</span>
        </div>
      </div>
    </section>

    <!-- 支付弹窗 -->
    <van-popup
      v-model:show="showPay"
      position="bottom"
      round
      :style="{ background: 'var(--aurora-card)' }"
      class="pay-pop"
    >
      <div class="pay-content safe-bottom">
        <div class="pay-title grad-text">解锁剧集</div>
        <div class="pay-item">
          <div class="pay-item-left">
            <div class="pay-item-title">{{ payTarget.title }}</div>
            <div class="pay-item-sub">{{ payTarget.desc }}</div>
          </div>
          <div class="pay-item-right">
            <span class="coin">🪙</span>
            <span class="pay-price">{{ payTarget.price }}</span>
          </div>
        </div>
        <div class="pay-balance">当前余额：🪙 {{ user.coins }}</div>
        <button class="pay-btn" :disabled="paying" @click="handlePay">
          {{ paying ? '支付中…' : '确认支付' }}
        </button>
        <div class="pay-note">支付由 TikTok 端内 Beans 完成，前端回调仅作体验，实际发货以服务端通知为准</div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getDrama } from '@/utils/mock'
import { useUserStore } from '@/stores/user'
import ttSDK from '@/utils/tt'

const route = useRoute()
const router = useRouter()
const user = useUserStore()

const drama = computed(() => getDrama(Number(route.params.id)))
const showPay = ref(false)
const paying = ref(false)
const payTarget = ref({ title: '', desc: '', price: 66, epId: 0 })

const openEpisode = (ep: { id: number; isFree: boolean }) => {
  if (ep.isFree) {
    router.push(`/player/${drama.value!.id}/${ep.id}`)
    return
  }
  // 付费集：拉起解锁浮层
  payTarget.value = {
    title: `第 ${ep.id % 100} 集`,
    desc: `${drama.value!.title} · 单集解锁`,
    price: 66,
    epId: ep.id,
  }
  showPay.value = true
}

const handleUnlockAll = () => {
  payTarget.value = {
    title: '解锁全集',
    desc: `${drama.value!.title} · 剩余 ${drama.value!.totalEpisodes - drama.value!.freeEpisodes} 集全部解锁`,
    price: 500,
    epId: 0,
  }
  showPay.value = true
}

const handlePay = async () => {
  if (paying.value) return
  paying.value = true
  try {
    // TODO: 后端就绪后：POST /api/orders 创建预支付订单 → 返回 trade_order_id
    const trade_order_id = 'mock_order_' + Date.now()
    await ttSDK.pay({ trade_order_id })
    ttSDK.toast('支付成功，权益已到账')
    showPay.value = false
    if (payTarget.value.epId) {
      router.push(`/player/${drama.value!.id}/${payTarget.value.epId}`)
    }
  } catch (e: any) {
    ttSDK.toast('支付未完成')
  } finally {
    paying.value = false
  }
}
</script>

<style scoped>
.detail {
  background: var(--aurora-bg);
  min-height: 100%;
}
.hero {
  position: relative;
  height: 240px;
  overflow: hidden;
}
.hero-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(2px);
  transform: scale(1.05);
}
.hero-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 15, 22, 0.25), var(--aurora-bg) 96%);
}
.hero-info {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 14px;
}
.hero-title {
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 6px;
}
.hero-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 12px;
  color: var(--aurora-text2);
}
.tag {
  color: var(--aurora-accent);
  background: rgba(255, 59, 92, 0.14);
  border-radius: 4px;
  padding: 1px 8px;
}
.sep {
  color: #555;
}
.score {
  color: var(--aurora-gold);
}
.hero-desc {
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.55;
  color: #c9c9d6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.back-btn {
  position: absolute;
  top: calc(env(safe-area-inset-top) + 12px);
  left: 14px;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 50%;
  padding: 8px;
}
.banner {
  margin: 14px 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, rgba(255, 59, 92, 0.16), rgba(255, 122, 69, 0.16));
  border: 1px solid rgba(255, 59, 92, 0.35);
  border-radius: 14px;
  padding: 14px 16px;
}
.banner-title {
  font-size: 15px;
  font-weight: 700;
}
.banner-sub {
  font-size: 11px;
  color: var(--aurora-text2);
  margin-top: 3px;
}
.banner-right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.banner-price {
  font-size: 13px;
  font-weight: 700;
  color: var(--aurora-gold);
}
.unlock-btn {
  border: none;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  border-radius: 999px;
  padding: 8px 16px;
  background: linear-gradient(135deg, var(--aurora-accent), var(--aurora-accent2));
}
.ep-section {
  margin-top: 20px;
  padding-bottom: 20px;
}
.section-title-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 0 16px;
  margin-bottom: 12px;
}
.section-title {
  font-size: 16px;
  font-weight: 700;
}
.ep-count {
  font-size: 12px;
  color: var(--aurora-text2);
}
.ep-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  padding: 0 16px;
}
.ep-item {
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--aurora-card);
  border-radius: 10px;
  font-size: 13px;
  color: var(--aurora-text2);
}
.ep-item.free {
  color: #fff;
  border: 1px solid rgba(255, 59, 92, 0.4);
}
.ep-free-tag {
  position: absolute;
  top: -4px;
  right: -4px;
  font-size: 9px;
  color: #fff;
  background: var(--aurora-accent);
  border-radius: 999px;
  padding: 1px 6px;
}
.pay-content {
  padding: 22px 20px;
}
.pay-title {
  font-size: 18px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 18px;
}
.pay-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 14px;
}
.pay-item-title {
  font-size: 14px;
  font-weight: 600;
}
.pay-item-sub {
  font-size: 12px;
  color: var(--aurora-text2);
  margin-top: 3px;
}
.pay-item-right {
  display: flex;
  align-items: center;
  gap: 4px;
}
.pay-price {
  font-size: 20px;
  font-weight: 800;
  color: var(--aurora-gold);
}
.pay-balance {
  text-align: center;
  font-size: 12px;
  color: var(--aurora-text2);
  margin: 12px 0;
}
.pay-btn {
  width: 100%;
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
