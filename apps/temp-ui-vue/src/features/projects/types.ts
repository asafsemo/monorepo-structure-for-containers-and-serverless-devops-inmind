export interface IProject {
	id: number;
	name: string;
	client: string;
	status: string;
	description?: string;
	thumbnail?: string;
}

export interface IProjectDetail extends IProject {
	createdAt: string;
	updatedAt: string;
	teamMembers?: ITeamMember[];
	technologies?: string[];
	budget?: number;
	deadline?: string;
	progress: number;
	tasks?: ITask[];
}

export interface ITeamMember {
	id: number;
	name: string;
	role: string;
	email: string;
	avatar?: string;
}

export interface ITask {
	id: number;
	title: string;
	status: 'pending' | 'in-progress' | 'completed';
	assignee?: string;
	dueDate?: string;
	priority: 'low' | 'medium' | 'high';
}

export interface IResponseProjectsPage {
	pageData: IProject[];
	maxPageId: number;
	currentPage: number;
	pageSize: number;
}
