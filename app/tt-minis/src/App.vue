<template>
  <div class="app-shell">
    <router-view v-slot="{ Component }">
      <keep-alive include="Home">
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <van-tabbar
      v-if="showTabbar"
      route
      fixed
      active-color="#ff3b5c"
      inactive-color="#9a9aad"
      class="tabbar"
    >
      <van-tabbar-item to="/" icon="fire-o">首页</van-tabbar-item>
      <van-tabbar-item to="/search" icon="search">找剧</van-tabbar-item>
      <van-tabbar-item to="/profile" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
// 播放页全屏沉浸，不显示底部 Tab
const showTabbar = computed(() => !route.path.startsWith('/player'))
</script>

<style scoped>
.app-shell {
  min-height: 100%;
  background: var(--aurora-bg);
  padding-bottom: 60px;
}
.tabbar {
  background: #1b1b26;
}
</style>
