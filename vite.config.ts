import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Markdown from 'vite-plugin-vue-markdown'
import DefineOptions from 'unplugin-vue-define-options/vite'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // example : additionalData: `@import "./src/design/styles/variables";`
        // dont need include file extend .scss
        // additionalData: `@import "src/assets/scss/style"`
      },
    },
  },
  plugins: [
    Vue(),
    Pages({ extensions: ['vue', 'md'] }),
    Layouts(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/head', '@vueuse/core', 'pinia'],
      resolvers: [ElementPlusResolver()],
      vueTemplate: true,
      dirs: [
        'src/composables',
        'src/store',
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      extensions: ['vue', 'md'],
      dirs: ['src/components'],
      resolvers: [ElementPlusResolver()],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
    }),
    Markdown({
      wrapperClasses: 'prose prose-sm m-auto text-left',
      headEnabled: true,
    }),
    DefineOptions(),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
})
