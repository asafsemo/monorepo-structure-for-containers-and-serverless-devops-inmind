import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useAuthentication } from "@/features/authentication/services";
import { ProjectActionDeploymentsAddDialog } from "@/features/projects/components/project-action-deployments-adddialog.tsx";
import { ProjectHeader } from "@/features/projects/components/project-header.tsx";
import { ProjectActionDeployments } from "@/features/projects/containers/project-action-deployments.tsx";
import { ProjectActionMain } from "@/features/projects/containers/project-action-main.tsx";
import { projectActionsQueryOptions } from "@/features/projects/services";

export const Route = createFileRoute("/project/_layout/$projectId/deployments")(
	{
		component: RouteComponent,
		loader: async ({ context, params }) => {
			const { projectId } = params;
			return context.queryClient.ensureQueryData(
				projectActionsQueryOptions(projectId),
			);
		},
	},
);

function RouteComponent() {
	const { logout } = useAuthentication();
	const { projectId } = useParams({
		from: "/project/_layout/$projectId/deployments",
	});
	const { data: projectActions } = useSuspenseQuery(
		projectActionsQueryOptions(projectId),
	);

	return (
		<div>
			<ProjectHeader
				title={"Deployments"}
				handleLogout={logout}
				sidebarTrigger={false}
			/>

			<ProjectActionMain
				addDialog={<ProjectActionDeploymentsAddDialog />}
				action="deployments"
			>
				<ProjectActionDeployments deployments={projectActions.deployments} />
			</ProjectActionMain>
		</div>
	);
}
