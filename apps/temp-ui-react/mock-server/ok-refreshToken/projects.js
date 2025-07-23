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

			if (pageId === '2' && cookies.access_token !== 'mock-access-token-67890') {
				const responseBody = {
					status: 'error',
					data: { message: 'Invalid access token' },
				};
				res.statusCode = 401;
				return res.end(JSON.stringify(responseBody));
			}

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
];
