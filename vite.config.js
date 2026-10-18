import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("/react/") || id.includes("/react-dom/") || id.includes("/scheduler/")) {
            return "vendor-react";
          }
          if (id.includes("/react-router") || id.includes("/@remix-run/")) {
            return "vendor-router";
          }
          if (id.includes("/@reduxjs/") || id.includes("/react-redux/") || id.includes("/redux/") || id.includes("/immer/") || id.includes("/reselect/")) {
            return "vendor-redux";
          }
          if (id.includes("/@supabase/")) {
            return "vendor-supabase";
          }
          if (id.includes("/framer-motion/") || id.includes("/motion-dom/") || id.includes("/motion-utils/")) {
            return "vendor-motion";
          }
          if (id.includes("/lucide-react/")) {
            return "vendor-icons";
          }
          if (id.includes("/swiper/") || id.includes("/react-slick/") || id.includes("/slick-carousel/")) {
            return "vendor-carousel";
          }
        },
      },
    },
  },
});
