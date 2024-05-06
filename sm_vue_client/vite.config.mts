// Plugins
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import Unfonts from "unplugin-fonts/vite";
import AutoImport from "unplugin-auto-import/vite";
import VueRouter from "unplugin-vue-router/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import Layouts from "vite-plugin-vue-layouts";
// Utilities
import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "node:url";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: "/",
    plugins: [
      VueRouter({
        routesFolder: ["src/views"],
        extensions: [".vue"],
        exclude: ["src/views/**/components/*.vue", "src/views/**/hooks/*.*"],
        dts: "./typed-router.d.ts",
      }),
      Layouts({
        layoutsDirs: "src/layouts",
        defaultLayout: "default",
      }),
      vue({
        template: { transformAssetUrls },
      }),
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
      vuetify({
        autoImport: true,
        styles: {
          configFile: "src/styles/settings.scss",
        },
      }),
      AutoImport({
        dts: true,
        imports: ["vue", "@vueuse/core", "pinia", VueRouterAutoImports],
        vueTemplate: true,
      }),
      Unfonts({
        // Fontsource API
        fontsource: {
          families: [
            {
              /**
               * Name of the font family.
               * Require the `@fontsource/roboto` package to be installed.
               */
              name: "Roboto",
              /**
               * Load only a subset of the font family.
               */
              weights: [400, 700],
              /**
               * Restrict the font styles to load.
               */
              styles: ["italic", "normal"],
              /**
               * Use another font subset.
               */
              // subset: "latin-ext",
            },
          ],
        },
      }),
    ],
    define: { "process.env": {} },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "#": fileURLToPath(new URL("./typings", import.meta.url)),
      },
      extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },
    server: {
      port: Number(env["VITE_PORT"]),
    },
  };
});
