<template>
  <el-button @click="toggleMock" style="margin: 10px 0">
    {{ mockActive ? $t('mock.cancel') : $t('mock.start') }}
  </el-button>
</template>

<script setup>
import { inject } from 'vue'
const mockActive = inject('mockActive')

function toggleMock() {
  mockActive.value = !mockActive.value
}
</script>