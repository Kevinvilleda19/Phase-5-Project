import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // Ensures Vite recognizes .glb, .gltf, .webp, .png, and .jpg files as assets
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.webp', '**/*.png', '**/*.jpg'],

  // Sets base path to ensure relative paths in production
  base: './',

  build: {
    // Rollup options to create separate vendor chunks
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },

    // Increases chunk size warning threshold to avoid warnings for larger chunks
    chunkSizeWarningLimit: 1500,
  },
})
