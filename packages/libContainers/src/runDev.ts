import path from 'node:path';
import dotenv from 'dotenv';
import { ILogger } from './interfaces.js';
import { SemoServer } from './semoServer.js';
import { LoggerJson } from './loggerJson.js';
import { Logger } from './logger.js';

const nodeEnv = process.env['NODE_ENV'] || 'development';
if (nodeEnv !== 'production') {
	// only in dev - no need in production
	dotenv.config({ path: './.env', debug: true });
}

const serviceName = process.env['APP_NAME'] || '{APP_NAME env is not set}';
const minLevel = process.env['LOGGER_LEVEL'] || 'info';
const printTraceInfo =
	process.env['LOGGER_TRACEINFO_ENABLE']?.toLowerCase() !== 'false';
const maxExtraDataLength = +(process.env['LOGGER_EXTRADATA_LENGTH'] || 2000);
const loggerOptions = { minLevel, printTraceInfo, maxExtraDataLength };

let logger: ILogger = new LoggerJson(serviceName || '', loggerOptions);
if (process.env['LOGGER_JSON']?.toString().toLowerCase() === 'false') {
	logger = new Logger(serviceName || '', loggerOptions);
}
let runtimeLoadPath = process.env['DYNAMIC_RUNTIME_PATH'] || '';

if (!runtimeLoadPath?.length) {
	runtimeLoadPath = './dist/runtime_load/**/*.js';
	logger.warn(
		`Environment var DYNAMIC_RUNTIME_PATH is not defined or empty, using default path: ${runtimeLoadPath}`,
	);
}
const projectRoot = process.env['PWD'] || process.env['INIT'] || '';
if (!projectRoot?.length) {
	throw Error('projectRoot in env var pwd is not set');
}
let modulePaths = runtimeLoadPath.split(',');
modulePaths = modulePaths.map((mPath) => {
	if (path.isAbsolute(mPath)) {
		return mPath;
	}
	return path.join(projectRoot, mPath);
});

async function start() {
	const server = new SemoServer(logger);
	await (await server.wrapShutdown().init(modulePaths, serviceName)).start();
}

logger.complete(`${serviceName} - service starting....`);
start()
	.then(() => {
		logger.complete(`${serviceName} - service started successfully!`);
	})
	.catch((error: unknown) => {
		let stack;
		if (error instanceof Error) {
			stack = error.stack;
		}
		logger.fatal(`${serviceName} - Server cant start`, { err: stack });
		process.exit(1);
	});
