import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ['./app/shared/styles'],
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'), // указываем на папку app
    },
  },
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
})
