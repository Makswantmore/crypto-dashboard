import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // ВАЖНО: эта строка говорит Vite, что сайт лежит в папке с именем репозитория
  base: '/crypto-dashboard/', 
})