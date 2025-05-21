<template>
  <el-tabs style="padding: 24px;">
    <el-tab-pane :label="$t('ordersTab')" name="orders">
      <OrderTable />
    </el-tab-pane>
    <el-tab-pane :label="$t('healthTab')" name="health">
      <HealthStatusTab />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import OrderTable from './components/OrderTable.vue'
import HealthStatusTab from './components/HealthStatusTab.vue'
</script>