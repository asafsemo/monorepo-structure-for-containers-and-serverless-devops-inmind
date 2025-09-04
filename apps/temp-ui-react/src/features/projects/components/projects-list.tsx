import { Link } from "@tanstack/react-router";
import { Activity, MoreVertical, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getTranslation } from "@/integrations/i18n";
import type { Project } from "../types";

interface ProjectsListProps {
	projects: Project[];
}

const getStatusColor = (status: string) => {
	const retVal: Record<string, string> = {
		active: "bg-green-500",
		development: "bg-blue-500",
		testing: "bg-yellow-500",
	};
	return retVal[status] || "bg-gray-500";
};

export const ProjectsList = (props: ProjectsListProps) => {
	const t = getTranslation();

	return (
		<div className="min-h-screen bg-background">
			{/* Main Content */}
			<main className="p-4 md:p-6">
				<div className="mb-6">
					<h2 className="text-2xl font-bold tracking-tight mb-2">
						{t('features.projects.projectsList.title', 'My Projects')}
					</h2>
					<p className="text-muted-foreground">
						{t('features.projects.projectsList.subtitle', 'Manage and monitor your active projects')}
					</p>
				</div>

				<div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{props.projects.map((project) => (
						<Card
							key={project.id}
							className="hover:shadow-lg transition-shadow cursor-pointer"
						>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-base font-medium">
									{project.name}
								</CardTitle>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="icon" className="h-8 w-8">
											<MoreVertical className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem asChild>
											<Link to={`/project/${project.id}`} data-testid="view-project-link">
												{t('features.projects.projectCard.viewDetails', 'View Details')}
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem data-testid="edit-project-button">
											{t('features.projects.projectCard.editProject', 'Edit Project')}
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</CardHeader>
							<CardContent>
								<CardDescription className="mb-4 line-clamp-2">
									{project.description}
								</CardDescription>

								<div className="flex items-center justify-between mb-3">
									<Badge
										variant="outline"
										className={`${getStatusColor(project.status)} text-white border-0`}
									>
										{project.status}
									</Badge>
									<span className="text-sm text-muted-foreground">
										{project.lastActivity}
									</span>
								</div>

								<div className="flex items-center justify-between text-sm text-muted-foreground">
									<div className="flex items-center">
										<Users className="mr-1 h-3 w-3" />
										{t('features.projects.projectCard.membersCount', '{count} members', { count: project.members })}
									</div>
									<div className="flex items-center">
										<Activity className="mr-1 h-3 w-3" />
										{t('features.projects.projectCard.deploymentsCount', '{count} deployments', { count: project.deployments })}
									</div>
								</div>

								<Button asChild className="w-full mt-4" variant="outline" data-testid="open-project-button">
									<Link to={`/project/${project.id}`}>
										{t('features.projects.projectCard.openProject', 'Open Project')}
									</Link>
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</main>
		</div>
	);
};
