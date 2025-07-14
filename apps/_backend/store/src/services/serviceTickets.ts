import { ILogger, IOptions, ParentBaseObject } from '@pkg/lib-containers';
import { ICacheStorage } from '@pkg/lib-core';

const CLASSNAME = 'ServiceTickets';

export class ServiceTickets extends ParentBaseObject {
	public static readonly TicketsCollectionName = 'tickets';

	constructor(
		logger: ILogger,
		private readonly memoryCache: ICacheStorage,
	) {
		super(logger);
	}

	public async listTickets(options?: IOptions): Promise<any> {
		const funcName = `${CLASSNAME} - listTickets`;
		const { logger } = this.extractOptions(funcName, options);

		const collection = await this.memoryCache.getCollection(
			ServiceTickets.TicketsCollectionName,
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
