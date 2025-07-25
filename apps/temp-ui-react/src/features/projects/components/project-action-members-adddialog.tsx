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

interface ProjectActionMembersAddDialogProps {
	className?: string;
}

export const ProjectActionMembersAddDialog = (
	_props: ProjectActionMembersAddDialogProps,
) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					Add Member
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add Team Member</DialogTitle>
					<DialogDescription>
						Invite a new member to join this project.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" type="email" placeholder="user@example.com" />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="role">Role</Label>
						<Input id="role" placeholder="Developer" />
					</div>
				</div>
				<div className="flex justify-end space-x-2">
					<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
						Cancel
					</Button>
					<Button onClick={() => setIsDialogOpen(false)}>
						Send Invitation
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
