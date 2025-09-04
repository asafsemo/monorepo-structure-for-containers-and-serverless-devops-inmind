import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { LanguageSelector } from "@/features/locales/containers/language-selector";
import { authUserStorageKey } from "@/features/authentication/services";
import { ThemeToggle } from "@/features/theme/containers/theme-toggle";

export const Route = createFileRoute("/auth/_layout")({
	component: RouteLayout,
	loader: async ({ location }) => {
		const authUser = localStorage.getItem(authUserStorageKey);

		if (authUser?.length) {
			const { redirectTo } = location.search as any;
			throw redirect({
				to: redirectTo || "/",
			});
		}
	},
	pendingComponent: () => <div>Loading...</div>,
	errorComponent: () => <div>Error</div>,
});

function RouteLayout() {
	return (
		<>
			<header className="border-b">
				<div className="flex h-16 items-center px-4">
					<div className="ml-auto flex items-center space-x-4">
						<LanguageSelector />
						<ThemeToggle />
					</div>
				</div>
			</header>
			<Outlet />
		</>
	);
}
