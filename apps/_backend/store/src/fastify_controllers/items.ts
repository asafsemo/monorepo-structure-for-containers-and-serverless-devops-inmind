import {
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
	ILogger,
	ParentBaseObject,
} from '@pkg/lib-containers';
import { EManagedError, ManagedError } from '@pkg/lib-data';
import { ServiceItems } from '../services/serviceItems.js';
import { validateMandatoryObjectFields } from '@pkg/lib-core';

const CLASSNAME = 'controller-items';

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

const listItems = async (request: FastifyRequest, reply: FastifyReply) => {
	const { iocManager, logger } = request.extraData;
	logger.debug(`${CLASSNAME} - listItems`);

	const service = iocManager.resolve('serviceItems') as ServiceItems;
	const response = await service.listItems({ logger });

	if (!response) {
		throw new ManagedError(
			'response is empty',
			EManagedError.RESPONSE_BODY_EMPTY,
		);
	}

	return reply.code(200).send(response);
};

const listOverdueItems = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { iocManager, logger } = request.extraData;
	logger.debug(`${CLASSNAME} - listOverdueItems`);

	const service = iocManager.resolve('serviceItems') as ServiceItems;
	const response = await service.listOverdueItems({ logger });

	if (!response) {
		throw new ManagedError(
			'response is empty',
			EManagedError.RESPONSE_BODY_EMPTY,
		);
	}

	return reply.code(200).send(response);
};

const itemById = async (request: FastifyRequest, reply: FastifyReply) => {
	const { iocManager, logger } = request.extraData;
	logger.debug(`${CLASSNAME} - itemById`);

	const { id } = validateMandatoryObjectFields(request.params, ['id'], {
		errorMessage: 'Missing request param in path: {paramName}',
	});

	const service = iocManager.resolve('serviceItems') as ServiceItems;
	const response = await service.itemById(id, { logger });

	if (!response) {
		throw new ManagedError(
			'response is empty',
			EManagedError.RESPONSE_BODY_EMPTY,
		);
	}

	return reply.code(200).send(response);
};

const saveItem = async (request: FastifyRequest, reply: FastifyReply) => {
	const { iocManager, logger } = request.extraData;
	logger.debug(`${CLASSNAME} - saveItem`);

	const itemData = request.body;

	const service = iocManager.resolve('serviceItems') as ServiceItems;
	const response = await service.saveItem(itemData, { logger });

	if (!response) {
		throw new ManagedError(
			'response is empty',
			EManagedError.RESPONSE_BODY_EMPTY,
		);
	}

	return reply.code(200).send(response);
};

const copyItem = async (request: FastifyRequest, reply: FastifyReply) => {
	const { iocManager, logger } = request.extraData;
	logger.debug(`${CLASSNAME} - copyItem`);

	const { id } = validateMandatoryObjectFields(request.params, ['id'], {
		errorMessage: 'Missing request param in path: {paramName}',
	});

	const service = iocManager.resolve('serviceItems') as ServiceItems;
	const response = await service.copyItem(id, { logger });

	if (!response) {
		throw new ManagedError(
			'response is empty',
			EManagedError.RESPONSE_BODY_EMPTY,
		);
	}

	return reply.code(200).send(response);
};

const copyOverdueItem = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { iocManager, logger } = request.extraData;
	logger.debug(`${CLASSNAME} - copyOverdueItem`);

	const { id } = validateMandatoryObjectFields(request.params, ['id'], {
		errorMessage: 'Missing request param in path: {paramName}',
	});

	const service = iocManager.resolve('serviceItems') as ServiceItems;
	const response = await service.copyOverdueItem(id, { logger });

	if (!response) {
		throw new ManagedError(
			'response is empty',
			EManagedError.RESPONSE_BODY_EMPTY,
		);
	}

	return reply.code(200).send(response);
};

const setItemStatus = async (request: FastifyRequest, reply: FastifyReply) => {
	const { iocManager, logger } = request.extraData;
	logger.debug(`${CLASSNAME} - changeItemStatus`);

	const { id, status } = validateMandatoryObjectFields(
		request.body,
		['id', 'status'],
		{
			errorMessage: 'Missing request param in body: {paramName}',
		},
	);

	const service = iocManager.resolve('serviceItems') as ServiceItems;
	const response = await service.setItemStatus(id, status, { logger });

	if (!response) {
		throw new ManagedError(
			'response is empty',
			EManagedError.RESPONSE_BODY_EMPTY,
		);
	}

	return reply.code(200).send(response);
};

const checkItemAvailability = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { iocManager, logger } = request.extraData;
	logger.debug(`${CLASSNAME} - checkItemAvailability`);

	const { id } = validateMandatoryObjectFields(
		request.params as any,
		['id'],
		{
			errorMessage: 'Missing request param in path: {paramName}',
		},
	);

	const service = iocManager.resolve('serviceItems') as ServiceItems;
	const response = await service.checkItemAvailability(id, { logger });

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
		method: 'GET',
		url: '/items',
		handler: listItems,
		config: { authorizedRoles: ['asaf'] },
	},
	{
		method: 'GET',
		url: '/items/overdue',
		handler: listOverdueItems,
		config: {},
	},
	{ method: 'GET', url: '/items/:id', handler: itemById, config: {} },
	{
		method: 'PUT',
		url: '/items/save',
		handler: saveItem,
		config: {},
		schema: {
			body: {
				type: 'object',
				properties: {
					name: { type: 'string' },
					id: { type: 'string' },
				},
				required: ['name'],
			},
		},
	},
	{ method: 'POST', url: '/items/:id/copy', handler: copyItem, config: {} },
	{
		method: 'POST',
		url: '/items/overdue/:id/copy',
		handler: copyOverdueItem,
		config: {},
	},
	{
		method: 'PUT',
		url: '/items/setstatus',
		handler: setItemStatus,
		config: {},
		schema: {
			body: {
				type: 'object',
				properties: {
					id: { type: 'string' },
					status: { type: 'boolean' },
				},
				required: ['id', 'status'],
			},
		},
	},
	{
		method: 'GET',
		url: '/items/:id/availability',
		handler: checkItemAvailability,
		config: {},
	},
];
