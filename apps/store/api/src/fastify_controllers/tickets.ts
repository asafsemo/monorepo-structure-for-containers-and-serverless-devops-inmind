import {
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
	ILogger,
	ParentBaseObject,
} from '@pkg/lib-containers';
import { EManagedError, ManagedError } from '@pkg/lib-data';
import { ServiceTickets } from '../services/serviceTickets.js';

const CLASSNAME = 'controller-tickets';

export default class ControllerTickets extends ParentBaseObject {
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

const listTickets = async (request: FastifyRequest, reply: FastifyReply) => {
	const { iocManager, logger } = request.extraData;
	logger.debug(`${CLASSNAME} - listTickets`);

	const service = iocManager.resolve('serviceTickets') as ServiceTickets;
	const response = await service.listTickets({ logger });

	if (!response) {
		throw new ManagedError(
			'response is empty',
			EManagedError.RESPONSE_BODY_EMPTY,
		);
	}

	return reply.code(200).send(response);
};

export const ControllerRoutes = [
	{ method: 'GET', url: '/tickets', handler: listTickets, config: {} },
];
