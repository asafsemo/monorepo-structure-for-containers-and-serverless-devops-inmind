import dotenv from 'dotenv';
import fastify, {
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
} from 'fastify';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'node:path';
import {
	APIGatewayProxyEvent,
	APIGatewayProxyEventQueryStringParameters,
	Context,
} from 'aws-lambda';
import { Logger } from './logger.js';

interface IServerConfig {
	controllersPath: string;
	prefixUrl?: string;
	port: number;
}

export class ServerlessLocalRun {
	private readonly logger: Logger;
	private readonly server: FastifyInstance;
	private readonly controllers: { [key: string]: any };

	constructor(private readonly serverConfig: IServerConfig) {
		const serviceName =
			process.env['APP_NAME'] || '{APP_NAME env is not set}';
		const configLogger = {
			minLevel: process.env['LOGGER_LEVEL'] || 'info',
			printTraceInfo:
				process.env['LOGGER_TRACEINFO_ENABLE']?.toLowerCase() !==
				'false',
			maxExtraDataLength: +(
				process.env['LOGGER_EXTRADATA_LENGTH'] || 2000
			),
		};
		this.logger = new Logger(serviceName, configLogger);
		this.serverConfig.prefixUrl = this.serverConfig.prefixUrl || '';
		this.controllers = [];

		this.server = fastify({ logger: false });
	}

	public async start() {
		const p = this.loadRoutes();
		await Promise.all(p);
		const address = await this.server.listen({
			port: this.serverConfig.port,
		});
		this.logger.complete(
			`Server listening on http://localhost:${this.serverConfig.port}`,
			{ address },
		);
	}

	private loadRoutes(): Promise<any>[] {
		// TODO: add config params serverless yaml file and path
		const fileContents = fs.readFileSync('serverless.yml', 'utf8');
		const data: any = yaml.load(fileContents);
		const p: any = [];

		Object.values(data.functions).forEach((funcDef) => {
			(funcDef as any).events.forEach(async (element: any) => {
				if (!element.http) {
					return;
				}

				p.push(this.defineRoute(element.http.method, element, funcDef));
			});
		});
		return p;
	}

	private async defineRoute(httpMethod: any, element: any, funcDef: any) {
		let urlAction = path.posix.join(
			this.serverConfig.prefixUrl!,
			element.http.path,
		);
		urlAction = urlAction[0] === '/' ? urlAction : `/${urlAction}`;
		urlAction = urlAction.replace('{', ':').replace('}', '');

		const [filepath, handler] = (funcDef as any).handler.split('.');
		this.controllers[urlAction] = {};
		this.controllers[urlAction].action = await import(
			'file://' +
				path.join(this.serverConfig.controllersPath, `${filepath}.js`)
		);
		this.controllers[urlAction].handler = handler;
		const traceLogger = this.logger.child('RequestLogger');
		const self = this;

		this.server.route({
			method: httpMethod,
			url: urlAction,
			handler: async function (
				request: FastifyRequest,
				reply: FastifyReply,
			) {
				const controller = self.controllers[urlAction];
				const retVal = await controller.action[controller.handler](
					self.createEventObj(
						request.body,
						request.query,
						request.params,
					),
					self.createContext(),
					traceLogger,
				);
				const response = JSON.parse(retVal.body);
				return reply.code(retVal?.statusCode || 500).send(response);
			},
		});
	}

	private createEventObj(
		requestBody?: unknown,
		queryParams?: unknown,
		requestPath?: any,
	): APIGatewayProxyEvent {
		return {
			body: requestBody ? JSON.stringify(requestBody) : null,
			headers: {},
			multiValueHeaders: {},
			httpMethod: '',
			isBase64Encoded: false,
			path: '',
			pathParameters: requestPath,
			queryStringParameters:
				(queryParams as APIGatewayProxyEventQueryStringParameters) ||
				null,
			multiValueQueryStringParameters: null,
			stageVariables: null,
			requestContext: {
				accountId: '',
				apiId: '',
				authorizer: undefined,
				protocol: '',
				httpMethod: '',
				identity: {
					accessKey: null,
					accountId: null,
					apiKey: null,
					apiKeyId: null,
					caller: null,
					clientCert: null,
					cognitoAuthenticationProvider: null,
					cognitoAuthenticationType: null,
					cognitoIdentityId: null,
					cognitoIdentityPoolId: null,
					principalOrgId: null,
					sourceIp: 'devIp',
					user: null,
					userAgent: null,
					userArn: null,
				},
				path: '',
				stage: '',
				requestId: '',
				requestTimeEpoch: 0,
				resourceId: '',
				resourcePath: '',
			},
			resource: '',
		};
	}

	private createContext(): Context {
		return {
			callbackWaitsForEmptyEventLoop: false,
			functionName: '',
			functionVersion: '',
			invokedFunctionArn: '',
			memoryLimitInMB: '',
			awsRequestId: '',
			logGroupName: '',
			logStreamName: '',
			getRemainingTimeInMillis: function (): number {
				throw new Error('Function not implemented.');
			},
			done: function (_error?: Error | undefined, _result?: any): void {
				throw new Error('Function not implemented.');
			},
			fail: function (_error: string | Error): void {
				throw new Error('Function not implemented.');
			},
			succeed: function (_messageOrObject: any): void {
				throw new Error('Function not implemented.');
			},
		};
	}
}

dotenv.config({ path: './.env', debug: true });

const httpServer = new ServerlessLocalRun({
	controllersPath: process.cwd(),
	prefixUrl: process.env['LOCAL_SERVERLESS_PREFIXURL'] || '',
	port: +(process.env['LOCAL_SERVERLESS_PORT'] || 3001),
});

httpServer.start();
