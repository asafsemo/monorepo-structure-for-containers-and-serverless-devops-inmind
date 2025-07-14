import { parse } from 'cookie';

export default [
	{
		url: '/api/auth/login',
		method: 'post',
		rawResponse: async (req, res) => {
			const chunks = [];
			for await (const chunk of req) {
				chunks.push(chunk);
			}

			const accessToken = 'mock-access-token-12345';
			const refreshToken = 'mock-refresh-token-abcdef';

			res.statusCode = 200;
			const responseBody = {
				status: 'ok',
				data: {
					accessToken,
				},
			};
			const accessTokenCookie = `refresh_token=${refreshToken}; HttpOnly; Path=/api/auth/refresh-token; Max-Age=${60 * 60 * 24 * 7}`; // 7 days
			const refreshTokenCookie = `access_token=${accessToken}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}`; // 7 days
			res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
			return res.end(JSON.stringify(responseBody));
		},
	},
	{
		url: '/api/auth/refresh-token',
		method: 'post',
		rawResponse: async (req, res) => {
			const cookies = parse(req.headers.cookie || '');
			if (!Object.prototype.hasOwnProperty.call(cookies, 'refresh_token')) {
				const responseBody = {
					status: 'error',
					data: { message: 'Invalid refresh token' },
				};
				res.statusCode = 401;
				return res.end(JSON.stringify(responseBody));
			}

			const accessToken = 'mock-access-token-67890';
			const refreshToken = 'mock-refresh-token-abcdef';

			res.statusCode = 200;
			const responseBody = {
				status: 'ok',
				data: {
					accessToken,
				},
			};
			const accessTokenCookie = `refresh_token=${refreshToken}; HttpOnly; Path=/api/auth/refresh-token; Max-Age=${60 * 60 * 24 * 7}`; // 7 days
			const refreshTokenCookie = `access_token=${accessToken}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}`; // 7 days
			res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
			return res.end(JSON.stringify(responseBody));
		},
	},
	{
		url: '/api/auth/logout',
		method: 'get',
		statusCode: 200,
		rawResponse: async (req, res) => {
			const accessToken = '';
			const refreshToken = '';

			const accessTokenCookie = `refresh_token=${refreshToken}; HttpOnly; Path=/api/auth/refresh-token; Max-Age=0;`;
			const refreshTokenCookie = `access_token=${accessToken}; HttpOnly; Path=/; Max-Age=0;`;
			res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
			return res.end(
				JSON.stringify({
					status: 'ok',
				}),
			);
		},
	},
];
