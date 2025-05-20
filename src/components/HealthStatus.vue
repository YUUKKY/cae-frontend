<template>
  <div>
    <el-row>
      <el-col :span="12">
        <span>Provider:</span>
        <el-icon><i class="el-icon-light-bulb" :style="{ color: providerColor }"></i></el-icon>
      </el-col>
      <el-col :span="12">
        <span>Consumer:</span>
        <el-icon><i class="el-icon-light-bulb" :style="{ color: consumerColor }"></i></el-icon>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { checkProvider, checkConsumer } from '../api/health'

const providerFail = ref(0)
const consumerFail = ref(0)
const MAX_YELLOW = 3
const MAX_RED = 5
let timer = null

const getStatusColor = (failCount) => {
  if (failCount >= MAX_RED) return 'red'
  if (failCount >= MAX_YELLOW) return 'yellow'
  return 'green'
}
const providerColor = computed(() => getStatusColor(providerFail.value))
const consumerColor = computed(() => getStatusColor(consumerFail.value))

async function probeOne(checkFn, failRef) {
  let success = false
  for (let i = 0; i < 3; i++) {
    try {
      await checkFn()
      success = true
      failRef.value = 0
      break
    } catch {
      failRef.value++
    }
  }
  if (!success && failRef.value < MAX_RED) failRef.value = MAX_YELLOW
}

async function probe() {
  await probeOne(checkProvider, providerFail)
  await probeOne(checkConsumer, consumerFail)
}

onMounted(() => {
  probe()
  timer = setInterval(probe, 5000)
})
onUnmounted(() => {
  clearInterval(timer)
})
</script>