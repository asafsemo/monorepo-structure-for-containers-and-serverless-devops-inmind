import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LanguageSelector } from "@/features/locales/containers/language-selector";
import { ThemeToggle } from "@/features/theme/containers/theme-toggle";
import { AuthenticatedMainHeader } from "@/features/authentication/components/authenticated-header";
import { ProtectedRoute } from "@/features/authentication/containers/protected-route";

export const Route = createFileRoute("/projects/_layout")({
	component: RouteLayout,
	loader: async () => {},
	pendingComponent: () => <div>Loading...</div>,
	errorComponent: () => <div>Error</div>,
});

function RouteLayout() {
	return (
		<ProtectedRoute redirectTo="/auth/login">
			<AuthenticatedMainHeader
				title="Archimedes Dashboard"
				rightPanelActions={
					<>
						<LanguageSelector />
						<ThemeToggle />
					</>
				}
			/>
			<Outlet />
		</ProtectedRoute>
	);
}
