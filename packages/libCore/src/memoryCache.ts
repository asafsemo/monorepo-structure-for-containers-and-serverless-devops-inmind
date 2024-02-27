import { ILogger, IOptions, ParentBaseObject } from '@pkg/lib-containers';
import { ICacheStorage } from './interfaces.js';

const CLASSNAME = 'MemoryCache';

export class MemoryCache extends ParentBaseObject implements ICacheStorage {
	private data: { [collection: string]: { [key: string]: any } };

	constructor(logger: ILogger) {
		super(logger);
		this.data = {};
	}

	public set(
		collection: string,
		key: string,
		data: any,
		options?: IOptions,
	): Promise<void> {
		const funcName = `${CLASSNAME} - set`;
		const { logger: _logger } = this.extractOptions(funcName, options);

		this.data[collection] = this.data[collection] || {};
		this.data[collection]![key] = data;
		return Promise.resolve();
	}

	public getCollection(
		collection: string,
		options?: IOptions,
	): Promise<object | undefined> {
		const funcName = `${CLASSNAME} - getCollection`;
		const { logger: _logger } = this.extractOptions(funcName, options);

		return Promise.resolve(structuredClone(this.data[collection]));
	}

	public get(
		collection: string,
		key: string,
		options?: IOptions,
	): Promise<any> {
		const funcName = `${CLASSNAME} - get`;
		const { logger: _logger } = this.extractOptions(funcName, options);

		return (structuredClone(this.data[collection] || {})[key]);
	}

	public clear(options?: IOptions): Promise<void> {
		const funcName = `${CLASSNAME} - clear`;
		const { logger: _logger } = this.extractOptions(funcName, options);

		this.data = {};
		return Promise.resolve();
	}
}
