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
import { Textarea } from "@/components/ui/textarea";
import { getTranslation } from "@/integrations/i18n";

interface ProjectActionDeploymentsAddDialogProps {
	className?: string;
}

export const ProjectActionDeploymentsAddDialog = (
	_props: ProjectActionDeploymentsAddDialogProps,
) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const t = getTranslation();

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button data-testid="new-deployment-button">
					<Plus className="mr-2 h-4 w-4" />
					{t('features.projects.deployments.newDeployment', 'New Deployment')}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{t('features.projects.deployments.createTitle', 'Create New Deployment')}</DialogTitle>
					<DialogDescription>
						{t('features.projects.deployments.createDescription', 'Deploy a new version to your selected environment.')}
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="version">{t('features.projects.deployments.versionLabel', 'Version')}</Label>
						<Input id="version" placeholder={t('features.projects.deployments.versionPlaceholder', 'v2.1.5')} data-testid="version-input" />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="environment">{t('features.projects.deployments.environmentLabel', 'Environment')}</Label>
						<Input id="environment" placeholder={t('features.projects.deployments.environmentPlaceholder', 'Production')} data-testid="environment-input" />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="notes">{t('features.projects.deployments.notesLabel', 'Release Notes')}</Label>
						<Textarea
							id="notes"
							placeholder={t('features.projects.deployments.notesPlaceholder', 'Describe the changes in this release...')}
							data-testid="release-notes-input"
						/>
					</div>
				</div>
				<div className="flex justify-end space-x-2">
					<Button variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="cancel-button">
						{t('common.buttons.cancel', 'Cancel')}
					</Button>
					<Button onClick={() => setIsDialogOpen(false)} data-testid="deploy-button">
						{t('features.projects.deployments.deployButton', 'Deploy')}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
