/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: "tests-setup.ts",
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
