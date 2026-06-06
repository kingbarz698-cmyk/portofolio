import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    // Chunk splitting — vendor libs di-cache browser terpisah dari app code
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-spline': ['@splinetool/react-spline', '@splinetool/runtime'],
          'vendor-icons':  ['lucide-react'],
        },
      },
    },
    // Aktifkan minify & compression
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true },
    },
    // Chunk size warning threshold
    chunkSizeWarningLimit: 600,
    // Source maps untuk debugging (nonaktifkan di prod jika mau)
    sourcemap: false,
  },

  // Preload/prefetch directives otomatis
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
})
