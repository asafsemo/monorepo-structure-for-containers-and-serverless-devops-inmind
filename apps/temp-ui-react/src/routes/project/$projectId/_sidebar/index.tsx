import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
	Activity,
	Database,
	GitBranch,
	Rocket,
	Shield,
	Users,
} from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthenticatedMainHeader } from "@/features/authentication/components/authenticated-header";
import { LanguageSelector } from "@/features/locales/containers/language-selector";
import { ProjectHeaderActions } from "@/features/projects/components/project-header-actions";
import { ProjectSidebar } from "@/features/projects/containers/project-sidebar";
import { ThemeToggle } from "@/features/theme/containers/theme-toggle";
import { ProjectQuickActions } from "@/features/projects/components/project-quickactions";
import { ProjectDetails } from "@/features/projects/containers/project-details";
import { projectsQueryOptions } from "@/features/projects/services";

export const Route = createFileRoute("/project/$projectId/_sidebar/")({
	component: RouteComponent,
	loader: async () => {},
});

const projectActions = [
	{
		title: "Deployments",
		url: "deployments",
		icon: Rocket,
		description: "Manage application deployments",
	},
	{
		title: "Team Members",
		url: "members",
		icon: Users,
		description: "Manage project team",
	},
	{
		title: "Database",
		url: "database",
		icon: Database,
		description: "Database management",
	},
	{
		title: "Security",
		url: "security",
		icon: Shield,
		description: "Security settings",
	},
	{
		title: "Branches",
		url: "branches",
		icon: GitBranch,
		description: "Git branch management",
	},
	{
		title: "Monitoring",
		url: "monitoring",
		icon: Activity,
		description: "System monitoring",
	},
];

function RouteComponent() {
	const { projectId } = Route.useParams();

	const { data: projects } = useSuspenseQuery(projectsQueryOptions);

	const project = projects.find((project) => project.id === Number(projectId));

	if (!project) {
		return <div>Not Found</div>;
	}

	return (
		<SidebarProvider>
			<div className="min-h-screen flex w-full">
				<ProjectSidebar projectId={projectId} actions={projectActions} />
				<div className="flex-1 flex flex-col">
					<AuthenticatedMainHeader
						title={project?.name || "Not Found"}
						rightPanelActions={
							<>
								<LanguageSelector />
								<ThemeToggle />
							</>
						}
					>
						<ProjectHeaderActions />
					</AuthenticatedMainHeader>
					<main className="flex-1 p-4 md:p-6">
						<ProjectDetails project={project} />
						<ProjectQuickActions
							actions={projectActions}
							projectId={project.id}
						/>
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
}
