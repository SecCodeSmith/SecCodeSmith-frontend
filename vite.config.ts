/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@":            path.resolve(__dirname, "/src"),
      '@assets':      path.resolve(__dirname, '/src/assets'),
      '@components':  path.resolve(__dirname, '/src/components'),
      '@pages':       path.resolve(__dirname, '/src/pages'),
      '@data':        path.resolve(__dirname, '/src/data'),
      '@styles':      path.resolve(__dirname, '/src/assets/styles'),
      '@public':      path.resolve(__dirname, '/src/public'),
      '@tests':       path.resolve(__dirname, '/src/tests'),
      '@images':      path.resolve(__dirname, '/src/assets/images'),
    }
  },

  plugins: [
    react(),
  ],

  publicDir: 'public',

  build: {
    target: ['es2022', 'chrome100', 'firefox100', 'safari15']
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    testTimeout: 10000,
  },
})
