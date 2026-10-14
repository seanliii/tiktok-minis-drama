<template>
  <div class="player">
    <!-- 模拟播放器：媒资就绪后替换为平台媒资库播放器 -->
    <div class="video-area" @click="togglePlaying">
      <img :src="epThumb" class="video-poster" alt="cover" />
      <div class="video-mask" />
      <div v-if="!playing" class="play-btn">
        <van-icon name="play-circle-o" size="64" color="#fff" />
      </div>
      <div class="video-top safe-top">
        <van-icon name="arrow-left" size="22" color="#fff" class="back-btn" @click.stop="$router.back()" />
        <span class="video-title">{{ dramaTitle }} · 第 {{ epNum }} 話</span>
      </div>
      <div v-if="playing" class="video-bottom">
        <div class="progress-bar"><div class="progress-fill" :style="{ width: progress + '%' }" /></div>
        <span class="time">{{ curTime }} / {{ duration }}</span>
      </div>
      <div class="mock-tip">メディア連携中 · プレビュー版</div>
    </div>

    <!-- 剧集信息与切换 -->
    <div class="player-info">
      <div class="player-title-row">
        <h2 class="player-title">{{ dramaTitle }}</h2>
        <span class="ep-now">第 {{ epNum }} 話</span>
      </div>
      <p class="player-desc">{{ dramaDesc }}</p>

      <div class="ep-swipe-title">エピソード一覧</div>
      <div class="ep-swipe">
        <div
          v-for="ep in episodes"
          :key="ep.id"
          class="ep-chip"
          :class="{ current: ep.id === currentEpId, locked: !ep.isFree && ep.id !== currentEpId }"
          @click="switchEpisode(ep)"
        >
          {{ ep.id % 100 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getDrama, getEpisode } from '@/utils/mock'
import { useUserStore } from '@/stores/user'
import ttSDK from '@/utils/tt'

const route = useRoute()
const router = useRouter()
const user = useUserStore()

const dramaId = Number(route.params.dramaId)
const currentEpId = Number(route.params.epId)
const drama = computed(() => getDrama(dramaId))
const episodes = computed(() => drama.value?.episodes || [])
const ep = computed(() => getEpisode(dramaId, currentEpId))
const dramaTitle = computed(() => drama.value?.title || '')
const dramaDesc = computed(() => drama.value?.desc || '')
const epNum = computed(() => (ep.value ? ep.value.id % 100 : 1))
const epThumb = computed(() => ep.value?.thumb || drama.value?.cover || '')

const playing = ref(false)
const progress = ref(0)
const curTime = ref('00:00')
const duration = ref(ep.value?.duration || '02:00')
let timer: any = null

const togglePlaying = () => {
  playing.value = !playing.value
  if (playing.value) startTick()
  else stopTick()
}

const startTick = () => {
  stopTick()
  timer = setInterval(() => {
    progress.value = Math.min(100, progress.value + 1)
    const total = 120
    const cur = Math.floor((progress.value / 100) * total)
    curTime.value = `0${Math.floor(cur / 60)}:${String(cur % 60).padStart(2, '0')}`
    if (progress.value >= 100) {
      stopTick()
      playing.value = false
      // 自动播下一集
      const idx = episodes.value.findIndex((e) => e.id === currentEpId)
      const next = episodes.value[idx + 1]
      if (next) switchEpisode(next)
    }
  }, 1000)
}

const stopTick = () => {
  if (timer) clearInterval(timer)
  timer = null
}

const switchEpisode = (e: { id: number; isFree: boolean }) => {
  if (e.id === currentEpId) return
  if (!e.isFree) {
    ttSDK.toast('この話を見るには購入が必要です')
    return
  }
  progress.value = 0
  curTime.value = '00:00'
  router.replace(`/player/${dramaId}/${e.id}`)
}

onMounted(() => {
  // 播放页进入时静默登录兜底（用户可能直接分享进入）
  user.silentLogin().catch(() => {})
})

onUnmounted(stopTick)
</script>

<style scoped>
.player {
  background: #000;
  min-height: 100vh;
}
.video-area {
  position: relative;
  width: 100%;
  aspect-ratio: 9 / 16;
  max-height: 100vh;
  background: #000;
  overflow: hidden;
}
.video-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.video-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5), transparent 25%, transparent 70%, rgba(0, 0, 0, 0.6));
}
.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
}
.video-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  z-index: 4;
}
.back-btn {
  background: rgba(0, 0, 0, 0.35);
  border-radius: 50%;
  padding: 8px;
}
.video-title {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
}
.video-bottom {
  position: absolute;
  bottom: 40px;
  left: 16px;
  right: 16px;
  z-index: 4;
}
.progress-bar {
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: var(--aurora-accent);
  transition: width 0.5s linear;
}
.time {
  display: block;
  margin-top: 6px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  text-align: right;
}
.mock-tip {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  color: rgba(255, 255, 255, 0.45);
  z-index: 4;
}
.player-info {
  background: var(--aurora-bg);
  padding: 16px;
  padding-bottom: 40px;
}
.player-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.player-title {
  font-size: 18px;
  font-weight: 800;
}
.ep-now {
  font-size: 12px;
  color: var(--aurora-accent);
  border: 1px solid rgba(255, 59, 92, 0.4);
  border-radius: 999px;
  padding: 2px 10px;
}
.player-desc {
  margin-top: 8px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--aurora-text2);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.ep-swipe-title {
  margin: 16px 0 10px;
  font-size: 14px;
  font-weight: 700;
}
.ep-swipe {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 6px;
  scrollbar-width: none;
}
.ep-swipe::-webkit-scrollbar {
  display: none;
}
.ep-chip {
  flex: none;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  border-radius: 10px;
  background: var(--aurora-card);
  color: var(--aurora-text2);
}
.ep-chip.current {
  color: #fff;
  font-weight: 700;
  background: linear-gradient(135deg, var(--aurora-accent), var(--aurora-accent2));
}
.ep-chip.locked::after {
  content: '🔒';
  position: absolute;
  font-size: 8px;
}
</style>
