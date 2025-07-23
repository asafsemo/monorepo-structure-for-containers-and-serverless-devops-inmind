import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { createContext, useContext, useEffect } from "react";

export type Theme = "dark" | "light" | "system";

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
	theme: "system",
	setTheme: () => null,
};

const $themeAtom = atomWithStorage<Theme>("app-theme", "system", undefined, {
	getOnInit: true,
});

export const ThemeProviderContext =
	createContext<ThemeProviderState>(initialState);

export function useThemeProvider() {
	const [theme, setTheme] = useAtom($themeAtom);

	useEffect(() => {
		const root = window.document.documentElement;

		root.classList.remove("light", "dark");

		if (theme === "system") {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
				.matches
				? "dark"
				: "light";

			root.classList.add(systemTheme);
			return;
		}

		root.classList.add(theme);
	}, [theme]);

	return {
		theme,
		setTheme: (theme: Theme) => {
			setTheme(theme);
		},
	};
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (!context) throw new Error("useTheme must be used within a ThemeProvider");

	return context;
};
