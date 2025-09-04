import { createFileRoute, useLocation } from "@tanstack/react-router";
import { RegisterContainer } from "@/features/authentication/containers/register-container";

export const Route = createFileRoute("/auth/_layout/register")({
	component: RouteComponent,
	loader: async () => {},
});

function RouteComponent() {
	const location = useLocation();

	return <RegisterContainer redirectTo={location.search.redirectTo} />;
}
