import {
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
	ILogger,
	ParentBaseObject,
} from '@pkg/lib-containers';
import { EManagedError, ManagedError } from '@pkg/lib-data';
import { ServiceData } from '../services/serviceData.js';

const CLASSNAME = 'controller-data';

export default class ControllerItems extends ParentBaseObject {
	constructor(logger: ILogger, fastify: FastifyInstance, urlPrefix: string) {
		super(logger);

		fastify.register(
			(app, _, done) => {
				ControllerRoutes.forEach((route: any) => {
					route.schema = route.schema || {};
					route.schema.tags = route.schema.tags || [CLASSNAME];
					app.route(route);
				});

				done();
			},
			{ prefix: urlPrefix },
		);
	}
}

const setInitialData = async (request: FastifyRequest, reply: FastifyReply) => {
	const { iocManager, logger } = request.extraData;
	logger.debug(`${CLASSNAME} - setInitialData`);

	const service = iocManager.resolve('serviceData') as ServiceData;
	const response = await service.setInitialData({ logger });

	if (!response) {
		throw new ManagedError(
			'response is empty',
			EManagedError.RESPONSE_BODY_EMPTY,
		);
	}

	return reply.code(200).send(response);
};


export const ControllerRoutes = [
	{
		method: 'POST',
		url: '/data/initial',
		handler: setInitialData,
		config: { authorizedRoles: ['asaf'] },
	},
];
