import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zh from './locales/zh.json'

const i18n = createI18n({
  locale: 'zh', // 默认中文，可切换
  fallbackLocale: 'en',
  messages: { en, zh }
})

const app = createApp(App)
app.use(ElementPlus)
app.use(i18n)

app.mount('#app')