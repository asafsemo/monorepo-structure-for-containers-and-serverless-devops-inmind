import {
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
	ILogger,
	ParentBaseObject,
} from '@pkg/lib-containers';
import { EManagedError, ManagedError } from '@pkg/lib-data';
import { ServiceOrders } from '../services/serviceOrders.js';

const CLASSNAME = 'controller-orders';

export default class ControllerOrders extends ParentBaseObject {
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

const listOrders = async (request: FastifyRequest, reply: FastifyReply) => {
	const { iocManager, logger } = request.extraData;
	logger.debug(`${CLASSNAME} - listOrders`);

	const service = iocManager.resolve('serviceOrders') as ServiceOrders;
	const response = await service.listOrders({ logger });

	if (!response) {
		throw new ManagedError(
			'response is empty',
			EManagedError.RESPONSE_BODY_EMPTY,
		);
	}

	return reply.code(200).send(response);
};

const newOrder = async (request: FastifyRequest, reply: FastifyReply) => {
	const { iocManager, logger } = request.extraData;
	logger.debug(`${CLASSNAME} - newOrder`);

	const service = iocManager.resolve('serviceOrders') as ServiceOrders;
	const response = await service.newOrder(request.body, { logger });

	if (!response) {
		throw new ManagedError(
			'response is empty',
			EManagedError.RESPONSE_BODY_EMPTY,
		);
	}

	return reply.code(200).send(response);
};

export const ControllerRoutes = [
	{ method: 'GET', url: '/orders', handler: listOrders, config: {} },
	{
		method: 'POST',
		url: '/orders/new',
		handler: newOrder,
		config: {},
		schema: {
			body: {
				type: 'object',
				properties: {
					itemId: { type: 'string' },
					quantity: { type: 'number' },
				},
				required: ['itemId', 'quantity'],
			},
		},
	},
];
