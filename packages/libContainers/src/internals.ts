import { FastifyRequest } from 'fastify';
import { IIocManager, ILogger } from './interfaces.js';

export interface IRequestExtraData {
	trace: {
		steps: {
			[key: string]: number;
		};
	};
	logger: ILogger;
	iocManager: IIocManager;
	payloadLength: number;
	reqTypeExtra: string;
	reqType: string | string[];
	parseMultipartFormData: (
		request: FastifyRequest,
	) => Promise<{ fields: IMultipartField[]; files: IMultipartFile[] }>;
}

interface IMultipartField {}
interface IMultipartFile {}
