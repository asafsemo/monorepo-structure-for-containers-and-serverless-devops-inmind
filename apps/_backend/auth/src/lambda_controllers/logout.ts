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
import ServiceAuth from '../services/serviceAuth.js';
import {
	handleError,
	EmailSender,
	validateMandatoryObjectFields,
} from '@pkg/lib-core';

const filename = path.basename(import.meta.url);
const awsLogger: any = new Logger({ serviceName: filename });
const tracer = new Tracer({ serviceName: filename });

const emailSender = new EmailSender(awsLogger);

const service = new ServiceAuth(awsLogger, emailSender);

export const awsLambdaHandler = async (
	event: APIGatewayEvent,
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

		const { category: _category, id: _id } = validateMandatoryObjectFields(
			event?.queryStringParameters,
			['category', 'id'],
			{
				errorMessage: 'Missing request query param: {paramName}',
			},
		);

		const response = await service.logout({ logger });
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
