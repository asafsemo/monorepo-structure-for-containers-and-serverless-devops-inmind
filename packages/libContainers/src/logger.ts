import { inspect } from 'node:util';
import chalk, { ChalkInstance } from 'chalk';
import {
	IConfigLogger,
	ILogger,
	ITraceInfo,
	LoggerLevel,
} from './interfaces.js';

interface IInternalTraceInfo extends ITraceInfo {
	spanId: string;
}
interface IInternalConfigLogger extends IConfigLogger {
	trace: IInternalTraceInfo;
}

export interface ILoggerLevelConfig {
	rank: LoggerLevel;
	chalk: ChalkInstance;
	log: string;
}

const levelsConfig: { [key: string]: ILoggerLevelConfig } = {
	DEBUG: { rank: LoggerLevel.DEBUG, chalk: chalk.gray, log: 'DEBUG' },
	INFO: { rank: LoggerLevel.INFO, chalk: chalk.green, log: 'INFO' },
	WARN: { rank: LoggerLevel.WARN, chalk: chalk.yellow, log: 'WARN' },
	ERROR: { rank: LoggerLevel.ERROR, chalk: chalk.redBright, log: 'ERROR' },
	FATAL: { rank: LoggerLevel.FATAL, chalk: chalk.redBright, log: 'FATAL' },
};

const getRandomHexStringId = (strlen: number): string => {
	return `0x${[...Array<number>(strlen)]
		.map(() => {
			return Math.floor(Math.random() * 16).toString(16);
		})
		.join('')}`;
};

export class Logger implements ILogger {
	protected readonly minLevel: number = LoggerLevel.INFO;
	protected readonly trace?: IInternalTraceInfo;
	protected readonly printTraceInfo: boolean = true;
	protected readonly maxExtraDataLength: number = 2000;

	constructor(
		protected readonly name: string,
		options?: IConfigLogger,
	) {
		this.name = name.replaceAll(' ', '_');
		const level = (options?.minLevel || 'info').toUpperCase();
		const loggerLevel = levelsConfig[level];
		if (loggerLevel) {
			this.minLevel = loggerLevel.rank;
		}
		if (options?.trace) {
			this.trace = {
				traceId: options.trace.traceId,
				spanId: (options.trace as any).spanId,
				spanParent: options.trace.spanParent,
				apiName: options.trace.apiName,
			};
		}
		this.printTraceInfo = options?.printTraceInfo ?? true;
		this.maxExtraDataLength = options?.maxExtraDataLength ?? this.maxExtraDataLength;
	}

	public getByLevel(
		level: LoggerLevel,
	): (message: string, extraData?: object) => ILogger {
		// eslint-disable-next-line max-len
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
		const retVal = (this as any)[LoggerLevel[level].toLowerCase()];
		if (typeof retVal === 'function') {
			// eslint-disable-next-line max-len
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
			return retVal.bind(this);
		}
		return this.debug.bind(this);
	}

	public getTraceContext(): ITraceInfo | undefined {
		return this.trace;
	}

	public debug(message: string, extraData?: object): ILogger {
		return this.log(levelsConfig['DEBUG'], message, extraData);
	}

	public info(message: string, extraData?: object): ILogger {
		return this.log(levelsConfig['INFO'], message, extraData);
	}

	public warn(message: string, extraData?: object): ILogger {
		return this.log(levelsConfig['WARN'], message, extraData);
	}

	public error(message: string, extraData?: object): ILogger {
		return this.log(levelsConfig['ERROR'], message, extraData);
	}

	public fatal(message: string, extraData?: object): ILogger {
		return this.log(levelsConfig['FATAL'], message, extraData);
	}

	public complete(message: string, extraData?: object): ILogger {
		return this.log(levelsConfig['INFO'], message, extraData, true);
	}

	public child(name: string, options?: IConfigLogger): ILogger {
		const newOptions: IInternalConfigLogger = {
			minLevel: '',
			trace: {
				traceId: '',
				spanId: '',
				spanParent: undefined,
				apiName: '',
			},
		};
		newOptions.trace!.traceId =
			options?.trace?.traceId ||
			this.trace?.traceId ||
			getRandomHexStringId(32);
		newOptions.trace!.spanId = getRandomHexStringId(32);
		newOptions.trace!.spanParent =
			options?.trace?.spanParent || this.trace?.spanId;
		newOptions.trace.apiName =
			this.trace?.apiName || options?.trace?.apiName;

		if (
			Object.prototype.hasOwnProperty.call(
				levelsConfig,
				(options?.minLevel || '').toUpperCase(),
			)
		) {
			newOptions.minLevel = options!.minLevel;
		}
		if (!newOptions.minLevel.length && this.minLevel) {
			newOptions.minLevel = LoggerLevel[this.minLevel]!;
		}
		newOptions.printTraceInfo =
			options?.printTraceInfo || this.printTraceInfo;
		newOptions.maxExtraDataLength =
			options?.maxExtraDataLength || this.maxExtraDataLength;

		return this.newLogger(name, newOptions);
	}

	public addContext(): ILogger {
		return this;
	}
	// eslint-disable-next-line class-methods-use-this
	protected newLogger(name: string, newOptions: IConfigLogger) {
		return new Logger(name, newOptions);
	}

	protected buildOutput(
		message: string,
		level: ILoggerLevelConfig,
		extraData?: object,
	): string {
		let strMessage = message;
		if (this.printTraceInfo && this.trace?.traceId?.length) {
			strMessage += `\n\ttrace: ${JSON.stringify(this.trace)}`;
		}
		let extraDataStr = '';
		if (this.maxExtraDataLength > 0 && extraData) {
			extraDataStr = `\n\textraData: ${inspect(extraData, {
				depth: null,
				compact: true,
			})
				.replaceAll('\n', ' ')
				.replaceAll('  ', '')}`.substring(0, this.maxExtraDataLength);
		}
		strMessage += extraDataStr;
		return `${new Date().toISOString()} ${level.log}\t${
			this.name
		}\t${strMessage}`;
	}

	private log(
		pLevel: ILoggerLevelConfig | undefined,
		message: string,
		extraData?: object,
		pPrint = false,
	): ILogger {
		const level = pLevel || {
			rank: 10,
			chalk: chalk.red,
			log: 'UNDEFINED',
		};
		const print = level.log === 'UNDEFINED' || pPrint;

		if (!(print || +level.rank <= this.minLevel)) {
			return this;
		}

		// eslint-disable-next-line no-console

		console.log(level.chalk(this.buildOutput(message, level, extraData)));
		return this;
	}
}
