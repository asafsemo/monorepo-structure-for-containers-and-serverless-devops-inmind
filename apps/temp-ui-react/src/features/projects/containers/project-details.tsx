import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getStatusColor } from "../services";
import type { Project } from "../types";

interface ProjectDetailsProps {
	project: Project;
}

export const ProjectDetails = (props: ProjectDetailsProps) => {
	const { project } = props;

	return (
		// {/* Main Content */}
		<div className="w-full">
			{/* Project Overview */}
			<Card className="mb-6">
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="text-2xl">{project.name}</CardTitle>
							<CardDescription className="mt-2">
								{project.description}
							</CardDescription>
						</div>
						<Badge
							className={`${getStatusColor(project.status)} text-white border-0`}
						>
							{project.status}
						</Badge>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Version
							</p>
							<p className="text-lg font-semibold">{project.version}</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Environment
							</p>
							<p className="text-lg font-semibold">{project.environment}</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Team Members
							</p>
							<p className="text-lg font-semibold">{project.members}</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Deployments
							</p>
							<p className="text-lg font-semibold">{project.deployments}</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
