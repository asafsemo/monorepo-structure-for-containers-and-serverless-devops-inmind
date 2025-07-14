import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources: any = {};

const locales = import.meta.glob('../locales/*.json', { eager: true });
for (const el of Object.entries(locales)) {
	const filename = el[0].split('/').pop();
	if (!filename?.length) {
		continue;
	}
	const lang = filename.replace('.json', '');

	resources[lang] = (el[1] as any).default;
}

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    // Optional: Define namespaces if you have multiple translation files per language
    interpolation: {
      escapeValue: false,
    },
    resources
  });
