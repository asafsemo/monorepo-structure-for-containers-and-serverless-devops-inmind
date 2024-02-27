export interface IIocManager {
	registrations: object;
	loadModules(paths: string[], options: object): Promise<unknown>;
	resolve(token: string): unknown;
	register(obj: object): void;
}

export interface IService {
	start(options?: IOptions): Promise<void>;
	stop(options?: IOptions): Promise<void>;
}

export enum LoggerLevel {
	FATAL = 10,
	ERROR = 20,
	WARN = 30,
	INFO = 40,
	DEBUG = 50,
}

export interface ITraceInfo {
	traceId: string;
	spanParent: string | undefined;
	apiName?: string | undefined;
}

export interface IConfigLogger {
	minLevel: string;
	trace?: ITraceInfo;
	printTraceInfo?: boolean;
	maxExtraDataLength?: number;
}

export interface ILogger {
	fatal(message: string, extraData?: object): ILogger;
	error(message: string, extraData?: object): ILogger;
	warn(message: string, extraData?: object): ILogger;
	info(message: string, extraData?: object): ILogger;
	debug(message: string, extraData?: object): ILogger;
	complete(message: string, extraData?: object): ILogger;
	child(name: string, options?: IConfigLogger): ILogger;
	getTraceContext(): ITraceInfo | undefined;
	addContext(): ILogger;
	getByLevel(
		level: LoggerLevel,
	): (message: string, extraData?: object) => ILogger;
}

export interface IOptions {
	logger: ILogger;
	overrideLogLevel?: LoggerLevel;
}
