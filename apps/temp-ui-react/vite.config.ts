/// <reference types="vitest" />

import  { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ''); // Loading all env variables for demonstration

  return { plugins: [
    tanstackRouter({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
    viteMockServe({
      // default
      mockPath: env.VITE_MOCKSERVER_PATH || 'mock',
      enable: (env.VITE_MOCKSERVER_ENABLE || '').toLowerCase() === 'true',
    }),
    {
      name: 'Build-Error-Custom',
      enforce: 'post',
      buildEnd(error) {
        if (!error) return;
        console.log('\n' + '='.repeat(60));
        console.log('🚨 BUILD ERROR DETAILS');
        console.log('='.repeat(60));

        if (error.message.includes('imported by')) {
          console.log('Imported by:', error.message.split('imported by')[1].split('?')[0].trim());
        }

        console.log('='.repeat(60) + '\n');
      },
    },
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      // '@/features': resolve(__dirname, './src/features'),
    },
  },
}})
