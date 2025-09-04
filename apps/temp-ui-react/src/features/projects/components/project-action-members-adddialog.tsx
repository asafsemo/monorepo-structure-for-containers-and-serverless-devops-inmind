import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getTranslation } from "@/integrations/i18n";

interface ProjectActionMembersAddDialogProps {
	className?: string;
}

export const ProjectActionMembersAddDialog = (
	_props: ProjectActionMembersAddDialogProps,
) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const t = getTranslation();

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button data-testid="add-member-button">
					<Plus className="mr-2 h-4 w-4" />
					{t('features.projects.members.addMember', 'Add Member')}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{t('features.projects.members.addMemberTitle', 'Add Team Member')}</DialogTitle>
					<DialogDescription>
						{t('features.projects.members.addMemberDescription', 'Invite a new member to join this project.')}
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="email">{t('features.projects.members.emailLabel', 'Email')}</Label>
						<Input id="email" type="email" placeholder={t('features.projects.members.emailPlaceholder', 'user@example.com')} data-testid="member-email-input" />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="role">{t('features.projects.members.roleLabel', 'Role')}</Label>
						<Input id="role" placeholder={t('features.projects.members.rolePlaceholder', 'Developer')} data-testid="member-role-input" />
					</div>
				</div>
				<div className="flex justify-end space-x-2">
					<Button variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="cancel-button">
						{t('common.buttons.cancel', 'Cancel')}
					</Button>
					<Button onClick={() => setIsDialogOpen(false)} data-testid="send-invitation-button">
						{t('features.projects.members.sendInvitation', 'Send Invitation')}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
