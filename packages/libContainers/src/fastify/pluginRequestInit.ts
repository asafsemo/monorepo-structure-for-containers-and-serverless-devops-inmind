import { FastifyPluginCallback, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';
import { IIocManager, ILogger, IOptions } from '../interfaces.js';
import { FastifyRequest } from '../index.js';

interface IPluginOptions {
	logger: ILogger;
	iocManager: IIocManager;
	extraHeaders: object;
	externalErrorHandler: (
		error: Error,
		request: FastifyRequest,
		reply: FastifyReply,
		options: IOptions,
	) => Promise<boolean>;
	externalValidationHandler: (
		request: FastifyRequest,
		options: IOptions,
	) => Promise<void>;
	externalAuthorizationHandler: (
		request: FastifyRequest,
		options: IOptions,
	) => Promise<void>;
	externalTracingHandler: (
		request: FastifyRequest,
		options: IOptions,
	) => Promise<any>;
}

const pluginRequestInit: FastifyPluginCallback<any> = (
	fastify,
	options: IPluginOptions,
	donePlugin,
) => {
	fastify
		.addHook(
			'onRequest',
			async (request: FastifyRequest, reply: FastifyReply) => {
				request.extraData = request.extraData || {};
				request.extraData.trace = request.extraData.trace || {};
				request.extraData.trace.steps = {};
				request.extraData.trace.steps['1-requestStart'] =
					request.extraData.trace.steps['1-requestStart'] ||
					Date.now();

				let overrideLoggerLevel = request.headers[
					'x-logger-level'
				] as string;
				let parentId = request.headers['x-trace-parent-id'] as string;

				let traceId: string = request.headers[
					'x-cloud-trace-context'
				] as string;
				traceId = (traceId && traceId.split('/')[0]) || '';

				if (typeof options?.externalTracingHandler === 'function') {
					const traceInfo = await options?.externalTracingHandler(
						request,
						{
							logger: options.logger,
						},
					);
					overrideLoggerLevel =
						traceInfo?.overrideLoggerLevel || overrideLoggerLevel;
					parentId = traceInfo?.parentId || parentId;
					traceId = traceInfo?.traceId || traceId;
				}

				const { logger, iocManager } = options;
				const requestLogger = logger.child('Request logger', {
					minLevel: overrideLoggerLevel,
					trace: {
						traceId,
						spanParent: parentId,
						apiName:
							(request.routeOptions?.config as any)?.apiName ||
							request.url,
					},
					// headers: request.headers,
				});
				request.extraData.logger = requestLogger;

				request.extraData.reqType =
					request.headers['x-request-type'] || '';
				requestLogger.complete(
					`Incoming HTTP request - ${request.url}`,
					{
						time: request.extraData.trace.steps['1-requestStart'],
						trace: {
							type:
								request.extraData.reqTypeExtra +
								request.raw.url,
						},
					},
				);

				traceId = traceId || requestLogger.getTraceContext()!.traceId;
				reply.headers({ 'x-cloud-trace-context': traceId });
				if (options.extraHeaders) {
					reply.headers(options.extraHeaders);
				}

				request.extraData.iocManager = iocManager;

				request.extraData.parseMultipartFormData =
					parseMultipartFormData;
			},
		)
		.addHook('preParsing', (request, _reply, _payload, done) => {
			request.extraData.trace.steps['2-preParsing'] =
				request.extraData.trace.steps['2-preParsing'] || Date.now();
			const { logger } = request.extraData;
			const p = logger?.debug || console.log;
			p.call(logger, '2-preParsing');
			done();
		})
		.addHook('preValidation', (request, _reply, done) => {
			request.extraData.trace.steps['3-preValidation'] =
				request.extraData.trace.steps['3-preValidation'] || Date.now();
			const { logger } = request.extraData;
			const p = logger?.debug || console.log;
			p.call(logger, '3-preValidation');
			if (typeof options?.externalValidationHandler === 'function') {
				options?.externalValidationHandler(request, { logger });
			}
			done();
		})
		.addHook('preHandler', (request, _reply, done) => {
			request.extraData.trace.steps['4-preHandler'] =
				request.extraData.trace.steps['4-preHandler'] || Date.now();
			const { logger } = request.extraData;
			const p = logger?.debug || console.log;
			p.call(logger, '4-preHandler');
			if (typeof options?.externalAuthorizationHandler === 'function') {
				options?.externalAuthorizationHandler(request, { logger });
			}
			done();
		})
		.addHook('preSerialization', (request, _reply, payload, done) => {
			request.extraData.trace.steps['1-preSerialization'] =
				request.extraData.trace.steps['1-preSerialization'] ||
				Date.now();
			const { logger } = request.extraData;
			const p = logger?.debug || console.log;
			p.call(logger, 'preSerialization', { payload });
			done();
		})
		.addHook('onError', (request, _reply, error, done) => {
			let p = console.error;
			const { logger } = request.extraData;
			try {
				request.extraData.trace.steps['1-onError'] =
					request.extraData.trace.steps['1-onError'] || Date.now();
				p = logger?.error || console.error;
				p.call(logger, `onError - ${error.message}`, {
					error: error.toString(),
					stack: error.stack,
				});
			} catch (err: any) {
				p.call(logger, 'Exeception', { stack: err.stack });
			} finally {
				done();
			}
		})
		.addHook('onSend', (request, _reply, payload, done) => {
			request.extraData.trace.steps['1-onSend'] =
				request.extraData.trace.steps['1-onSend'] || Date.now();
			const { logger } = request.extraData;
			const p = logger?.debug || console.log;
			request.extraData.payloadLength = 0;
			if (payload) {
				const strPayload = payload as string;
				p.call(logger, `onSend - ${strPayload.length}`, { payload });
				request.extraData.payloadLength = strPayload.length;
			}
			p.call(logger, '4-onSend');
			done();
		})
		.addHook('onResponse', (request, _reply, done) => {
			request.extraData.trace.steps['1-onResponse'] =
				request.extraData.trace.steps['1-onResponse'] || Date.now();
			const { logger } = request.extraData;
			const p = logger?.complete || console.log;
			p.call(logger, 'Request complete', {
				trace: { responseSize: request.extraData.payloadLength },
			});
			done();
		})
		.addHook('onTimeout', (request, _reply, done) => {
			request.extraData.trace.steps['1-onTimeout'] =
				request.extraData.trace.steps['1-onTimeout'] || Date.now();
			const { logger } = request.extraData;
			const p = logger?.warn || console.log;
			p.call(logger, 'onTimeout');
			done();
		})
		.addHook('onRequestAbort', (request, done) => {
			request.extraData.trace.steps['1-requestStart'] =
				request.extraData.trace.steps['1-requestStart'] || Date.now();
			const { logger } = request.extraData;
			const p = logger?.warn || console.log;
			p.call(logger, 'onRequestAbort');
			done();
		})
		.setErrorHandler(async (error, request, reply) => {
			const { logger } = request.extraData;
			logger.error('Error in request', { request, error });
			let isHandled = false;
			try {
				if (typeof options.externalErrorHandler === 'function') {
					isHandled = await options.externalErrorHandler(
						error,
						request,
						reply,
						{ logger },
					);
				}
			} catch (err) {
				logger.error('Error in externalErrorHandler', {
					error: err,
					innerError: error,
					request,
					reply,
				});
			}
			if (isHandled) {
				return;
			}
			const httpCode = 500;
			const responseObj = {
				error: error.message,
				stack: error.stack,
			};
			return reply.status(httpCode).send(responseObj);
		});

	donePlugin();
};

export default fp(pluginRequestInit, '4.x');

const parseMultipartFormData = async (request: FastifyRequest) => {
	const parts = request.parts();
	const retVal: { fields: any[]; files: any[] } = { fields: [], files: [] };
	for await (const part of parts) {
		if (part.type === 'file') {
			//   await pump(part.file, fs.createWriteStream(part.filename))
			retVal.files.push({
				filename: part.filename,
				bufferFile: await part.toBuffer(),
				encoding: part.encoding,
				mimeType: part.mimetype,
			});
		} else {
			// part.type === 'field
			retVal.fields.push({ name: part.fieldname, value: part.value });
		}
	}
	return retVal;
};
