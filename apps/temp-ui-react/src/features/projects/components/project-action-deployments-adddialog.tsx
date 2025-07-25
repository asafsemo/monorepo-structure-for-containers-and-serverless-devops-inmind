import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";

interface ProjectActionDeploymentsAddDialogProps {
	className?: string;
}

export const ProjectActionDeploymentsAddDialog = (
	_props: ProjectActionDeploymentsAddDialogProps,
) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					New Deployment
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create New Deployment</DialogTitle>
					<DialogDescription>
						Deploy a new version to your selected environment.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="version">Version</Label>
						<Input id="version" placeholder="v2.1.5" />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="environment">Environment</Label>
						<Input id="environment" placeholder="Production" />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="notes">Release Notes</Label>
						<Textarea
							id="notes"
							placeholder="Describe the changes in this release..."
						/>
					</div>
				</div>
				<div className="flex justify-end space-x-2">
					<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
						Cancel
					</Button>
					<Button onClick={() => setIsDialogOpen(false)}>Deploy</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
