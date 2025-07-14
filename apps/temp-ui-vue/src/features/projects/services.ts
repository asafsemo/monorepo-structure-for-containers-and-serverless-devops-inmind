import { fetchWithAuthAndRefreshTokenHandle } from '@/lib/utils';
import type { IProjectDetail, IResponseProjectsPage } from './types';

export const serviceProjects = {
	createNewProjectPanel(): void {
		// Logic to add a new project
		console.log('Add new project');
	},

	async getProjectsList(pageId: number, retryCount: number = 1): Promise<IResponseProjectsPage> {
		const url = `./api/projects?pageId=${pageId}`;
		const initRequest = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};

		const extraData = {
			retryCount,
		};

		// await new Promise((resolve) => setTimeout(resolve, 3000));
		const response = await fetchWithAuthAndRefreshTokenHandle<{ data: IResponseProjectsPage }>(
			url,
			initRequest,
			extraData,
		);
		return response.data;
	},

	async getProjectById(projectId: string, retryCount: number = 1): Promise<IProjectDetail> {
		if (!projectId) throw new Error('Project ID is required');

		const url = `./api/projects/${projectId}`;
		const initRequest = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};

		const extraData = {
			retryCount,
		};

		const response = await fetchWithAuthAndRefreshTokenHandle<{ data: IProjectDetail }>(url, initRequest, extraData);
		return response.data;
	},
};
