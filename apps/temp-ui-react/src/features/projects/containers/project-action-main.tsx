import { actionTitles } from "../services";

interface ProjectActionMainProps {
	children: React.ReactNode;
	addDialog?: React.ReactNode;
	action: keyof typeof actionTitles;
}

export const ProjectActionMain = (props: ProjectActionMainProps) => {
	const { children, addDialog, action } = props;
	return (
		//   {/* Main Content */}
		<main className="p-4 md:p-6">
			<div className="max-w-4xl">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">
							{actionTitles[action]}
						</h2>
						<p className="text-muted-foreground">
							Manage project {action} and monitor their status
						</p>
					</div>
					{addDialog}
				</div>

				{children}
			</div>
		</main>
	);
};
