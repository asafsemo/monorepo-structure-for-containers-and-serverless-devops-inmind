import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ProjectsList } from "@/features/projects/components/projects-list.tsx";
import { projectsQueryOptions } from "@/features/projects/services";
import type { Project } from "@/features/projects/types.ts";

export const Route = createFileRoute("/projects/_layout/")({
	component: RouteComponent,
	loader: async ({ context }) => {
		return context.queryClient.ensureQueryData(projectsQueryOptions);
	},
	pendingComponent: () => <div>Loading...</div>,
	errorComponent: () => <div>Error</div>,
});

function RouteComponent() {
	const { data: projects } = useSuspenseQuery(projectsQueryOptions);

	return <ProjectsList projects={projects as Project[]} />;
}
