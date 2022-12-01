import { URL, fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Markdown from "vite-plugin-vue-markdown";
import DefineOptions from "unplugin-vue-define-options/vite";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(),'')
  console.log('Server ' + env.HTTPS_SERVER + ' expression ' + env.HTTPS_SERVER == 'true')
  let httpsConfig = false as any

  if (env.HTTPS_SERVER == 'true') {
    console.log('valid 1')
    httpsConfig = {
      key: fs.readFileSync('./.cert/localhost-key.pem'),
      cert: fs.readFileSync('./.cert/localhost.pem')
    }
  }

  if (!(env.HTTPS_SERVER == 'true')) {
    console.log('valid 2')
    httpsConfig = false
  }
  
  // const serverConfig = env.HTTPS_SERVER == 'true' ? {
  //   key: fs.readFileSync('./.cert/localhost-key.pem'),
  //   cert: fs.readFileSync('./.cert/localhost.pem')
  // } : false;

  //console.log('Server Config' + JSON.stringify(serverConfig) + ' ' + typeof serverConfig)

  return {
    server: {
      https: httpsConfig
    },
    css: {
      preprocessorOptions: {
        scss: {
          //additionalData: `@use "@/assets/scss/element/index.scss" as *;`,
          // example : additionalData: `@import "./src/design/styles/variables";`
          // dont need include file extend .scss
          // additionalData: `@import "src/assets/scss/element/index.scss";`
        },
        dirs: ["src/assets/scss/element"],
      },
    },
    plugins: [
      Vue(),
      Pages({
        extendRoute(route, parent) {
          return route;
          // if (route.path === '/' || route.name == 'not-authorized') {
          //  return route
          // }
          // return {
          //   ...route,
          //   meta: { requiresAuth: true, title: route.name },
          // }
        },
        extensions: ["vue", "md"],
      }),
      Layouts(),
      AutoImport({
        imports: ["vue", "vue-router", "@vueuse/head", "@vueuse/core", "pinia"],
        resolvers: [ElementPlusResolver()],
        vueTemplate: true,
        dirs: ["src/composables", "src/store"],
        dts: "src/auto-imports.d.ts",
      }),
      Components({
        extensions: ["vue", "md"],
        dirs: ["src/components"],
        resolvers: [ElementPlusResolver()],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: "src/components.d.ts",
      }),
      Markdown({
        wrapperClasses: "prose prose-sm m-auto text-left",
        headEnabled: true,
      }),
      DefineOptions(),
    ],
    define: { "process.env": {} },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      chunkSizeWarningLimit: 5000,
    },
  };
});
