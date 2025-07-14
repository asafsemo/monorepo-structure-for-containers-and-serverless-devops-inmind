import {
	asValue,
	IConfigTransport,
	IIocManager,
	ILogger,
	Lifetime,
	ParentBaseObject,
	RESOLVER,
} from '@pkg/lib-containers';

export default class ServiceEnvVar extends ParentBaseObject {
	public static [RESOLVER] = {
		lifetime: Lifetime.SINGLETON,
		priority: 0,
	};

	constructor(logger: ILogger, iocManager: IIocManager) {
		super(logger);

		const controllersPath = process.env['DYNAMIC_CONTROLLERS_PATH'];
		if (!controllersPath?.length) {
			throw new Error(
				'Missing or empty env var: DYNAMIC_CONTROLLERS_PATH',
			);
		}

		const strExtraHeaders = process.env['HTTP_EXTRA_HEADERS'] || '';
		let extraHeaders;
		if (strExtraHeaders.length > 0) {
			extraHeaders = JSON.parse(strExtraHeaders);
		}

		const configHttpServer: IConfigTransport = {
			port: +(process.env['HTTP_SERVER_PORT'] || '') || 8080,
			host: process.env['HTTP_SERVER_ADDRESS'] || '127.0.0.1',
			enableOpenapiUI:
				(process.env['OPENAPI_ENABLE'] || '').toLowerCase() === 'true',
			controllersPath: controllersPath.split(','),
			extraHeaders,
			fastifyLogger:
				(process.env['FASTIFY_LOGGER_ENABLE'] || '').toLowerCase() ===
				'true',
			openapiUiUrl: process.env['FASTIFY_OPENAPI_URL'] || '',
		};

		const urlPrefix = process.env['HTTP_SERVER_URLPREFIX'] || '';

		iocManager.register({
			configHttpServer: asValue(configHttpServer),
			urlPrefix: asValue(urlPrefix),
		});
	}
}
