import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button.tsx";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { useLanguageManager } from "../services";

interface LanguageSelectorProps {
	className?: string;
}

export const LanguageSelector = (props: LanguageSelectorProps) => {
	const { className } = props;
	const { t } = useTranslation();

	const { isLoading, changeLanguage, availableLanguages, currentLanguageCode } =
		useLanguageManager();

	return (
		<div className={className}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="h-8 w-8 px-0"
						disabled={isLoading}
						data-testid="language-selector-button"
					>
						<Globe className="h-4 w-4" />
						<span className="sr-only">
							{t("components.header.languageSelector.selectLanguage")}
						</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" data-testid="language-selector-menu">
					{availableLanguages.map((language) => (
						<DropdownMenuItem
							key={language.code}
							onClick={() => changeLanguage(language.code)}
							className={
								currentLanguageCode === language.code ? "bg-accent" : ""
							}
							disabled={isLoading}
							data-testid={`language-option-${language.code}`}
						>
							{language.label}
							{currentLanguageCode === language.code && (
								<span className="ml-auto">✓</span>
							)}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
