import { createFileRoute } from "@tanstack/react-router";
import { ProjectActionComingSoon } from "@/features/projects/containers/project-action-comingsoon";
import { ProjectActionMain } from "@/features/projects/containers/project-action-main";

export const Route = createFileRoute("/project/$projectId/_nosidebar/security")(
	{
		component: RouteComponent,
		beforeLoad: () => {
			return {
				title: "Security",
			};
		},
	},
);

function RouteComponent() {
	return (
		<ProjectActionMain action="security">
			<ProjectActionComingSoon action="security" />
		</ProjectActionMain>
	);
}
