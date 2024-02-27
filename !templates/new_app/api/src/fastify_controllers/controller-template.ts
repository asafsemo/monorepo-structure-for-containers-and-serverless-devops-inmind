import {
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
	ILogger,
	ParentBaseObject,
} from '@pkg/lib-containers';

const CLASSNAME = 'controller';

export default class ControllerTemplate extends ParentBaseObject {
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

const getByVendor = (request: FastifyRequest, reply: FastifyReply) => {
	const { iocManager, logger } = request.extraData;
	logger.debug(`${CLASSNAME} - getByVendor`);

	let serviceName = iocManager.resolve('serviceName') as string;
	if (!serviceName?.length) {
		serviceName = '{Service name is NOT set}';
	}

	return reply.code(200).send(`OK response - ${serviceName}`);
};

export const ControllerRoutes = [
	{
		method: 'GET',
		url: '/items/list',
		handler: getByVendor,
		config: { authorizedRoles: ['asaf'] },
	},
	{ method: 'GET', url: '/items/overdue', handler: getByVendor, config: {} },
	{ method: 'GET', url: '/items/item', handler: getByVendor, config: {} },
	{ method: 'GET', url: '/items/save', handler: getByVendor, config: {} },
	{ method: 'GET', url: '/items/copy', handler: getByVendor, config: {} },
	{
		method: 'GET',
		url: '/items/overduecopy',
		handler: getByVendor,
		config: {},
	},
	{
		method: 'GET',
		url: '/items/changestatus',
		handler: getByVendor,
		config: {},
	},
	{
		method: 'GET',
		url: '/items/availability',
		handler: getByVendor,
		config: {},
	},
];
