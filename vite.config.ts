import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    watch: {
      usePolling: true, // needed for wsl2
    },

    host: true, // needed for the DC port mapping to work
    strictPort: true,
    port: 3000,
  },

  base: "/IS-ITS/",
});
