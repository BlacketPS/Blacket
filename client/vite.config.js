import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      scopeBehaviour: "local",
      localsConvention: "camelCaseOnly",
      generateScopedName: "[name]__[local]___[hash:base64:5]&camelCase",
    },
  },
  build: {
    inlineDynamicImports: true,
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