import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react-vendor"; // Nhóm React thành 1 file riêng
            if (id.includes("lodash")) return "lodash"; // Nhóm lodash riêng
            return "vendor"; // Nhóm các thư viện khác
          }
        },
      },
    },
    minify: "terser", // Dùng terser để nén file
    terserOptions: {
      compress: {
        drop_console: true, // Xóa console.log khi build
        drop_debugger: true,
      },
    },
    chunkSizeWarningLimit: 1000, // Tăng giới hạn cảnh báo chunk lên 1000kB
  },
});
