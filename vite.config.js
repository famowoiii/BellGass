import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import envCompatoble from "vite-plugin-env-compatible";
export default defineConfig({
  plugins: [react(), envCompatoble()],
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
  },
});
