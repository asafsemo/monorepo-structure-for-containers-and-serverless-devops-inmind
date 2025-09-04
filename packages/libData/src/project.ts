export interface Project {
    id: number;
    name: string;
    description: string;
    status: string;
    lastActivity: string;
    members: number;
    deployments: number;
    environment: string;
    version: string;
}