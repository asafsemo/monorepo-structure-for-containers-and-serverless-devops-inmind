import {
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
	ILogger,
	ParentBaseObject,
} from '@pkg/lib-containers';

const CLASSNAME = 'controller-healthcheck';

export default class ControllerHealthCheck extends ParentBaseObject {
	constructor(logger: ILogger, fastify: FastifyInstance) {
		super(logger);

		fastify.register(
			(app, _, done) => {
				ControllerRoutes.forEach((route: any) => {
					app.route(route);
				});
				// app.route({}).get(
				// 	ControllerRoutes.getRolepassToken,
				// 	{
				// 		config: {
				// 			// authorizedRoles: ["investigator"],
				// 			// validationSchema: InvestigatorAllRFIsDataResponseSchema,
				// 		},
				// 	},
				// 	(request: FastifyRequest, reply: FastifyReply) => {
				// 		return getRolepassToken(request, reply);
				// 	},
				// );

				done();
			},
			{ prefix: '' },
		);
	}
}

const healthcheck = (request: FastifyRequest, reply: FastifyReply) => {
	const { iocManager, logger } = request.extraData;
	logger.debug(`${CLASSNAME} - healthcheck`);

	let serviceName = iocManager.resolve('serviceName') as string;
	if (!serviceName?.length) {
		serviceName = '{Service name is NOT set}';
	}

	return reply.code(200).send(`OK response - ${serviceName}`);
};

export const ControllerRoutes = [
	{ method: 'GET', url: '/healthcheck', handler: healthcheck },
];
