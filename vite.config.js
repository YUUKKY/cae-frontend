import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      // 代理API到本地后端服务，实际可按需修改
      '/v1': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})