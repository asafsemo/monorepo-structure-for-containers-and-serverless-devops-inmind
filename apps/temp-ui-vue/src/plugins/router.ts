/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import type { App } from 'vue';

import { createRouter, createWebHistory } from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';
import { routes } from 'vue-router/auto-routes';

export default function (app: App) {
	routes.push({
		path: '/',
		redirect: '/projects',
	});

	const router = createRouter({
		history: createWebHistory(import.meta.env.BASE_URL),
		routes: setupLayouts(routes),
	});

	// Workaround for https://github.com/vitejs/vite/issues/11804
	router.onError((err, to) => {
		if (!err?.message?.includes?.('Failed to fetch dynamically imported module')) {
			console.error(err);
			return;
		}

		if (localStorage.getItem('vuetify:dynamic-reload')) {
			console.error('Dynamic import error, reloading page did not fix it', err);
			return;
		}

		console.log('Reloading page to fix dynamic import error');
		localStorage.setItem('vuetify:dynamic-reload', 'true');
		location.assign(to.fullPath);
	});

	router.isReady().then(() => {
		localStorage.removeItem('vuetify:dynamic-reload');
		app.mount('#app');
	});

	app.use(router);
}
