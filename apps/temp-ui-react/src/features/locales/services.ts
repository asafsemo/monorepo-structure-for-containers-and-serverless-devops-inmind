import i18n, { type Resource } from "i18next";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { initReactI18next, useTranslation } from "react-i18next";

const LANGUAGE_STORAGE_KEY = "preferred-language";

const resources: Resource = {};

let initLang = import.meta.env.VITE_DEFAULT_LANGUAGE || null;
const locales = import.meta.glob("./languages/*.json", { eager: true });

for (const el of Object.entries(locales)) {
	const filename = el[0].split("/").pop();
	if (!filename?.length) {
		continue;
	}
	const lang = filename.replace(".json", "");
	initLang = initLang || lang;

	resources[lang] = (el[1] as any).default;
}

// Get initial language from localStorage or default to 'en'
const getInitialLanguage = (): string => {
	try {
		// todo: I would like to work with atoms here
		const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
		const savedLanguageWithoutQuotes =
			savedLanguage?.replaceAll('"', "").replaceAll("'", "") || initLang;
		if (
			savedLanguage &&
			Object.keys(resources).includes(savedLanguageWithoutQuotes)
		) {
			return savedLanguageWithoutQuotes;
		}
	} catch (error) {
		console.warn("Failed to load language from localStorage:", error);
	}
	return initLang!;
};

if (initLang) {
	i18n.use(initReactI18next).init({
		lng: getInitialLanguage(),
		fallbackLng: import.meta.env.VITE_DEFAULT_LANGUAGE || resources[initLang],
		// Optional: Define namespaces if you have multiple translation files per language
		interpolation: {
			escapeValue: false,
		},
		resources,
	});
}

const $isLoadingAtom = atom(false);
const $currentLanguageCodeAtom = atomWithStorage<string>(
	LANGUAGE_STORAGE_KEY,
	Object.keys(resources)[initLang],
	undefined,
	{
		getOnInit: true,
	},
);
const $availableLanguagesAtom = atom<{ code: string; label: string }[]>([]);

export const useLanguageManager = () => {
	const [isLoading, setIsLoading] = useAtom($isLoadingAtom);
	const [availableLanguages, setAvailableLanguages] = useAtom(
		$availableLanguagesAtom,
	);
	const [currentLanguageCode, setCurrentLanguageCode] = useAtom(
		$currentLanguageCodeAtom,
	);

	if (!availableLanguages?.length) {
		setAvailableLanguages([
			...Object.keys(resources).map((key) => ({
				code: key,
				label:
					(resources[key]?.translation as any)?.features?.locales?.languageSelector
						?.label || key,
			})),
		]);
	}

	if (!currentLanguageCode) {
		console.log("🚀 ~ changeLanguage ~ language:---1111", initLang)
		setCurrentLanguageCode(initLang!);
	}

	const changeLanguage = async (language: string) => {
		console.log("🚀 ~ changeLanguage ~ language:----2222", language)
		setIsLoading(true);
		await i18n.changeLanguage(language);
		setCurrentLanguageCode(language);
		setIsLoading(false);
	};

	return {
		isLoading,
		changeLanguage,
		currentLanguageCode,
		availableLanguages,
	};
};

export const t = (key: string, defValue: string, values?: Record<string, any>) => {
	return useTranslation().t(key, defValue, values);
}
	
