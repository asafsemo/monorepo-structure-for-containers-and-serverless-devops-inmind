/// <reference types="vitest" />
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// @ts-ignore - TanStackRouterVite is deprecated but still functional
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
    // AutoImport({
    //   imports: [
    //     'vue',
    //     {
    //       'vue-router/auto': ['useRoute', 'useRouter'],
    //     },
    //     '@vueuse/core',
    //   ],
    //   dts: 'src/auto-imports.d.ts',
    //   eslintrc: {
    //     enabled: true,
    //   },
    //   vueTemplate: true,
    //   ignore: ['useCookies', 'useStorage'],
    // }),
    // Components({
    //   dirs: ['src/components'],
    //   dts: 'src/components.d.ts',
    // }),
    // viteMockServe({
    //   // default
    //   mockPath: env.VITE_MOCKSERVER_PATH || 'mock',
    //   enable: (env.VITE_MOCKSERVER_ENABLE || '').toLowerCase() === 'true',
    // }),

  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
