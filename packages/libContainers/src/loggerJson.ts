import { inspect } from 'node:util';
import { ILoggerLevelConfig, Logger } from './logger.js';
import { IConfigLogger } from './interfaces.js';

export class LoggerJson extends Logger {
	protected override newLogger(name: string, newOptions: IConfigLogger) {
		return new LoggerJson(name, newOptions);
	}

	protected override buildOutput(
		message: string,
		level: ILoggerLevelConfig,
		extraData?: object,
	): string {
		// let strMessage = message;
		const jsonOutput: any = {
			ts: new Date().toISOString(),
			msg: message,
			level: level.log,
			loggerName: this.name,
		};
		if (this.printTraceInfo && this.trace?.traceId?.length) {
			jsonOutput.trace = this.trace;
		}
		if (this.maxExtraDataLength > 0 && extraData) {
			jsonOutput.extraData = {
				data: inspect(extraData, { depth: null, compact: true })
					.replaceAll('\n', ' ')
					.replaceAll('  ', '')
					.substring(0, this.maxExtraDataLength),
			};
		}

		return JSON.stringify(jsonOutput);
	}
}
