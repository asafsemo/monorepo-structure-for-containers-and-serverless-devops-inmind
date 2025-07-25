import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ProtectedRoute } from "@/features/authentication/containers/protected-route.tsx";
import { useAuthentication } from "@/features/authentication/services";
import { AuthenticatedMainHeader } from "@/features/layouts/components/authenticated-header.tsx";
import { LanguageSelector } from "@/features/locales/containers/language-selector.tsx";

export const Route = createFileRoute("/projects/_layout")({
	component: RouteLayout,
	loader: async () => {},
	pendingComponent: () => <div>Loading...</div>,
	errorComponent: () => <div>Error</div>,
});

function RouteLayout() {
	const { logout } = useAuthentication();

	return (
		<ProtectedRoute redirectUrl="/auth/login">
			<AuthenticatedMainHeader
				handleLogout={logout}
				title="Archimedes Dashboard"
				extraRightActions={<LanguageSelector />}
			/>
			<Outlet />
		</ProtectedRoute>
	);
}
