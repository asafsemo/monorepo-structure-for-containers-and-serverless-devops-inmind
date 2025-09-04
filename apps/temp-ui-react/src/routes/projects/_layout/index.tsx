import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ProjectsList } from "@/features/projects/components/projects-list";
import { projectsQueryOptions } from "@/features/projects/services";
import type { Project } from "@/features/projects/types";

export const Route = createFileRoute("/projects/_layout/")({
	component: RouteComponent,
	loader: async ({ context }) => {
		return context.queryClient.ensureQueryData(projectsQueryOptions);
	},
	pendingComponent: PendingComponent,
	errorComponent: ErrorComponent,
});

function RouteComponent() {
	const { data: projects } = useSuspenseQuery(projectsQueryOptions);

	return <ProjectsList projects={projects as Project[]} />;
}

function PendingComponent() {
	return <div>Loading...</div>;
}

function ErrorComponent({ error }: { error: Error }) {
	return <div>Error: {error.message}</div>;
}
