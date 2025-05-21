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
      <el-table-column prop="time" :label="$t('time')" sortable="custom"/>
      <el-table-column prop="quantity" :label="$t('quantity')" sortable="custom"/>
      <el-table-column prop="price" :label="$t('price')" sortable="custom"/>
      <el-table-column prop="status" :label="$t('status')" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import MockSwitch from './MockSwitch.vue'
import { useOrders } from '../composables/useOrders'

const { orders, mockMode, toggleMock, onSortChange, sortProp, sortOrder } = useOrders()
</script>