import { createFileRoute } from "@tanstack/react-router";
import { useAuthentication } from "@/features/authentication/services";
import { ProjectHeader } from "@/features/projects/components/project-header.tsx";
import { ProjectActionComingSoon } from "@/features/projects/containers/project-action-comingsoon.tsx";
import { ProjectActionMain } from "@/features/projects/containers/project-action-main.tsx";

export const Route = createFileRoute("/project/_layout/$projectId/monitoring")({
	component: RouteComponent,
});

function RouteComponent() {
	const { logout } = useAuthentication();

	return (
		<div>
			<ProjectHeader
				title={"Monitoring"}
				handleLogout={logout}
				sidebarTrigger={false}
			/>

			<ProjectActionMain action="monitoring">
				<ProjectActionComingSoon action="monitoring" />
			</ProjectActionMain>
		</div>
	);
}
