import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createI18n } from 'vue-i18n'
import zh from './locales/zh.json'
import en from './locales/en.json'

const i18n = createI18n({
  locale: 'zh',
  fallbackLocale: 'en',
  messages: { zh, en }
})

const app = createApp(App)
app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
