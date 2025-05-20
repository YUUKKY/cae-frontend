<template>
  <el-tabs>
    <el-tab-pane :label="$t('orderList')">
      <OrderTable />
      <MockButton />
    </el-tab-pane>
    <el-tab-pane :label="$t('healthCheck')">
      <HealthStatus />
    </el-tab-pane>
  </el-tabs>
</template>
<script setup>
import OrderTable from '../components/OrderTable.vue'
import MockButton from '../components/MockButton.vue'
import HealthStatus from '../components/HealthStatus.vue'
</script>