import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ProjectActionMembersAddDialog } from "@/features/projects/components/project-action-members-adddialog";
import { ProjectActionMain } from "@/features/projects/containers/project-action-main";
import { ProjectActionMembers } from "@/features/projects/containers/project-action-members";
import { projectActionsQueryOptions } from "@/features/projects/services";

export const Route = createFileRoute("/project/$projectId/_nosidebar/members")({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		const { projectId } = params;
		return context.queryClient.ensureQueryData(
			projectActionsQueryOptions(projectId),
		);
	},
	beforeLoad: () => {
		return {
			title: "Team Members",
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
			addDialog={<ProjectActionMembersAddDialog />}
			action="members"
		>
			<ProjectActionMembers members={projectActions.members} />
		</ProjectActionMain>
	);
}
