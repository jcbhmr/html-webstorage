import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  root: "src",
  build: {
    target: "esnext",
  },
  plugins: [
    // https://vite-pwa-org.netlify.app/guide/service-worker-without-pwa-capabilities.html#plugin-configuration
    VitePWA({
      srcDir: "src",
      filename: "service-worker.js",
      strategies: "injectManifest",
      injectRegister: false,
      manifest: false,
      injectManifest: {
        // @ts-ignore
        injectionPoint: null,
      },
    }),
  ],
});
