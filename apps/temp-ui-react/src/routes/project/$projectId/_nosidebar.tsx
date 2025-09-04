import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";
import { AuthenticatedMainHeader } from "@/features/authentication/components/authenticated-header";
import { LanguageSelector } from "@/features/locales/containers/language-selector";
import { ProjectHeaderActions } from "@/features/projects/components/project-header-actions";
import { ThemeToggle } from "@/features/theme/containers/theme-toggle";
import { ProtectedRoute } from "@/features/authentication/containers/protected-route";
import { projectsQueryOptions } from "@/features/projects/services";

export const Route = createFileRoute("/project/$projectId/_nosidebar")({
	component: RouteLayout,
	loader: async ({ context }) => {
		return context.queryClient.ensureQueryData(projectsQueryOptions);
	},
	pendingComponent: () => <div>Loading...</div>,
	errorComponent: () => <div>Error</div>,
});

function RouteLayout() {
	const matches = useMatches();
	const currentMatch = matches[matches.length - 1];
	const context = currentMatch?.context || {};

	const title = context?.title || "{TITLE NOT SET}";

	return (
		<ProtectedRoute redirectTo="/auth/login">
			<AuthenticatedMainHeader
				title={title}
				rightPanelActions={
					<>
						<LanguageSelector />
						<ThemeToggle />
					</>
				}
			>
				<ProjectHeaderActions sidebarTrigger={false} />
			</AuthenticatedMainHeader>
			<Outlet />
		</ProtectedRoute>
	);
}
