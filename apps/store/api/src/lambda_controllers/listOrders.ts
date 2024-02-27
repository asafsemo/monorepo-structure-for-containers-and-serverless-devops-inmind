// sort-imports-ignore
import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import path from 'node:path';
import { APIGatewayEvent, Context } from 'aws-lambda';
import {
	buildApiGatewayCustomStatusCode,
	buildApiGatewayOkResponse,
} from 'aws-lambda-response-builder';
import { Logger } from '@aws-lambda-powertools/logger';
import { Tracer } from '@aws-lambda-powertools/tracer';

import { ManagedError, EManagedError } from '@pkg/lib-data';
import { ILogger } from '@pkg/lib-containers';
import { MemoryCache, handleError } from '@pkg/lib-core';
import { ServiceOrders } from '../services/serviceOrders.js';

const filename = path.basename(import.meta.url);
const awsLogger: any = new Logger({ serviceName: filename });
const tracer = new Tracer({ serviceName: filename });

const memoryCache = new MemoryCache(awsLogger);
const service = new ServiceOrders(awsLogger, memoryCache);

export const awsLambdaHandler = async (
	_event: APIGatewayEvent,
	context: Context,
	currentLogger?: ILogger,
) => {
	let logger = awsLogger;

	if (currentLogger && currentLogger['info']) {
		logger = currentLogger;
	}

	tracer.getSegment();
	logger.addContext(context);

	try {
		logger.info('Request start', {
			data: { functionRequestId: context.awsRequestId || 'noRequestId' },
		});

		const response = await service.listOrders({ logger });
		if (!response) {
			throw new ManagedError(
				'response is empty',
				EManagedError.RESPONSE_BODY_EMPTY,
			);
		}

		return buildApiGatewayOkResponse(response);
	} catch (error) {
		const { httpErrorCode, retErr } = handleError(error);
		logger.error('Lambda error', { httpErrorCode, retErr });

		return buildApiGatewayCustomStatusCode(httpErrorCode, retErr);
	} finally {
		logger.info('Request end');
	}
};
