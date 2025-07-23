import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useAuthentication } from "@/features/authentication/services";
import { ProjectActionMembersAddDialog } from "@/features/projects/components/project-action-members-adddialog.tsx";
import { ProjectHeader } from "@/features/projects/components/project-header.tsx";
import { ProjectActionMain } from "@/features/projects/containers/project-action-main.tsx";
import { ProjectActionMembers } from "@/features/projects/containers/project-action-members.tsx";
import { projectActionsQueryOptions } from "@/features/projects/services";

export const Route = createFileRoute("/project/_layout/$projectId/members")({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		const { projectId } = params;
		return context.queryClient.ensureQueryData(
			projectActionsQueryOptions(projectId),
		);
	},
});

function RouteComponent() {
	const { logout } = useAuthentication();
	const { projectId } = useParams({
		from: "/project/_layout/$projectId/members",
	});
	const { data: projectActions } = useSuspenseQuery(
		projectActionsQueryOptions(projectId),
	);

	return (
		<div>
			<ProjectHeader
				title={"Team Members"}
				handleLogout={logout}
				sidebarTrigger={false}
			/>

			<ProjectActionMain
				addDialog={<ProjectActionMembersAddDialog />}
				action="members"
			>
				<ProjectActionMembers members={projectActions.members} />
			</ProjectActionMain>
		</div>
	);
}
