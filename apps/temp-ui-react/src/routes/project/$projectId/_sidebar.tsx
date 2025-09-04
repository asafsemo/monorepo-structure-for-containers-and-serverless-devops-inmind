import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ProtectedRoute } from "@/features/authentication/containers/protected-route";
import { projectsQueryOptions } from "@/features/projects/services";

export const Route = createFileRoute("/project/$projectId/_sidebar")({
	component: RouteLayout,
	loader: async ({ context }) => {
		return context.queryClient.ensureQueryData(projectsQueryOptions);
	},
	pendingComponent: () => <div>Loading...</div>,
	errorComponent: () => <div>Error</div>,
});

function RouteLayout() {
	return (
		<ProtectedRoute redirectTo="/auth/login">
			<Outlet />
		</ProtectedRoute>
	);
}
