import { ILogger, IOptions, LoggerLevel } from './interfaces.js';

export abstract class ParentBaseObject {
	constructor(protected readonly logger: ILogger) {}

	protected extractOptions(funcName: string, options?: IOptions): IOptions {
		const logger = options?.logger || this.logger;

		let loggerFunc: Function | null = null;
		if (typeof logger?.getByLevel === 'function') {
			loggerFunc = logger.getByLevel(
				options?.overrideLogLevel || LoggerLevel.DEBUG,
			);
		}

		if (!loggerFunc && options?.overrideLogLevel) {
			const levelLowerCase =
				LoggerLevel[options?.overrideLogLevel].toLowerCase();
			if (typeof (logger as any)[levelLowerCase] === 'function') {
				loggerFunc = (logger as any)[levelLowerCase];
			}
		}

		if (!loggerFunc && typeof logger['warn'] === 'function') {
			loggerFunc = logger['warn'];
		}

		if (loggerFunc) {
			loggerFunc.call(logger, funcName);
		} else {
			console.log(
				`========>  ${funcName}  <========: with no default logger`,
			);
		}

		return { logger };
	}
}
