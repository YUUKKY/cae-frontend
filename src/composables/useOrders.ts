import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

const PROVIDER_BASE_URL = 'http://cae.demo.huawei.com'
const mockData = [
  { id: '100001', time: '2025-05-20 17:00:00', quantity: 10, price: 100.5, status: 'NEW', type: 'MOCK' },
  { id: '100002', time: '2025-05-20 17:00:01', quantity: 5, price: 101, status: 'FILLED', type: 'MOCK'},
  { id: '100003', time: '2025-05-20 17:00:02', quantity: 7, price: 99.8, status: 'PARTIAL', type: 'MOCK' },
  { id: '100004', time: '2025-05-20 17:00:03', quantity: 12, price: 100.9, status: 'CANCELLED', type: 'MOCK' }
]

export function useOrders() {
  const orders = ref<any[]>([])
  const mockMode = ref(false)
  const interval = ref<any>(null)

  const fetchOrders = async () => {
    if (mockMode.value) {
      orders.value = [...mockData]
    } else {
      try {
        const res = await axios.get(`${PROVIDER_BASE_URL}/v1/orders`)
        orders.value = res.data
      } catch {
        orders.value = []
      }
    }
    // 不再做排序，直接用接口返回顺序
  }

  const toggleMock = () => {
    mockMode.value = !mockMode.value
    fetchOrders()
  }

  const startPolling = () => {
    fetchOrders()
    interval.value = setInterval(fetchOrders, 2000)
  }

  const stopPolling = () => {
    clearInterval(interval.value)
  }

  onMounted(startPolling)
  onUnmounted(stopPolling)

  return { orders, mockMode, toggleMock }
}
