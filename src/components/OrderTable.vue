<template>
  <div>
    <div style="margin-bottom: 12px;">
      <MockSwitch :active="mockMode" @toggle="toggleMock" />
    </div>
    <el-table
        :data="orders"
        style="width: 100%"
        @sort-change="onSortChange"
        :default-sort="{prop: sortProp, order: sortOrder}"
        height="420"
        :empty-text="$t('emptyText')"
    >
      <el-table-column prop="id" :label="$t('orderId')" sortable="custom"/>
      <el-table-column :label="$t('time')" sortable="custom">
        <template #default="scope">
          {{ formatTime(scope.row.time) }}
        </template>
      </el-table-column>
      <el-table-column prop="quantity" :label="$t('quantity')" sortable="custom"/>
      <el-table-column prop="price" :label="$t('price')" sortable="custom"/>
      <el-table-column prop="status" :label="$t('status')" />
      <el-table-column prop="type" :label="$t('type')" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import MockSwitch from './MockSwitch.vue'
import { useOrders } from '../composables/useOrders'

const { orders, mockMode, toggleMock, onSortChange, sortProp, sortOrder } = useOrders()

// 格式化时间戳为 YYYY-MM-DD HH:mm:ss
const formatTime = (timestamp: number): string => {
  if (!timestamp) return ''

  const date = new Date(timestamp)

  // 补零函数
  const padZero = (num: number): string => {
    return num.toString().padStart(2, '0')
  }

  // 提取年、月、日、时、分、秒
  const year = date.getFullYear()
  const month = padZero(date.getMonth() + 1) // 月份从0开始
  const day = padZero(date.getDate())
  const hours = padZero(date.getHours())
  const minutes = padZero(date.getMinutes())
  const seconds = padZero(date.getSeconds())

  // 组合成目标格式
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
</script>