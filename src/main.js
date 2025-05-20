import { createApp, ref, provide } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { fetchOrders } from './api/orders'

const app = createApp({
  setup() {
    // 提供全局状态
    const orders = ref([])
    const mockActive = ref(false)
    const sortProp = ref('time')
    const sortOrder = ref('descending')
    const mockOrders = ref([
      { id: '1001', time: '2025-05-20 09:00', quantity: 10, price: 100, status: 'FILLED' },
      { id: '1002', time: '2025-05-20 09:01', quantity: 5, price: 101, status: 'OPEN' },
      { id: '1003', time: '2025-05-20 09:02', quantity: 8, price: 99, status: 'CANCELED' },
      { id: '1004', time: '2025-05-20 09:03', quantity: 20, price: 102, status: 'OPEN' }
    ])

    provide('orders', orders)
    provide('mockActive', mockActive)
    provide('mockOrders', mockOrders)
    provide('sortProp', sortProp)
    provide('sortOrder', sortOrder)

    // 轮询真实订单，仅在非mock时
    let timer = null
    async function loadOrders() {
      if (!mockActive.value) {
        try {
          orders.value = await fetchOrders()
        } catch (e) {
          // 可加错误提示
        }
      }
    }
    loadOrders()
    timer = setInterval(loadOrders, 3000)
    // 清理
    app.unmounted = () => clearInterval(timer)
  },
  render: () => h(App)
})

app.use(i18n).use(ElementPlus).mount('#app')