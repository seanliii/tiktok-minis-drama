<template>
  <div class="home safe-top">
    <!-- 顶部 -->
    <header class="home-header">
      <div class="logo grad-text">AURORA DRAMA</div>
      <div class="header-right">
        <div class="coin-pill" @click="goProfile">
          <span class="coin-icon">🪙</span>
          <span class="coin-num">{{ user.coins }}</span>
        </div>
        <van-icon name="user-o" size="20" color="#fff" @click="goProfile" />
      </div>
    </header>

    <!-- 搜索条 -->
    <div class="search-bar" @click="$router.push('/search')">
      <van-icon name="search" color="#9a9aad" />
      <span class="search-placeholder">搜索漫剧</span>
    </div>

    <!-- 分类导航 -->
    <div class="category-nav">
      <div
        v-for="cat in categories"
        :key="cat.id"
        class="category-item"
        :class="{ active: activeCategory === cat.id }"
        @click="activeCategory = cat.id"
      >
        {{ cat.name }}
      </div>
    </div>

    <!-- 主内容 -->
    <main class="home-main">
      <!-- 精选推荐：横向滑动 -->
      <section class="section">
        <div class="section-header">
          <h3 class="section-title"><span class="fire">🔥</span> 精选推荐</h3>
          <span class="more" @click="$router.push('/search')">更多 ›</span>
        </div>
        <div class="drama-scroll">
          <DramaCard
            v-for="d in recommendList"
            :key="d.id"
            :drama="d"
            class="scroll-card"
            @click="openDrama(d)"
          />
        </div>
      </section>

      <!-- 全部剧集：双列瀑布 -->
      <section class="section">
        <div class="section-header">
          <h3 class="section-title"><span class="new">✨</span> 全部漫剧</h3>
        </div>
        <div class="drama-grid">
          <DramaCard
            v-for="d in filteredList"
            :key="d.id"
            :drama="d"
            mode="grid"
            @click="openDrama(d)"
          />
        </div>
        <van-empty v-if="!filteredList.length" description="该分类暂无内容" />
      </section>
    </main>

    <!-- 登录浮层（静默登录完成后自动关闭） -->
    <van-overlay :show="showLoginMask" z-index="100">
      <div class="login-mask">
        <van-loading color="#ff3b5c" size="32" />
        <p>正在进入漫剧世界…</p>
      </div>
    </van-overlay>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { dramas, categories } from '@/utils/mock'
import { useUserStore } from '@/stores/user'
import DramaCard from '@/components/DramaCard.vue'

const router = useRouter()
const user = useUserStore()

const activeCategory = ref('all')
const showLoginMask = ref(true)
const recommendList = ref(dramas.slice(0, 6))

const filteredList = computed(() =>
  activeCategory.value === 'all' ? dramas : dramas.filter((d) => d.category === activeCategory.value),
)

const openDrama = (d: (typeof dramas)[number]) => router.push(`/drama/${d.id}`)
const goProfile = () => router.push('/profile')

onMounted(async () => {
  // 静默登录：用户无感知建立身份
  try {
    await user.silentLogin()
  } catch (e) {
    console.warn('login failed, continue as guest', e)
  } finally {
    showLoginMask.value = false
  }
})
</script>

<style scoped>
.home {
  background: var(--aurora-bg);
  min-height: 100%;
}
.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px 10px;
}
.logo {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 1px;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 14px;
}
.coin-pill {
  display: flex;
  align-items: center;
  gap: 4px;
  background: linear-gradient(135deg, rgba(255, 184, 0, 0.18), rgba(255, 106, 0, 0.18));
  border: 1px solid rgba(255, 184, 0, 0.35);
  border-radius: 999px;
  padding: 3px 12px;
}
.coin-icon {
  font-size: 12px;
}
.coin-num {
  font-size: 13px;
  font-weight: 700;
  color: var(--aurora-gold);
}
.search-bar {
  margin: 4px 16px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--aurora-card);
  border-radius: 999px;
  padding: 9px 16px;
}
.search-placeholder {
  font-size: 13px;
  color: var(--aurora-text2);
}
.category-nav {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding: 0 16px 4px;
  scrollbar-width: none;
}
.category-nav::-webkit-scrollbar {
  display: none;
}
.category-item {
  flex: none;
  font-size: 13px;
  color: var(--aurora-text2);
  background: var(--aurora-card);
  border-radius: 999px;
  padding: 6px 16px;
  transition: all 0.2s;
}
.category-item.active {
  color: #fff;
  font-weight: 600;
  background: linear-gradient(135deg, var(--aurora-accent), var(--aurora-accent2));
}
.section {
  margin-top: 18px;
}
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  margin-bottom: 12px;
}
.section-title {
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
}
.fire,
.new {
  font-size: 15px;
}
.more {
  font-size: 12px;
  color: var(--aurora-text2);
}
.drama-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 0 16px 6px;
  scrollbar-width: none;
}
.drama-scroll::-webkit-scrollbar {
  display: none;
}
.scroll-card {
  flex: none;
  width: 132px;
}
.drama-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 0 16px;
}
.login-mask {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--aurora-text);
  font-size: 14px;
}
</style>
