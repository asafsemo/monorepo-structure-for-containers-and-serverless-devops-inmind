/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteMockServe } from 'vite-plugin-mock';
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { resolve } from 'node:path'
// import AutoImport from 'unplugin-auto-import/vite';
// import Components from 'unplugin-react-components/vite'; // Note: This is unplugin-react-components, not unplugin-vue-components

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ''); // Loading all env variables for demonstration

  return { plugins: [
    tanstackRouter({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
    // AutoImport({
    //   // Configuration for auto-importing React hooks, other APIs, etc.
    //   imports: ['react', 'react-router-dom'], // Example: auto-import useState, useEffect, etc.
    //   dts: './auto-imports.d.ts', // Path to generate the declaration file
    //   eslintrc: {
    //     enabled: true, // Enable ESLint integration for auto-imports
    //   },
    // }),
    // Components({
    //   // Configuration for auto-importing React components
    //   dirs: ['src/components'], // Directories to scan for components
    //   extensions: ['jsx', 'tsx'], // File extensions to consider
    //   dts: './components.d.ts', // Path to generate the declaration file
    //   // Optional: resolvers for UI libraries (e.g., Ant Design, Material UI)
    //   // resolvers: [
    //   //   AntdResolver(),
    //   //   MuiResolver(),
    //   // ],
    // }),
    viteMockServe({
      // default
      mockPath: env.VITE_MOCKSERVER_PATH || 'mock',
      enable: (env.VITE_MOCKSERVER_ENABLE || '').toLowerCase() === 'true',
    }),

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
}})
