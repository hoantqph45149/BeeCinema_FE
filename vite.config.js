import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // Sửa base thành "/"
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
