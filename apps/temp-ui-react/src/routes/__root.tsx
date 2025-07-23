import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Provider as JotaiProvider } from "jotai"; // Renamed to avoid conflict if any
import { ThemeProvider } from "@/features/theme/containers/theme-provider.tsx";
import { appStore } from "../integrations/jotaiStore"; // Import your single store
import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => <GlobalLayout />,
	notFoundComponent: () => <GlobalNotFound />,
});

interface MyRouterContext {
	queryClient: QueryClient;
}

function GlobalLayout() {
	return (
		<JotaiProvider store={appStore}>
			<ThemeProvider>
				<Outlet />
			</ThemeProvider>
			<TanStackRouterDevtools />

			<TanStackQueryLayout />
		</JotaiProvider>
	);
}

// Define your 404 Not Found component
function GlobalNotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="text-center">
				<h1 className="text-4xl font-bold mb-4">404</h1>
				<p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
				<a href="/" className="text-blue-500 hover:text-blue-700 underline">
					Return to Home
				</a>
			</div>
		</div>
	);
}
