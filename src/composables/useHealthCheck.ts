import { reactive, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

type Status = 'green' | 'yellow' | 'red'

export function useHealthCheck() {
  const status = reactive<{ provider: Status; consumer: Status }>({ provider: 'yellow', consumer: 'yellow' })
  const statusText = { green: 'alive', yellow: 'warning', red: 'dead' }
  const errorCount = { provider: 0, consumer: 0 }
  let timer: any

  const getColor = (s: Status) => (s === 'green' ? 'green' : s === 'yellow' ? 'gold' : 'red')

  const check = async (service: 'provider' | 'consumer') => {
    let ok = false
    for (let i = 0; i < 3; i++) {
      try {
        const res = await axios.get(`/v1/health/${service}`)
        if (res.status === 200) {
          ok = true
          break
        }
      } catch {
        // ignore
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