import * as fastifyMultipart from '@fastify/multipart';
import { BusboyConfig } from '@fastify/busboy';

import { IRequestExtraData } from './internals.js';

export type { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
export { asValue, asClass, RESOLVER, Lifetime } from 'awilix';
export * from './interfaces.js';

// export * from './semoServer.js';
export * from './parentBaseObject.js';
export * from './fastify/fastifyHttpTransport.js';
// export * from './httpRequestError.js';

declare module 'fastify' {
	export interface FastifyRequest {
		extraData: IRequestExtraData;

		parts: (
			options?: Omit<BusboyConfig, 'headers'>,
		) => AsyncIterableIterator<fastifyMultipart.Multipart>;
	}
}
