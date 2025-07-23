export type Project = {
	id: number;
	name: string;
	status: string;
	description?: string;
	lastActivity?: string;
	members: number;
	deployments: number;
    environment: string;
    version: string;
}
