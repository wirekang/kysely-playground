import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/kysely-playground",
  plugins: [visualizer()],
});
