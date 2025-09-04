import { Card, CardContent } from "@/components/ui/card";
import { actionTitles } from "../services";

interface ProjectActionComingSoonProps {
	action: keyof typeof actionTitles;
}

export const ProjectActionComingSoon = (
	props: ProjectActionComingSoonProps,
) => {
	const { action } = props;

	return (
		<Card>
			<CardContent className="flex items-center justify-center h-32">
				<p className="text-muted-foreground">
					{actionTitles[action]} management coming soon...
				</p>
			</CardContent>
		</Card>
	);
};
