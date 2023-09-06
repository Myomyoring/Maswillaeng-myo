import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // optimizeDeps: {
  //   esbuildOptions: {
  //     target: 'es2020',
  //   },
  // },
  // esbuild: {
  //   // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
  //   logOverride: { 'this-is-undefined-in-esm': 'silent' },
  // },

  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-macros', 'babel-plugin-styled-components'],
      },
    },
  )],
  // port change
  server: {
    port: 3000,
      proxy: {
        '/api': "http://localhost:8080",
      }
  },
})
