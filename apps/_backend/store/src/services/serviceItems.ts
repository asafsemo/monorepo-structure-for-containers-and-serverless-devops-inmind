import { ILogger, IOptions, ParentBaseObject } from '@pkg/lib-containers';
import { ICacheStorage } from '@pkg/lib-core';
import { EManagedError, ManagedError } from '@pkg/lib-data';
import { randomUUID } from 'crypto';

const CLASSNAME = 'ServiceItems';

export class ServiceItems extends ParentBaseObject {
	public static readonly ItemsCollectionName = 'items';
	public static readonly ItemsOverdueCollectionName = 'overdueItems';

	constructor(
		logger: ILogger,
		private readonly memoryCache: ICacheStorage,
	) {
		super(logger);
	}

	public async listItems(options?: IOptions): Promise<any> {
		const funcName = `${CLASSNAME} - listItems`;
		const { logger } = this.extractOptions(funcName, options);

		const collection = await this.memoryCache.getCollection(
			ServiceItems.ItemsCollectionName,
			{ logger },
		);
		if (!collection) {
			return null;
		}
		return Object.values(collection).map((item) => {
			return item;
		});
	}

	public async listOverdueItems(options?: IOptions): Promise<any> {
		const funcName = `${CLASSNAME} - listOverdueItems`;
		const { logger } = this.extractOptions(funcName, options);

		const collection = await this.memoryCache.getCollection(
			ServiceItems.ItemsOverdueCollectionName,
			{ logger },
		);
		if (!collection) {
			return null;
		}
		return Object.values(collection).map((item) => {
			return item;
		});
	}

	public async itemById(id: string, options?: IOptions): Promise<any> {
		const funcName = `${CLASSNAME} - itemById`;
		const { logger } = this.extractOptions(funcName, options);

		return this.memoryCache.get(ServiceItems.ItemsCollectionName, id, {
			logger,
		});
	}

	public async saveItem(item: any, options?: IOptions): Promise<any> {
		const funcName = `${CLASSNAME} - saveItem`;
		const { logger } = this.extractOptions(funcName, options);

		let itemId = item.id;
		if (!itemId) {
			itemId = randomUUID();
		}
		item.id = itemId;
		this.memoryCache.set(ServiceItems.ItemsCollectionName, itemId, item, {
			logger,
		});
		return item;
	}

	public async copyItem(sourceId: string, options?: IOptions): Promise<any> {
		const funcName = `${CLASSNAME} - copyItem`;
		const { logger } = this.extractOptions(funcName, options);

		const storeItem = await this.memoryCache.get(
			ServiceItems.ItemsCollectionName,
			sourceId,
			{ logger },
		);
		if (!storeItem) {
			throw new ManagedError(
				`Source object is not exists, id: ${sourceId}`,
				EManagedError.ITEMS_COPY_ERROR,
			);
		}
		storeItem.id = randomUUID();
		await this.memoryCache.set(
			ServiceItems.ItemsCollectionName,
			storeItem.id,
			storeItem,
			{ logger },
		);
		return storeItem;
	}

	public async copyOverdueItem(
		sourceId: string,
		options?: IOptions,
	): Promise<any> {
		const funcName = `${CLASSNAME} - copyOverdueItem`;
		const { logger } = this.extractOptions(funcName, options);

		const storeItem = await this.memoryCache.get(
			ServiceItems.ItemsOverdueCollectionName,
			sourceId,
			{ logger },
		);
		if (!storeItem) {
			throw new ManagedError(
				`Source object is not exists, id: ${sourceId}`,
				EManagedError.ITEMS_COPY_ERROR,
			);
		}
		storeItem.id = randomUUID();
		await this.memoryCache.set(
			ServiceItems.ItemsCollectionName,
			storeItem.id,
			storeItem,
			{ logger },
		);
		return storeItem;
	}

	public async setItemStatus(
		itemId: string,
		status: boolean,
		options?: IOptions,
	): Promise<any> {
		const funcName = `${CLASSNAME} - setItemStatus`;
		const { logger } = this.extractOptions(funcName, options);

		const storeItem = await this.memoryCache.get(
			ServiceItems.ItemsCollectionName,
			itemId,
			{ logger },
		);
		if (!storeItem) {
			throw new ManagedError(
				`Source object is not exists, id: ${itemId}`,
				EManagedError.ITEMS_STATUS_ERROR,
			);
		}
		storeItem.status = status;
		await this.memoryCache.set(
			ServiceItems.ItemsCollectionName,
			itemId,
			storeItem,
			{ logger },
		);
		return storeItem;
	}

	public async checkItemAvailability(
		itemId: string,
		options?: IOptions,
	): Promise<any> {
		const funcName = `${CLASSNAME} - checkItemAvailability`;
		const { logger } = this.extractOptions(funcName, options);

		const storeItem = await this.memoryCache.get(
			ServiceItems.ItemsCollectionName,
			itemId,
			{ logger },
		);
		return { itemAvailability: !!storeItem };
	}
}
