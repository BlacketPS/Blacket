import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "src/styles"),
      "@components": path.resolve(__dirname, "src/components"),
      "@stores": path.resolve(__dirname, "src/stores"),
      "@managers": path.resolve(__dirname, "src/managers")
    }
  },
  css: {
    modules: {
      scopeBehaviour: "local",
      localsConvention: "camelCaseOnly",
      generateScopedName: "styles__[local]___[hash:base64:5]&camelCase",
    },
  },
  build: {
    target: "es2022",
    outDir: "../public",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) return "vendor";
          else return "main";
        },
        chunkFileNames: "[name].[hash].js",
        entryFileNames: "[name].[hash].js",
        assetFileNames: "[name].[hash].[ext]",
      },
    },
    chunkSizeWarningLimit: 1000,
    manifest: true,
    minify: "terser",
    terserOptions: {
      format: {
        comments: false,
      },
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        toplevel: true,
        unsafe: true,
        drop_console: true,
        unsafe_comps: true,
        passes: 2
      },
      module: true,
    },
  },
});