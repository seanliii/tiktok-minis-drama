import DefaultTheme from 'vitepress/theme'
import Giscus from './Giscus.vue'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Giscus', Giscus)
  },
} satisfies Theme
