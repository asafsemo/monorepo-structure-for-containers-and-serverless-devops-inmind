import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface ProjectHeaderActionsProps {
	sidebarTrigger?: boolean;
}

export const ProjectHeaderActions = (props: ProjectHeaderActionsProps) => {
	const { sidebarTrigger = true } = props;

	const handleGoBack = () => {
		window.history.back();
	};

	return (
		<>
			{sidebarTrigger && <SidebarTrigger />}
			<Button variant="ghost" size="icon" asChild onClick={handleGoBack}>
				<ArrowLeft className="h-4 w-4" />
			</Button>
			<Separator orientation="vertical" className="h-6" />
		</>
	);
};
