import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import tailwindcss from '@tailwindcss/vite'
import path from "path";
import { fileURLToPath } from "url";

// __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), vue(),tailwindcss()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "NeuctraAuthixUIComponents",
      fileName: (format) => `neuctra-authix-ui-components.${format}.js`,
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: ["react", "react-dom", "vue"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          vue: "Vue"
        }
      }
    }
  }
});
