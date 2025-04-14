import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [viteSingleFile()],
  build: {
    rollupOptions: {
      input: "index.html",
    },
    assetsInlineLimit: 100_000, // inline images/fonts up to ~100kb, save server space, enforce this?
  },
});
