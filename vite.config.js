import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  base: "/macheon4-loan-calculator/",
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
