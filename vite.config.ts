import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [visualizer()],
  build: {
    sourcemap: false,
    rollupOptions: {
      cache: false,
    },
  },
});
