import { createFileRoute } from "@tanstack/react-router";
import { ProjectActionComingSoon } from "@/features/projects/containers/project-action-comingsoon";
import { ProjectActionMain } from "@/features/projects/containers/project-action-main";

export const Route = createFileRoute("/project/$projectId/_nosidebar/branches")(
	{
		component: RouteComponent,
		beforeLoad: () => {
			return {
				title: "Branches",
			};
		},
	},
);

function RouteComponent() {
	return (
		<ProjectActionMain action="branches">
			<ProjectActionComingSoon action="branches" />
		</ProjectActionMain>
	);
}
