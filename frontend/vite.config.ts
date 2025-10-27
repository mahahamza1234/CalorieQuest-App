import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5137,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
      },
    },
  },
  define: {
    'process.env.VITE_API_BASE_URL': JSON.stringify(
      mode === 'production'
        ? process.env.VITE_API_BASE_URL
        : 'http://127.0.0.1:5000'
    ),
  },
  preview: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: ["caloriequest-app.onrender.com"],
  },
  plugins: [
    dyadComponentTagger(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
