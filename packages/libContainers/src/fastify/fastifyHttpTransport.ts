import Fastify, {
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
} from 'fastify';
import { asValue } from 'awilix';
import { fastifyMultipart } from '@fastify/multipart';
import { IIocManager, ILogger, IOptions } from '../interfaces.js';
import { ParentBaseObject } from '../parentBaseObject.js';
import pluginRequestInit from './pluginRequestInit.js';

export interface IConfigTransport {
	host: string;
	port: number;
	enableOpenapiUI: boolean;
	controllersPath: string[];
	extraHeaders?: object | undefined;
	openapiUiUrl?: string;
	fastifyLogger?: boolean;
}

const CLASSNAME = 'FastifyHttpTransport';

export class FastifyHttpTransport extends ParentBaseObject {
	private httpListener: FastifyInstance;
	private isLoaded = false;

	constructor(
		logger: ILogger,
		private readonly config: IConfigTransport,
		private readonly iocManager: IIocManager,
		private readonly options?: {
			externalErrorHandler?: (
				error: Error,
				request: FastifyRequest,
				reply: FastifyReply,
				options: IOptions,
			) => Promise<boolean>;
			externalValidationHandler?: (
				request: FastifyRequest,
				options: IOptions,
			) => Promise<void>;
			externalAuthorizationHandler?: (
				request: FastifyRequest,
				options: IOptions,
			) => Promise<void>;
			externalTracingHandler?: (
				request: FastifyRequest,
				options: IOptions,
			) => Promise<any>;
			customTitle?: string;
		},
	) {
		super(logger);

		this.httpListener = Fastify({ logger: this.config.fastifyLogger || false });
	}

	public async start(options?: IOptions) {
		const funcName = `${CLASSNAME} - start`;
		const { logger } = this.extractOptions(funcName, options);

		if (!this.isLoaded) {
			await this.httpListener.register(pluginRequestInit, {
				logger,
				iocManager: this.iocManager,
				extraHeaders: this.config.extraHeaders,
				externalErrorHandler: this.options?.externalErrorHandler,
				externalValidationHandler:
					this.options?.externalValidationHandler,
				externalAuthorizationHandler:
					this.options?.externalAuthorizationHandler,
			});
			await this.httpListener.register(fastifyMultipart);

			if (this.config.enableOpenapiUI) {
				this.config.openapiUiUrl =
					this.config.openapiUiUrl || '/api/docs';
				const fastifySwagger = await import('@fastify/swagger');
				await this.httpListener.register(
					fastifySwagger.fastifySwagger,
					{},
				);

				const fastifySwaggerUI = await import('@fastify/swagger-ui');
				await this.httpListener.register(
					fastifySwaggerUI.fastifySwaggerUi,
					{
						routePrefix: this.config.openapiUiUrl,
						theme: {
							title: this.options?.customTitle,
						},
					},
				);
			}

			if (this.config.extraHeaders) {
				this.httpListener.options(
					'*',
					{},
					(_request: FastifyRequest, reply: FastifyReply) => {
						return reply
							.headers(this.config.extraHeaders!)
							.code(200)
							.send({});
					},
				);
			}

			// this.httpListener.register(requestTraceHeaders);
			// this._httpServer.register(registerErrorHandler, { config: this._config });
			this.iocManager.register({
				fastify: asValue(this.httpListener),
			});
			await this.load({ logger });
			this.isLoaded = true;
		}

		const { port, host } = this.config;
		await this.httpListener.ready();
		const address = await this.httpListener.listen({ port, host });

		logger.info(`server listening - ${address}`);
		if (this.config.enableOpenapiUI) {
			logger.info(
				`OpenAPI UI url - ${new URL(
					this.config.openapiUiUrl!,
					address,
				)}`,
			);
		}
	}

	public stop(options?: IOptions) {
		const funcName = `${CLASSNAME} - stop`;
		const { logger: _logger } = this.extractOptions(funcName, options);
		return this.httpListener.close();
	}

	private async load(options?: IOptions) {
		const funcName = `${CLASSNAME} - load`;
		const { logger: _logger } = this.extractOptions(funcName, options);

		const currentIocKeys = Object.keys(this.iocManager.registrations);
		await this.iocManager.loadModules(this.config.controllersPath, {
			esModules: true,
		});

		Object.keys(this.iocManager.registrations).forEach((key) => {
			if (currentIocKeys.includes(key)) {
				return;
			}
			this.iocManager.resolve(key);
		});
	}
}
