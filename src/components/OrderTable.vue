<template>
  <el-table
    :data="displayOrders"
    style="width: 100%"
    @sort-change="onSortChange"
    :default-sort="{prop: 'time', order: 'descending'}"
  >
    <el-table-column prop="id" :label="$t('order.id')" sortable></el-table-column>
    <el-table-column prop="time" :label="$t('order.time')" sortable></el-table-column>
    <el-table-column prop="quantity" :label="$t('order.quantity')" sortable></el-table-column>
    <el-table-column prop="price" :label="$t('order.price')" sortable></el-table-column>
    <el-table-column prop="status" :label="$t('order.status')" sortable></el-table-column>
  </el-table>
</template>

<script setup>
import { inject, computed } from 'vue'

const orders = inject('orders')
const mockActive = inject('mockActive')
const mockOrders = inject('mockOrders')
const sortProp = inject('sortProp')
const sortOrder = inject('sortOrder')

// 支持Mock和真实数据切换
const displayOrders = computed(() => {
  if (mockActive.value) {
    return mockOrders.value
  }
  if (!orders.value) return []
  // 本地排序，服务端已排序可省略
  if (sortProp.value && sortOrder.value) {
    return [...orders.value].sort((a, b) => {
      let valA = a[sortProp.value]
      let valB = b[sortProp.value]
      if (sortProp.value === 'time') {
        valA = new Date(valA)
        valB = new Date(valB)
      }
      if (sortOrder.value === 'ascending') return valA > valB ? 1 : -1
      return valA < valB ? 1 : -1
    })
  }
  return orders.value
})

function onSortChange({ prop, order }) {
  sortProp.value = prop
  sortOrder.value = order
}
</script>