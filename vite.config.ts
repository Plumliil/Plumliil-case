import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// import reactRefresh from "@vitejs/plugin-react-refresh";
// vite-plugiyarn an-mock 报错解决
// if (typeof required==='undefined'||!require.cache) {
//   return;
// }
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        math: "always",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        // target: "https://api.thecatapi.com",
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // 不可以省略rewrite
      },
      '/vueMicro/': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
      '/reactMicro/': {
        target: 'http://localhost:3003',
        changeOrigin: true,
      },
    },
  },
});
