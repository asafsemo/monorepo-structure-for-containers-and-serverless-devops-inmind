import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ProjectActionDeploymentsAddDialog } from "@/features/projects/components/project-action-deployments-adddialog";
import { ProjectActionDeployments } from "@/features/projects/containers/project-action-deployments";
import { ProjectActionMain } from "@/features/projects/containers/project-action-main";
import { projectActionsQueryOptions } from "@/features/projects/services";

export const Route = createFileRoute(
	"/project/$projectId/_nosidebar/deployments",
)({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		const { projectId } = params;
		return context.queryClient.ensureQueryData(
			projectActionsQueryOptions(projectId),
		);
	},
	beforeLoad: () => {
		return {
			title: "Deployments",
		};
	},
});

function RouteComponent() {
	const { projectId } = Route.useParams();
	const { data: projectActions } = useSuspenseQuery(
		projectActionsQueryOptions(projectId),
	);

	return (
		<ProjectActionMain
			addDialog={<ProjectActionDeploymentsAddDialog />}
			action="deployments"
		>
			<ProjectActionDeployments deployments={projectActions.deployments} />
		</ProjectActionMain>
	);
}
