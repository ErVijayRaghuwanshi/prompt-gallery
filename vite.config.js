import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  base: "/prompt-gallery/", // 👈 repo name
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt", "offline.html"],
      manifest: {
        name: "Prompt Gallery",
        short_name: "PromptGallery",
        theme_color: "#0f172a",
        background_color: "#f1f5f9",
        display: "standalone",
        start_url: "/prompt-gallery/",
        scope: "/prompt-gallery/",
        icons: [
          { src: "/prompt-gallery/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "/prompt-gallery/pwa-512.png", sizes: "512x512", type: "image/png" },
        ],
      },
      workbox: {
        navigateFallback: "/prompt-gallery/offline.html",
      },
    }),
  ],
})
