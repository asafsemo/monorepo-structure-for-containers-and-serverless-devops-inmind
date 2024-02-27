import {
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
	ILogger,
	ParentBaseObject,
} from '@pkg/lib-containers';
import ServiceAuth from '../services/serviceAuth.js';

export const ControllerRoutes = {
	login: '/auth/login',
	logout: '/auth/logout',
	isLogin: '/auth/islogin',
	forgotMyPassword: '/auth/forgotmypassword',
};

export default class ControllerHealthCheck extends ParentBaseObject {
	constructor(logger: ILogger, fastify: FastifyInstance) {
		super(logger);
		fastify.post(
			ControllerRoutes.login,
			{},
			(request: FastifyRequest, reply: FastifyReply) => {
				return login(request, reply);
			},
		);
		fastify.get(
			ControllerRoutes.logout,
			{},
			(request: FastifyRequest, reply: FastifyReply) => {
				return logout(request, reply);
			},
		);
		fastify.get(
			ControllerRoutes.isLogin,
			{},
			(request: FastifyRequest, reply: FastifyReply) => {
				return isLogin(request, reply);
			},
		);
		fastify.post(
			ControllerRoutes.forgotMyPassword,
			{},
			(request: FastifyRequest, reply: FastifyReply) => {
				return forgotMyPassword(request, reply);
			},
		);
	}
}

const login = async (request: FastifyRequest, reply: FastifyReply) => {
	const { iocManager, logger } = request.extraData;
	logger.debug('controller - login');

	const service = iocManager.resolve('serviceAuth') as ServiceAuth;
	const token = await service.login({ logger });

	return reply.code(200).send(token);
};

const logout = async (request: FastifyRequest, reply: FastifyReply) => {
	const { iocManager, logger } = request.extraData;
	logger.debug('controller - logout');

	const service = iocManager.resolve('serviceAuth') as ServiceAuth;
	await service.logout({ logger });

	return reply.code(200).send({ status: 'ok' });
};

const isLogin = async (request: FastifyRequest, reply: FastifyReply) => {
	const { iocManager, logger } = request.extraData;
	logger.debug('controller - logout');

	const service = iocManager.resolve('serviceAuth') as ServiceAuth;
	const res = await service.isLogin({ logger });

	return reply.code(200).send(res);
};

const forgotMyPassword = async (request: FastifyRequest, reply: FastifyReply) => {
	const { iocManager, logger } = request.extraData;
	logger.debug('controller - logout');

	const service = iocManager.resolve('serviceAuth') as ServiceAuth;
	const res = await service.forgotMyPassword({ logger });

	return reply.code(200).send(res);
};
