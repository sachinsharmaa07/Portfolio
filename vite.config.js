import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@react-three/drei')) {
            return 'vendor-drei'
          }
          if (id.includes('@react-three/fiber')) {
            return 'vendor-r3f'
          }
          if (id.includes('/three/')) {
            return 'vendor-three-core'
          }
          if (id.includes('/framer-motion/')) {
            return 'vendor-motion'
          }
          if (id.includes('/react-icons/')) {
            return 'vendor-icons'
          }
          if (id.includes('/react/') || id.includes('/react-dom/')) {
            return 'vendor-react'
          }
        },
      },
    },
  },
})
