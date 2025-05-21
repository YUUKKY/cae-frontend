import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

const mockData = [
  { id: '100001', time: '2025-05-20 17:00:00', quantity: 10, price: 100.5, status: 'NEW' },
  { id: '100002', time: '2025-05-20 17:00:01', quantity: 5, price: 101, status: 'FILLED' },
  { id: '100003', time: '2025-05-20 17:00:02', quantity: 7, price: 99.8, status: 'PARTIAL' },
  { id: '100004', time: '2025-05-20 17:00:03', quantity: 12, price: 100.9, status: 'CANCELLED' }
]

export function useOrders() {
  const orders = ref<any[]>([])
  const mockMode = ref(false)
  const interval = ref<any>(null)
  const sortProp = ref('time')
  const sortOrder = ref('descending')

  const fetchOrders = async () => {
    if (mockMode.value) {
      orders.value = [...mockData]
    } else {
      try {
        const res = await axios.get('/v1/orders')
        orders.value = res.data
      } catch {
        orders.value = []
      }
    }
    sortOrders()
  }

  const sortOrders = () => {
    if (!sortProp.value) return
    orders.value = [...orders.value].sort((a, b) => {
      if (sortOrder.value === 'ascending') return a[sortProp.value] > b[sortProp.value] ? 1 : -1
      else return a[sortProp.value] < b[sortProp.value] ? 1 : -1
    })
  }

  const onSortChange = ({ prop, order }: { prop: string; order: string }) => {
    sortProp.value = prop
    sortOrder.value = order
    sortOrders()
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

  return { orders, mockMode, toggleMock, onSortChange, sortProp, sortOrder }
}