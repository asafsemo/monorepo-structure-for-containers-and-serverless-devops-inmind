import { IOptions } from '@pkg/lib-containers';

export interface IEmailSender {
	send(options?: IOptions): Promise<any>;
}

export interface ICacheStorage {
	set(
		collection: string,
		key: string,
		data: any,
		options?: IOptions,
	): Promise<void>;
	get(collection: string, key: string, options?: IOptions): Promise<any>;
	getCollection(collection: string, options?: IOptions): Promise<object | undefined>;
	clear(options?: IOptions): Promise<void>;
}
