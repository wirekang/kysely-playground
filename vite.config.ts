import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"

export default defineConfig({
  plugins: [react()],
  base: "/kysely-playground",
  build: {
    sourcemap: false,
    rollupOptions: {
      cache: false,
    },
  },
  resolve: {
    alias: {
      src: resolve("src/"),
    },
  },
})
