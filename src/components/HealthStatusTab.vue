<template>
  <el-row :gutter="24" style="margin-top: 24px;">
    <el-col :span="12">
      <div style="display:flex;align-items:center;gap:10px">
        <span>{{ $t('provider') }}</span>
        <el-icon :color="getColor(status.provider)" size="24"><i class="el-icon-lightbulb-solid"></i></el-icon>
        <span>{{ $t(statusText[status.provider]) }}</span>
      </div>
    </el-col>
    <el-col :span="12">
      <div style="display:flex;align-items:center;gap:10px">
        <span>{{ $t('consumer') }}</span>
        <el-icon :color="getColor(status.consumer)" size="24"><i class="el-icon-lightbulb-solid"></i></el-icon>
        <span>{{ $t(statusText[status.consumer]) }}</span>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useHealthCheck } from '../composables/useHealthCheck'
const { status, statusText, getColor } = useHealthCheck()
</script>