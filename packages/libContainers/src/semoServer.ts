import {
	createContainer,
	InjectionMode,
	asValue,
	AwilixContainer,
} from 'awilix';
import { ParentBaseObject } from './parentBaseObject.js';
import { ILogger, IOptions } from './interfaces.js';

(await import('source-map-support')).install();

const CLASSNAME = 'SemoServer';

export class SemoServer extends ParentBaseObject {
	private services: Map<number, string[]>;
	private iocManager: AwilixContainer<any>;
	private isRunning = false;
	private maxPriority = 0;

	constructor(logger: ILogger) {
		super(logger);
		this.services = new Map<number, string[]>();
		this.iocManager = createContainer({
			injectionMode: InjectionMode.CLASSIC,
		});
	}

	public async init(
		modulesPaths: string[],
		serviceName: string,
		options?: IOptions,
	): Promise<SemoServer> {
		const funcName = `${CLASSNAME} - init`;
		const { logger: _logger } = this.extractOptions(funcName, options);

		await this.iocManager.loadModules(modulesPaths, { esModules: true });
		this.iocManager.register({
			logger: asValue(this.logger),
			iocManager: asValue(this.iocManager),
			serviceName: asValue(serviceName),
		});

		Object.entries(this.iocManager.registrations).forEach(
			([key, obj]: [string, any]) => {
				if (
					!obj?.lifetime ||
					obj.lifetime.toLowerCase() !== 'singleton'
				) {
					return;
				}

				const priority: number = obj.priority || 0;
				if (priority === -1) {
					return;
				}
				this.maxPriority = Math.max(this.maxPriority, priority);

				let pServices: string[] | undefined =
					this.services.get(priority);
				if (!pServices) {
					this.services.set(priority, []);
					pServices = this.services.get(priority);
				}
				pServices!.push(key);
			},
		);

		return this;
	}

	public async start(options?: IOptions): Promise<SemoServer> {
		const funcName = `${CLASSNAME} - start`;
		const { logger } = this.extractOptions(funcName, options);

		if (this.isRunning) {
			return this;
		}

		const numberKeys = [...Array(this.maxPriority + 1).keys()];
		await this.runFunctionsOnServices(numberKeys, 'start', { logger });
		this.isRunning = true;

		return this;
	}

	public wrapShutdown(options?: IOptions): SemoServer {
		const funcName = `${CLASSNAME} - wrapShutdown`;
		const { logger } = this.extractOptions(funcName, options);

		const self = this;
		function shutdown(source: string, error?: Error) {
			self.logger.info(`Shutting down.... source: ${source}`);
			let processExitValue = 0;
			if (error) {
				console.error(error);
				self.logger.fatal(error.toString(), { err: error.stack });
				processExitValue = 10;
			}
			setTimeout(() => {
				self.logger.error('Shutdown after timeout!');
				process.exit(6);
			}, 3000);

			const numberKeys = [
				...Array(self.maxPriority + 1).keys(),
			].reverse();
			self.runFunctionsOnServices(numberKeys, 'stop', { logger });
			self.isRunning = false;

			self.logger.info(`Shutdown! - (clean) - ${processExitValue}`);
			process.exit(processExitValue);
		}

		// catch all the ways node might exit
		// process.on('beforeExit', () => { shutdown('beforeExit') });
		process.on('exit', () => {
			shutdown('exit');
		});
		process.on('uncaughtException', (error) => {
			shutdown('uncaughtException', error);
		});
		process.on('SIGINT', () => {
			shutdown('SIGINT');
		});
		process.on('SIGQUIT', () => {
			shutdown('SIGQUIT');
		});
		process.on('SIGTERM', () => {
			shutdown('SIGTERM');
		});

		// PM2 sends IPC message for graceful shutdown
		process.on('message', (message) => {
			if (message === 'shutdown') {
				shutdown('message');
			}
		});

		return this;
	}

	private async runFunctionsOnServices(
		numberKeys: number[],
		runFunc: string,
		options?: IOptions,
	): Promise<void> {
		const funcName = `${CLASSNAME} - runFunctionsOnServices`;
		const { logger } = this.extractOptions(funcName, options);

		for await (const key of numberKeys) {
			const names = this.services.get(key);
			if (!names?.length) {
				continue;
			}

			const p = names.map((serviceName) => {
				const localService = this.iocManager.resolve(serviceName);
				if (typeof localService[runFunc] === 'function') {
					return localService[runFunc]({ logger });
				}
			});
			await Promise.all(p);
		}
	}
}
