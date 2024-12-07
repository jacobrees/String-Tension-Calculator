import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": "/src", // This sets '@' to resolve to the 'src' folder
    },
  },
  plugins: [vue()],
});
