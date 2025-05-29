import { reactive, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

type Status = 'green' | 'yellow' | 'red'

const PROVIDER_BASE_URL = 'http://cae.demo.huawei.com/v1/producer/health'
const CONSUMER_BASE_URL = 'http://cae.demo.huawei.com/v1/consumer/health'

const statusText = { green: 'alive', yellow: 'warning', red: 'dead' }

export function useHealthCheck() {
  const status = reactive<{ provider: Status; consumer: Status }>({ provider: 'yellow', consumer: 'yellow' })
  const errorCount = { provider: 0, consumer: 0 }
  let timer: any

  const getColor = (s: Status) => (s === 'green' ? 'green' : s === 'yellow' ? 'gold' : 'red')

  const getBaseUrl = (service: 'provider' | 'consumer') =>
      service === 'provider' ? PROVIDER_BASE_URL : CONSUMER_BASE_URL

  const check = async (service: 'provider' | 'consumer') => {
    let ok = false
    const baseUrl = getBaseUrl(service)
    for (let i = 0; i < 3; i++) {
      try {
        const res = await axios.get(`${baseUrl}`, { validateStatus: () => true })
        if (res.status === 200) {
          ok = true
          break
        }
      } catch {
        // 网络异常等，视为失败
      }
    }
    if (ok) {
      errorCount[service] = 0
      status[service] = 'green'
    } else {
      errorCount[service]++
      if (errorCount[service] >= 5) status[service] = 'red'
      else status[service] = 'yellow'
    }
  }

  const poll = async () => {
    await Promise.all([check('provider'), check('consumer')])
  }

  onMounted(() => {
    poll()
    timer = setInterval(poll, 3000)
  })
  onUnmounted(() => clearInterval(timer))

  return { status, statusText, getColor }
}
