import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "",
  build: {
    outDir: "../www",     // 👉 manda el build a la carpeta Cordova
    emptyOutDir: true,    // 👉 limpia www antes de copiar
  },
});