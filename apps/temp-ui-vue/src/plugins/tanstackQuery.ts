import type { App } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';

export default function (app: App) {
	app.use(VueQueryPlugin);
}
