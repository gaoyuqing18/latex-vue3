import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8888,
    proxy: {
      '/resetwork': {
        target: 'http://115.171.56.195:8002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/resetwork/, '')
      },
    }
  },
})
