import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true, // needed for wsl2
    },

    host: true, // needed for the DC port mapping to work
    strictPort: true,
    port: 8080,
  },

  preview: {
    port: 8080,
    strictPort: true,
  },

  plugins: [react()],
});
