<template>
  <div class="health-topology-container">
    <svg width="350" height="120">
      <!-- Provider节点 -->
      <circle :fill="getColor(status.provider)" cx="70" cy="60" r="30" />
      <text x="70" y="60" text-anchor="middle" dominant-baseline="middle" fill="#fff" font-size="14">
        {{ $t('provider') }}
      </text>
      <!-- 箭头连线 -->
      <line x1="100" y1="60" x2="180" y2="60" stroke="#999" stroke-width="3" marker-end="url(#arrowhead)" />
      <!-- Consumer节点 -->
      <circle :fill="getColor(status.consumer)" cx="250" cy="60" r="30" />
      <text x="250" y="60" text-anchor="middle" dominant-baseline="middle" fill="#fff" font-size="14">
        {{ $t('consumer') }}
      </text>
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#999" />
        </marker>
      </defs>
    </svg>
    <div class="legend">
      <span class="legend-item">
        <span class="legend-dot" style="background:green"></span>{{ $t('alive') }}
      </span>
      <span class="legend-item">
        <span class="legend-dot" style="background:gold"></span>{{ $t('warning') }}
      </span>
      <span class="legend-item">
        <span class="legend-dot" style="background:red"></span>{{ $t('dead') }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHealthCheck } from '../composables/useHealthCheck'
const { status, getColor } = useHealthCheck()
</script>

<style scoped>
.health-topology-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
}
.legend {
  margin-top: 18px;
  display: flex;
  gap: 18px;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
}
.legend-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: inline-block;
  border: 1.5px solid #ddd;
}
</style>