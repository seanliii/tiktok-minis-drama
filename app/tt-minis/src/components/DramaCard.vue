<template>
  <div class="drama-card" :class="mode" @click="$emit('click')">
    <div class="cover-wrap">
      <img :src="drama.cover" :alt="drama.title" loading="lazy" class="cover" />
      <div class="cover-mask" />
      <span class="ep-badge">{{ drama.totalEpisodes }}集</span>
      <span class="play-badge">▶ {{ drama.playCount }}</span>
      <div class="score"><span class="score-num">{{ drama.rating }}</span></div>
    </div>
    <div class="info">
      <div class="title">{{ drama.title }}</div>
      <div class="meta">
        <span class="cat">{{ drama.category }}</span>
        <span class="free">{{ drama.freeEpisodes }}集免费</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Drama } from '@/utils/mock'

defineProps<{ drama: Drama; mode?: 'grid' | 'row' }>()
defineEmits<{ (e: 'click'): void }>()
</script>

<style scoped>
.drama-card {
  cursor: pointer;
}
.cover-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 10px;
  overflow: hidden;
  background: var(--aurora-card);
}
.cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.cover-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 55%, rgba(0, 0, 0, 0.75));
}
.ep-badge {
  position: absolute;
  left: 6px;
  bottom: 6px;
  font-size: 10px;
  color: #fff;
  background: rgba(0, 0, 0, 0.55);
  border-radius: 4px;
  padding: 2px 6px;
}
.play-badge {
  position: absolute;
  right: 6px;
  bottom: 6px;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.9);
}
.score {
  position: absolute;
  top: 6px;
  left: 6px;
  background: linear-gradient(135deg, var(--aurora-gold), #ff6a00);
  border-radius: 6px;
  padding: 1px 6px;
}
.score-num {
  font-size: 11px;
  font-weight: 700;
  color: #1a1a1a;
}
.info {
  padding: 8px 2px 4px;
}
.title {
  font-size: 14px;
  font-weight: 600;
  color: var(--aurora-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.meta {
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.cat {
  font-size: 11px;
  color: var(--aurora-accent);
  background: rgba(255, 59, 92, 0.12);
  border-radius: 4px;
  padding: 1px 6px;
}
.free {
  font-size: 11px;
  color: var(--aurora-text2);
}
</style>
