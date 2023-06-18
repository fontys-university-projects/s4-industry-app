import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

import icons from './public/icons.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    VitePWA({ 
      registerType: 'autoUpdate',
      manifest: {
        name: "industry",
        short_name: "industry",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        lang: "en",
        scope: "/",
        theme_color: "#a4907c",
        dir: "ltr",
        icons,
        offline_page: "/offline",
        categories: [
          "education",
          "travel"
        ]
      }
    })
  ],
  build: {
    manifest: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
