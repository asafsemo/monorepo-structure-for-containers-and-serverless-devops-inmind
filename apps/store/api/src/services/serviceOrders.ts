import { ILogger, IOptions, ParentBaseObject } from '@pkg/lib-containers';
import { ICacheStorage } from '@pkg/lib-core';
import { randomUUID } from 'crypto';

const CLASSNAME = 'ServiceOrders';

export class ServiceOrders extends ParentBaseObject {
	public static readonly OrdersCollectionName = 'orders';

	constructor(
		logger: ILogger,
		private readonly memoryCache: ICacheStorage,
	) {
		super(logger);
	}

	public async newOrder(newOrderObj: any, options?: IOptions): Promise<any> {
		const funcName = `${CLASSNAME} - newOrder`;
		const { logger } = this.extractOptions(funcName, options);

		newOrderObj.id = randomUUID();
		await this.memoryCache.set(
			ServiceOrders.OrdersCollectionName,
			newOrderObj.id,
			newOrderObj,
			{ logger },
		);

		return newOrderObj;
	}

	public async listOrders(options?: IOptions): Promise<any> {
		const funcName = `${CLASSNAME} - listOrders`;
		const { logger } = this.extractOptions(funcName, options);

		const collection = await this.memoryCache.getCollection(
			ServiceOrders.OrdersCollectionName,
			{ logger },
		);
		if (!collection) {
			return null;
		}
		return Object.values(collection).map((item) => {
			return item;
		});
	}
}
