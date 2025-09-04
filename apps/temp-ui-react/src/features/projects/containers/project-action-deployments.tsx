import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getStatusColor, getStatusIcon } from "../services";

interface ProjectActionDeploymentsProps {
	deployments: any;
}

export const ProjectActionDeployments = (
	props: ProjectActionDeploymentsProps,
) => {
	const { deployments } = props;

	return (
		<div className="space-y-4">
			{deployments.map((deployment: any) => (
				<Card key={deployment.id}>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<div className="flex items-center space-x-2">
							{getStatusIcon(deployment.status)}
							<CardTitle className="text-base">{deployment.version}</CardTitle>
							<Badge
								className={`${getStatusColor(deployment.status)} text-white border-0`}
							>
								{deployment.status}
							</Badge>
						</div>
						<span className="text-sm text-muted-foreground">
							{deployment.environment}
						</span>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
							<div>
								<p className="text-muted-foreground">Deployed by</p>
								<p className="font-medium">{deployment.deployedBy}</p>
							</div>
							<div>
								<p className="text-muted-foreground">Deployed at</p>
								<p className="font-medium">{deployment.deployedAt}</p>
							</div>
							<div>
								<p className="text-muted-foreground">Duration</p>
								<p className="font-medium">{deployment.duration}</p>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
};
