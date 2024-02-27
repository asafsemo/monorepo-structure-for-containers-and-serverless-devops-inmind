import { ILogger, IOptions, ParentBaseObject } from '@pkg/lib-containers';
import { ICacheStorage } from '@pkg/lib-core';
import { ServiceItems } from './serviceItems.js';
import { ServiceOrders } from './serviceOrders.js';
import { ServiceTickets } from './serviceTickets.js';

const CLASSNAME = 'ServiceData';

export class ServiceData extends ParentBaseObject {
	constructor(
		logger: ILogger,
		private readonly memoryCache: ICacheStorage,
	) {
		super(logger);
	}

	public async setInitialData(options?: IOptions): Promise<any> {
		const funcName = `${CLASSNAME} - setInitialData`;
		const { logger } = this.extractOptions(funcName, options);

		this.memoryCache.clear();

		// build items
		for (let index = 1; index < 10; index++) {
			this.memoryCache.set(
				ServiceItems.ItemsCollectionName,
				`${index}`,
				{
					id: index,
					name: `item-${index}`,
				},
				{ logger },
			);
		}

		// build items
		for (let index = 1; index < 10; index++) {
			this.memoryCache.set(
				ServiceItems.ItemsOverdueCollectionName,
				`${index}`,
				{
					id: index,
					name: `overdueItem-${index}`,
				},
				{ logger },
			);
		}

		// build orders
		for (let index = 1; index < 10; index++) {
			this.memoryCache.set(
				ServiceOrders.OrdersCollectionName,
				`${index}`,
				{
					id: index,
					name: `order-${index}`,
				},
				{ logger },
			);
		}

		// build tickets
		for (let index = 1; index < 10; index++) {
			this.memoryCache.set(
				ServiceTickets.TicketsCollectionName,
				`${index}`,
				{
					id: index,
					name: `ticket-${index}`,
				},
				{ logger },
			);
		}

		return { status: 'ok' };
	}
}
