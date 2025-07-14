import {
	IIocManager,
	ILogger,
	IOptions,
	IService,
	Lifetime,
	ParentBaseObject,
	RESOLVER,
} from '@pkg/lib-containers';

export default class ServiceCronjobRunner
	extends ParentBaseObject
	implements IService
{
	public static [RESOLVER] = {
		lifetime: Lifetime.SINGLETON,
		priority: 3,
	};

	constructor(
		logger: ILogger,
		private readonly iocManager: IIocManager,
	) {
		super(logger);
	}

	public async start(options?: IOptions): Promise<void> {
		const funcName = 'start';
		const { logger } = super.extractOptions(
			`${this.constructor.name} - ${funcName}`,
			options,
		);

		const cronjobName = (
			process.env['CRON_JOB_NAME'] ||
			process.argv[2] ||
			''
		).toLowerCase();
		const job = this.iocManager.resolve(cronjobName) as any;
		try {
			await job.run({ logger });
		} catch (err) {
			logger.error('Running cronjob error', { cronjobName, error: err });
			throw err;
		} finally {
			process.exit(0);
		}
	}

	public async stop(options?: IOptions): Promise<void> {
		const funcName = 'stop';
		const { logger: _logger } = super.extractOptions(
			`${this.constructor.name} - ${funcName}`,
			options,
		);
	}
}
