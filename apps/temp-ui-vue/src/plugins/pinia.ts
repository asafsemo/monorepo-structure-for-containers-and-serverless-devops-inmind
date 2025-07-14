import type { App } from 'vue';
import { createPinia } from 'pinia';

export const store = createPinia();

export default function (app: App) {
	app.use(store);
}
