import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      "/server": {
        target: "http://localhost:5020",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/server/, ""),
      },
    },
  },
});
