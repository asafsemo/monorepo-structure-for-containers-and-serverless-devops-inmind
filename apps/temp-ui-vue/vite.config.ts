import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import VueRouter from 'unplugin-vue-router/vite';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import { viteMockServe } from 'vite-plugin-mock';
import Layouts from 'vite-plugin-vue-layouts';

// import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), ''); // Loading all env variables for demonstration

	return {
		server: {
			// port: 3000,
			// proxy:
		},
		plugins: [
			VueRouter({
				dts: 'src/typed-router.d.ts',
			}),

			vue(),

			Layouts(),

			AutoImport({
				imports: [
					'vue',
					{
						'vue-router/auto': ['useRoute', 'useRouter'],
					},
					'@vueuse/core',
				],
				dts: 'src/auto-imports.d.ts',
				eslintrc: {
					enabled: true,
				},
				vueTemplate: true,
				ignore: ['useCookies', 'useStorage'],
			}),

			Components({
				dirs: ['src/components'],
				dts: 'src/components.d.ts',
			}),

			tailwindcss(),

			checker({
				vueTsc: {
					tsconfigPath: './tsconfig.app.json', // Adjust path as needed
				},
			}),

			viteMockServe({
				// default
				mockPath: env.VITE_MOCKSERVER_PATH || 'mock',
				enable: (env.VITE_MOCKSERVER_ENABLE || '').toLowerCase() === 'true',
			}),

			// visualizer(),
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
	};
});
