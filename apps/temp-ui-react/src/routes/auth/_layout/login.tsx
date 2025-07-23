import { createFileRoute, useLocation } from "@tanstack/react-router";
import { LoginContainer } from "@/features/authentication/containers/login-container.tsx";

export const Route = createFileRoute("/auth/_layout/login")({
	component: RouteComponent,
	loader: async () => {},
});

function RouteComponent() {
	const location = useLocation();

	return <LoginContainer redirectTo={location.search.redirectTo} />;
}
