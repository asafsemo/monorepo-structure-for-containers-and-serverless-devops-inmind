import {
	IIocManager,
	ILogger,
	IOptions,
	IService,
	Lifetime,
	ParentBaseObject,
	RESOLVER,
	FastifyHttpTransport,
	IConfigTransport,
	FastifyRequest,
	FastifyReply,
} from '@pkg/lib-containers';
import { handleError } from '@pkg/lib-core';
import { ManagedError } from '@pkg/lib-data';

const CLASSNAME = 'ServiceHttp';

export default class ServiceHttp extends ParentBaseObject implements IService {
	public static [RESOLVER] = {
		lifetime: Lifetime.SINGLETON,
		priority: 4,
	};

	private readonly transport: FastifyHttpTransport;

	constructor(
		logger: ILogger,
		iocManager: IIocManager,
		configHttpServer: IConfigTransport,
	) {
		super(logger);
		this.transport = new FastifyHttpTransport(
			logger,
			configHttpServer,
			iocManager,
			{
				externalErrorHandler: this.externalErrorHandler,
				externalValidationHandler: this.externalValidationHandler,
				externalAuthorizationHandler: this.externalAuthorizationHandler,
				externalTracingHandler: this.externalTracingHandler,
				customTitle: 'Auth service API',
			},
		);
	}

	public async start(options?: IOptions): Promise<void> {
		const funcName = `${CLASSNAME} - start`;
		const { logger: _logger } = super.extractOptions(funcName, options);

		return this.transport.start();
	}

	public async stop(options?: IOptions): Promise<void> {
		const funcName = `${CLASSNAME} - stop`;
		const { logger: _logger } = super.extractOptions(funcName, options);

		return this.transport.stop();
	}

	private async externalErrorHandler(
		error: Error,
		_request: FastifyRequest,
		reply: FastifyReply,
		options: IOptions,
	): Promise<boolean> {
		const funcName = `${CLASSNAME} - externalErrorHandler`;
		const { logger: _logger } = super.extractOptions(funcName, options);

		if (error instanceof ManagedError) {
			const { retErr, httpErrorCode } = handleError(error);
			reply.status(httpErrorCode).send(retErr);
			return true;
		}

		return false;
	}

	private async externalValidationHandler(
		_request: FastifyRequest,
		options: IOptions,
	): Promise<void> {
		const funcName = `${CLASSNAME} - externalValidationHandler`;
		const { logger: _logger } = super.extractOptions(funcName, options);

		// console.log(request.routeOptions.config)
	}

	private async externalAuthorizationHandler(
		_request: FastifyRequest,
		options: IOptions,
	): Promise<void> {
		const funcName = `${CLASSNAME} - externalAuthorizationHandler`;
		const { logger: _logger } = super.extractOptions(funcName, options);

		// console.log(request.routeOptions.config)
	}

	private async externalTracingHandler(
		_request: FastifyRequest,
		options: IOptions,
	): Promise<any> {
		const funcName = `${CLASSNAME} - externalTracingHandler`;
		const { logger: _logger } = super.extractOptions(funcName, options);

		return false;
	}
}
