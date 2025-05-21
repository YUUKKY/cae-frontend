<template>
  <el-button type="primary" @click="$emit('toggle')">
    {{ active ? $t('cancelMock') : $t('mockData') }}
  </el-button>
</template>
<script setup lang="ts">
defineProps<{ active: boolean }>()
</script>