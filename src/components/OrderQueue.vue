<template>
  <div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <div>
        <el-select v-model="lang" size="small" @change="changeLang" style="width: 100px;">
          <el-option label="中文" value="zh" />
          <el-option label="English" value="en" />
        </el-select>
        <el-button size="small" @click="toggleMock" style="margin-left:10px;">
          {{ isMock ? $t('cancelMock') : $t('mockData') }}
        </el-button>
      </div>
      <el-button size="small" @click="fetchOrders">{{ $t('refresh') }}</el-button>
    </div>
    <el-table
      :data="orders"
      style="width: 100%"
      :default-sort="{prop: 'time', order: 'descending'}"
      @sort-change="handleSort"
      v-loading="loading"
      border
      size="small"
      empty-text="暂无数据"
    >
      <el-table-column prop="orderId" :label="$t('orderId')" width="130"/>
      <el-table-column prop="type" :label="$t('type')" width="80">
        <template #default="{ row }">
          <el-tag :type="row.type === 'buy' ? 'success' : 'danger'">
            {{ row.type === 'buy' ? $t('buy') : $t('sell') }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="price" :label="$t('price')" width="110">
        <template #default="{ row }">
          <span :style="{ color: row.type === 'buy' ? '#67C23A' : '#F56C6C', fontWeight: 'bold' }">
            {{ row.price }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="amount" :label="$t('amount')" width="90"/>
      <el-table-column prop="status" :label="$t('status')" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === 'completed' ? 'success' : 'info'">
            {{ $t(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="time" :label="$t('time')" width="140"/>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getOrderQueue } from '../request/api'

const { locale, t } = useI18n()
const lang = ref(locale.value)
const orders = ref([])
const loading = ref(false)
const timer = ref(null)
const sortProp = ref('time')
const sortOrder = ref('descending')
const isMock = ref(false)

function mockOrderData() {
  // 生成10条模拟订单
  const now = Date.now()
  return Array.from({ length: 10 }).map((_, i) => ({
    orderId: `MOCK${now}${i}`,
    type: Math.random() > 0.5 ? 'buy' : 'sell',
    price: (Math.random() * 10000 + 100).toFixed(2),
    amount: (Math.random() * 5 + 1).toFixed(3),
    status: Math.random() > 0.7 ? 'completed' : 'pending',
    time: new Date(now - i * 60000).toLocaleString()
  }))
}

const fetchOrders = async () => {
  if (isMock.value) {
    orders.value = mockOrderData()
    return
  }
  loading.value = true
  try {
    const resp = await getOrderQueue({
      sortProp: sortProp.value,
      sortOrder: sortOrder.value
    })
    orders.value = resp.data
  } catch (e) {
    // 错误处理
    orders.value = []
  }
  loading.value = false
}

const handleSort = ({ prop, order }) => {
  sortProp.value = prop
  sortOrder.value = order === 'ascending' ? 'asc' : 'desc'
  fetchOrders()
}

const changeLang = (val) => {
  locale.value = val
}

const toggleMock = () => {
  isMock.value = !isMock.value
  fetchOrders()
  if (isMock.value) {
    // 取消定时器
    if (timer.value) clearInterval(timer.value)
  } else {
    // 恢复自动刷新
    timer.value = setInterval(fetchOrders, 5000)
  }
}

// 初始化加载
fetchOrders()
timer.value = setInterval(fetchOrders, 5000)

onUnmounted(() => {
  if (timer.value) clearInterval(timer.value)
})
</script>
