import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' // Import svgr

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr() // Add svgr plugin
  ],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/, // 正則表達式，匹配 src 目錄下的 .js 和 .jsx 檔案
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})
