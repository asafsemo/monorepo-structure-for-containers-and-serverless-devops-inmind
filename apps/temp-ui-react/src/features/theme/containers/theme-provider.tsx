import { ThemeProviderContext, useThemeProvider } from "../services";

type ThemeProviderProps = {
	children: React.ReactNode;
};

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	const value = useThemeProvider();

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}
