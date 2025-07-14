import type { App } from 'vue';
import { createI18n } from 'vue-i18n';

const messages: Record<string, any> = {};

// Dynamically import all default exports from plugins folder and call them with app
const locales = import.meta.glob('../locales/*.json', { eager: true });

for (const el of Object.entries(locales)) {
	const filename = el[0].split('/').pop();
	if (!filename?.length) {
		continue;
	}
	const lang = filename.replace('.json', '');

	messages[lang] = (el[1] as any).default;
}

const i18n = createI18n({
	legacy: false,
	locale: 'en',
	fallbackLocale: 'en',
	messages,
});

export default function (app: App) {
	app.use(i18n);
}
