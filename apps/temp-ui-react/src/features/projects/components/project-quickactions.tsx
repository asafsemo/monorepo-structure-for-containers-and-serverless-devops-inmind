import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface ProjectQuickActionsProps {
	actions: {
		title: string;
		description: string;
		icon: React.ElementType;
		url: string;
	}[];
	projectId: number;
}

export const ProjectQuickActions = (props: ProjectQuickActionsProps) => {
	const { actions, projectId } = props;
	
	// /* Quick Actions */
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{actions.map((action) => (
				<Card key={action.title} className="hover:shadow-lg transition-shadow">
					<CardHeader className="flex flex-row items-center space-y-0 pb-2">
						<action.icon className="h-5 w-5 text-primary" />
						<CardTitle className="ml-2 text-base">{action.title}</CardTitle>
					</CardHeader>
					<CardContent>
						<CardDescription className="mb-4">
							{action.description}
						</CardDescription>
						<Button asChild variant="outline" className="w-full">
							<Link to={`/project/${projectId}/${action.url}`}>
								Manage {action.title}
							</Link>
						</Button>
					</CardContent>
				</Card>
			))}
		</div>
	);
};
