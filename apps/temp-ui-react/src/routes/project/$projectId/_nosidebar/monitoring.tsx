import { createFileRoute } from "@tanstack/react-router";
import { ProjectActionComingSoon } from "@/features/projects/containers/project-action-comingsoon";
import { ProjectActionMain } from "@/features/projects/containers/project-action-main";

export const Route = createFileRoute(
	"/project/$projectId/_nosidebar/monitoring",
)({
	component: RouteComponent,
	beforeLoad: () => {
		return {
			title: "Monitoring",
		};
	},
});

function RouteComponent() {
	return (
		<ProjectActionMain action="monitoring">
			<ProjectActionComingSoon action="monitoring" />
		</ProjectActionMain>
	);
}
