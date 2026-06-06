import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // Visualizer: generate stats.html saat build
    // Buka file stats.html di browser untuk lihat treemap chunk
    visualizer({
      filename: 'stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
    }),
  ],

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Spline — chunk TERPISAH, tidak dipreload otomatis
          // Akan dimuat hanya ketika SplineScene trigger IntersectionObserver
          if (
            id.includes('@splinetool/react-spline') ||
            id.includes('@splinetool/runtime')
          ) {
            return 'vendor-spline'
          }

          // React core
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react'
          }

          // Framer Motion
          if (id.includes('framer-motion')) {
            return 'vendor-motion'
          }

          // Lucide Icons
          if (id.includes('lucide-react')) {
            return 'vendor-icons'
          }

          // Semua dependency lain
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },

    minify: 'terser',

    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },

    // Naikkan limit warning — spline memang besar, sudah lazy
    chunkSizeWarningLimit: 3000,
    sourcemap: false,
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      // Spline TIDAK dimasukkan di sini agar tidak di-prebundle eager
    ],
  },
}))
