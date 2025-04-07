import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 4203,
    headers: {
      "Access-Control-Allow-Origin": "*", // ✅ add this
    },
  },
  preview: {
    port: 4203,
    headers: {
      "Access-Control-Allow-Origin": "*", // ✅ add this
    },
  },
  plugins: [
    react(),
    federation({
      name: "engineering",
      filename: "assets/remoteEntry.js",
      exposes: {
        "./Home": "./src/home.tsx",
        "./Reports": "./src/reports.tsx",
        "./Notifications": "./src/notifications.tsx",
      },
      // 👇 Enable manifest generation (not required, but nice for tooling)
      manifest: true,
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    target: "esnext",
    modulePreload: false,
    rollupOptions: {
      output: {
        format: "es", // ✅ REQUIRED for ESM-based dynamic remote loading
      },
    },
  },
});
