import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { SidebarTrigger } from "@/components/ui/sidebar.tsx";
import { AuthenticatedMainHeader } from "@/features/layouts/components/authenticated-header.tsx";
import { LanguageSelector } from "@/features/locales/containers/language-selector.tsx";

interface ProjectHeaderProps {
	title: string;
	handleLogout: () => void;
	sidebarTrigger?: boolean;
}

export const ProjectHeader = (props: ProjectHeaderProps) => {
	const {
		title,
		handleLogout,
		sidebarTrigger = true,
	} = props;

	const handleGoBack = () => {
		window.history.back();
	};

	return (
		// {/* Header */}
		<AuthenticatedMainHeader
			title={title}
			handleLogout={handleLogout}
			extraRightActions={<LanguageSelector />}
		>
			{sidebarTrigger && <SidebarTrigger />}
			<Button variant="ghost" size="icon" asChild onClick={handleGoBack}>
				<ArrowLeft className="h-4 w-4" />
			</Button>
			<Separator orientation="vertical" className="h-6" />
		</AuthenticatedMainHeader>
	);
};
