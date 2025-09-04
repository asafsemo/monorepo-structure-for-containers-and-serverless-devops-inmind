import { createFileRoute } from "@tanstack/react-router";
import { ProjectActionComingSoon } from "@/features/projects/containers/project-action-comingsoon";
import { ProjectActionMain } from "@/features/projects/containers/project-action-main";

export const Route = createFileRoute("/project/$projectId/_nosidebar/database")(
	{
		component: RouteComponent,
		beforeLoad: () => {
			return {
				title: "Database",
			};
		},
	},
);

function RouteComponent() {
	return (
		<ProjectActionMain action="database">
			<ProjectActionComingSoon action="database" />
		</ProjectActionMain>
	);
}
