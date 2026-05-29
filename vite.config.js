import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Dòng này bắt buộc phải có để định nghĩa ký tự @ là thư mục src
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
