import { parse } from 'cookie';

export default [
	{
		url: '/api/projects',
		method: 'get',
		rawResponse: async (req, res) => {
			const cookies = parse(req.headers.cookie || '');
			if (!Object.prototype.hasOwnProperty.call(cookies, 'access_token')) {
				const responseBody = {
					status: 'error',
					data: { message: 'Invalid access token' },
				};
				res.statusCode = 401;
				return res.end(JSON.stringify(responseBody));
			}

			res.statusCode = 200;
			const url = new URL(req.url, `http://${req.headers.host}`);
			const pageId = url.searchParams.get('pageId');
			const maxPageId = 5;
			if (pageId === '2') {
				const responseBody = {
					status: 'ok',
					data: {
						maxPageId,
						currentPage: 2,
						pageSize: 5,
						pageData: [
							{ id: 1, name: 'Project 21', client: 'Client 1', status: 'active' },
							{ id: 2, name: 'Project 22 - asaf', client: 'Client 2', status: 'active' },
							{ id: 3, name: 'Project 23', client: 'Client 3', status: 'active' },
							{ id: 4, name: 'Project 24', client: 'Client 4', status: 'active' },
							{ id: 5, name: 'Project 25', client: 'Client 5', status: 'active' },
						],
					},
				};
				return res.end(JSON.stringify(responseBody));
			}

			const responseBody = {
				status: 'ok',
				data: {
					maxPageId,
					currentPage: pageId,
					pageSize: 5,
					pageData: [
						{
							id: 1,
							name: `Project ${pageId}1`,
							client: 'Client 1',
							status: 'active',
							thumbnail: 'https://picsum.photos/400/300?random=1',
						},
						{
							id: 2,
							name: 'Project 2 - asaf',
							client: 'Client 2',
							status: 'active',
							thumbnail: 'https://picsum.photos/400/300?random=2',
						},
						{
							id: 3,
							name: 'Project 3',
							client: 'Client 3',
							status: 'active',
							thumbnail: 'https://picsum.photos/400/300?random=3',
						},
						{
							id: 4,
							name: 'Project 4',
							client: 'Client 4',
							status: 'active',
							thumbnail: 'https://picsum.photos/400/300?random=4',
						},
						{
							id: 5,
							name: 'Project 5',
							client: 'Client 5',
							status: 'active',
							thumbnail: 'https://picsum.photos/400/300?random=5',
						},
					],
				},
			};
			return res.end(JSON.stringify(responseBody));
		},
	},
	{
		url: '/api/projects/:id',
		method: 'get',
		rawResponse: async (req, res) => {
			const cookies = parse(req.headers.cookie || '');
			if (!Object.prototype.hasOwnProperty.call(cookies, 'access_token')) {
				const responseBody = {
					status: 'error',
					data: { message: 'Invalid access token' },
				};
				res.statusCode = 401;
				return res.end(JSON.stringify(responseBody));
			}

			// Extract project ID from URL
			const projectId = req.url.split('/').pop()?.split('?')[0];
			console.log("🚀 ~ rawResponse: ~ projectId:", projectId)

			// Check if project exists
			if (!projectId || isNaN(Number(projectId))) {
				const responseBody = {
					status: 'error',
					data: { message: 'Invalid project ID' },
				};
				res.statusCode = 400;
				return res.end(JSON.stringify(responseBody));
			}

			const id = Number(projectId);

			// Mock project data with comprehensive details
			const projectsData = {
				1: {
					id: 1,
					name: 'E-Commerce Platform Redesign',
					client: 'TechCorp Solutions',
					status: 'in-progress',
					description:
						'Complete redesign and modernization of the existing e-commerce platform with improved user experience, mobile responsiveness, and performance optimization. This project includes migration to modern tech stack, implementation of microservices architecture, and integration with third-party payment systems.',
					thumbnail: 'https://picsum.photos/400/300?random=1',
					createdAt: '2024-01-15T10:00:00Z',
					updatedAt: '2024-01-20T14:30:00Z',
					budget: 125000,
					deadline: '2024-06-30T23:59:59Z',
					progress: 68,
					teamMembers: [
						{
							id: 1,
							name: 'Sarah Johnson',
							role: 'Project Manager',
							email: 'sarah.johnson@company.com',
							avatar: 'https://picsum.photos/100/100?random=101',
						},
						{
							id: 2,
							name: 'Michael Chen',
							role: 'Frontend Developer',
							email: 'michael.chen@company.com',
							avatar: 'https://picsum.photos/100/100?random=102',
						},
						{
							id: 3,
							name: 'Elena Rodriguez',
							role: 'Backend Developer',
							email: 'elena.rodriguez@company.com',
							avatar: 'https://picsum.photos/100/100?random=103',
						},
						{
							id: 4,
							name: 'David Kim',
							role: 'UX/UI Designer',
							email: 'david.kim@company.com',
							avatar: 'https://picsum.photos/100/100?random=104',
						},
					],
					technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Docker', 'AWS', 'TypeScript', 'Tailwind CSS'],
					tasks: [
						{
							id: 1,
							title: 'Design System Implementation',
							status: 'completed',
							assignee: 'David Kim',
							dueDate: '2024-02-15T23:59:59Z',
							priority: 'high',
						},
						{
							id: 2,
							title: 'User Authentication Module',
							status: 'completed',
							assignee: 'Elena Rodriguez',
							dueDate: '2024-02-28T23:59:59Z',
							priority: 'high',
						},
						{
							id: 3,
							title: 'Product Catalog Frontend',
							status: 'in-progress',
							assignee: 'Michael Chen',
							dueDate: '2024-03-15T23:59:59Z',
							priority: 'medium',
						},
						{
							id: 4,
							title: 'Payment Integration',
							status: 'pending',
							assignee: 'Elena Rodriguez',
							dueDate: '2024-04-01T23:59:59Z',
							priority: 'high',
						},
						{
							id: 5,
							title: 'Mobile Responsive Testing',
							status: 'pending',
							assignee: 'Michael Chen',
							dueDate: '2024-04-15T23:59:59Z',
							priority: 'medium',
						},
					],
				},
				2: {
					id: 2,
					name: 'Project 2 - asaf',
					client: 'StartupXYZ',
					status: 'active',
					description:
						'Development of a modern web application for project management and team collaboration. Features include real-time messaging, file sharing, task tracking, and comprehensive reporting dashboard.',
					thumbnail: 'https://picsum.photos/400/300?random=2',
					createdAt: '2024-01-20T09:00:00Z',
					updatedAt: '2024-01-25T16:20:00Z',
					budget: 85000,
					deadline: '2024-05-15T23:59:59Z',
					progress: 45,
					teamMembers: [
						{
							id: 5,
							name: 'Asaf Semo',
							role: 'Lead Developer',
							email: 'asaf.semo@company.com',
							avatar: 'https://picsum.photos/100/100?random=105',
						},
						{
							id: 6,
							name: 'Rachel Cohen',
							role: 'Frontend Developer',
							email: 'rachel.cohen@company.com',
							avatar: 'https://picsum.photos/100/100?random=106',
						},
					],
					technologies: ['React', 'Express.js', 'PostgreSQL', 'Redis', 'Docker'],
					tasks: [
						{
							id: 6,
							title: 'Project Setup and Architecture',
							status: 'completed',
							assignee: 'Asaf Semo',
							dueDate: '2024-02-01T23:59:59Z',
							priority: 'high',
						},
						{
							id: 7,
							title: 'User Interface Components',
							status: 'in-progress',
							assignee: 'Rachel Cohen',
							dueDate: '2024-03-01T23:59:59Z',
							priority: 'medium',
						},
					],
				},
				3: {
					id: 3,
					name: 'Corporate Website Revamp',
					client: 'Global Enterprise Inc',
					status: 'completed',
					description:
						'Complete overhaul of the corporate website with focus on modern design, improved SEO, and better content management system.',
					thumbnail: 'https://picsum.photos/400/300?random=3',
					createdAt: '2023-11-01T10:00:00Z',
					updatedAt: '2024-01-10T12:00:00Z',
					budget: 50000,
					deadline: '2024-01-31T23:59:59Z',
					progress: 100,
					teamMembers: [
						{
							id: 7,
							name: 'John Smith',
							role: 'Full Stack Developer',
							email: 'john.smith@company.com',
							avatar: 'https://picsum.photos/100/100?random=107',
						},
					],
					technologies: ['WordPress', 'PHP', 'MySQL', 'JavaScript'],
					tasks: [
						{
							id: 8,
							title: 'Website Design',
							status: 'completed',
							assignee: 'John Smith',
							dueDate: '2023-12-15T23:59:59Z',
							priority: 'high',
						},
						{
							id: 9,
							title: 'Content Migration',
							status: 'completed',
							assignee: 'John Smith',
							dueDate: '2024-01-15T23:59:59Z',
							priority: 'medium',
						},
					],
				},
			};

			// Return project data if exists, otherwise 404
			const project = projectsData[id];
			if (!project) {
				const responseBody = {
					status: 'error',
					data: { message: 'Project not found' },
				};
				res.statusCode = 404;
				return res.end(JSON.stringify(responseBody));
			}

			res.statusCode = 200;
			const responseBody = {
				status: 'ok',
				data: project,
			};
			return res.end(JSON.stringify(responseBody));
		},
	},
];
