import { PluginOption, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
const mode = process.env.NODE_ENV
console.log(mode)
const pluginList = () => {
  const plugin: PluginOption[] = [react()]
  //开发环境使用vite-plugin-visualizer插件
  if (mode === 'production') {
    plugin.push(visualizer({ open: true, gzipSize: true }))
  }
  return plugin
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: pluginList(),
  //别名
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  },
  //代理
  server: {
    port: 3000
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  }
})
