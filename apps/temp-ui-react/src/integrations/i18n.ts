import { useMatches } from "@tanstack/react-router";

export const getTranslation = () => {
	const matches = useMatches();
	const currentMatch = matches[matches.length - 1];
	const context = currentMatch?.context;
	return context?.t || ((key: string, defValue: string)=>{ return defValue || key });
}
