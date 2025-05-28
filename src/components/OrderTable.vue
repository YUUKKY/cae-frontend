<template>
  <div>
    <div style="margin-bottom: 12px;">
      <MockSwitch :active="mockMode" @toggle="toggleMock" />
    </div>
    <div style="display: flex; gap: 12px; margin-bottom: 16px;">
      <el-select v-model="typeFilter" placeholder="Type" style="width: 120px">
        <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="statusFilter" placeholder="Status" style="width: 120px">
        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <el-table
      :data="pagedOrders"
      style="width: 100%"
      @sort-change="onSortChange"
      :default-sort="{prop: sortProp, order: sortOrder}"
      height="420"
      :empty-text="$t ? $t('emptyText') : 'No data available'"
    >
      <el-table-column prop="id" :label="$t ? $t('orderId') : 'Order ID'" sortable="custom" />
      <el-table-column prop="quantity" :label="$t ? $t('quantity') : 'Quantity'" sortable="custom" />
      <el-table-column prop="price" :label="$t ? $t('price') : 'Price'" sortable="custom" />
      <el-table-column prop="status" :label="$t ? $t('status') : 'Status'" />
      <el-table-column prop="type" :label="$t ? $t('type') : 'Type'" />
    </el-table>
    <div style="margin-top: 16px; text-align: right;">
      <el-pagination
        background
        layout="prev, pager, next, sizes, total"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[5,10,20,50]"
        :total="filteredOrders.length"
        @current-change="val => currentPage = val"
        @size-change="val => { pageSize = val; currentPage = 1 }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import MockSwitch from './MockSwitch.vue'
import { useOrders } from '../composables/useOrders'
import { ref, computed } from 'vue'

const { orders, mockMode, toggleMock, onSortChange, sortProp, sortOrder } = useOrders()

// 筛选条件
const typeFilter = ref('')
const statusFilter = ref('')

// 可选类型和状态
const typeOptions = [
  { label: 'ALL', value: '' },
  { label: 'MOCK', value: 'MOCK' },
  { label: 'AGENT', value: 'agent' },
  { label: 'CUSTOMER', value: 'customer' },
  // 如有更多类型，可继续添加
]
const statusOptions = [
  { label: 'ALL', value: '' },
  { label: 'NEW', value: 'NEW' },
  { label: 'FINISH', value: 'FINISH' },
  // 如有更多状态，可继续添加
]

// 过滤后的订单
const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const typeMatch = !typeFilter.value || order.type === typeFilter.value
    const statusMatch = !statusFilter.value || order.status === statusFilter.value
    return typeMatch && statusMatch
  })
})

// 分页相关
const pageSize = ref(10)
const currentPage = ref(1)
const pagedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredOrders.value.slice(start, end)
})

// 格式化时间戳为 YYYY-MM-DD HH:mm:ss
const formatTime = (timestamp: number | string): string => {
  if (!timestamp) return '';
  const t = Number(timestamp);
  if (!t || isNaN(t)) return '';
  const date = new Date(t);
  if (isNaN(date.getTime())) return '';
  const padZero = (num: number): string => num.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
</script>
