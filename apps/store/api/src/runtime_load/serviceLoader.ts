import {
	IIocManager,
	ILogger,
	Lifetime,
	ParentBaseObject,
	RESOLVER,
	asClass,
} from '@pkg/lib-containers';
import { EmailSender, MemoryCache } from '@pkg/lib-core';
import { ServiceItems } from '../services/serviceItems.js';
import { ServiceOrders } from '../services/serviceOrders.js';
import { ServiceData } from '../services/serviceData.js';

export default class ServiceLoader extends ParentBaseObject {
	public static [RESOLVER] = {
		lifetime: Lifetime.SINGLETON,
		priority: 2,
	};

	constructor(logger: ILogger, iocManager: IIocManager) {
		super(logger);

		iocManager.register({
			emailSender: asClass(EmailSender, { lifetime: Lifetime.SINGLETON }),
			serviceItems: asClass(ServiceItems, {
				lifetime: Lifetime.SINGLETON,
			}),
			serviceOrders: asClass(ServiceOrders, {
				lifetime: Lifetime.SINGLETON,
			}),
			memoryCache: asClass(MemoryCache, { lifetime: Lifetime.SINGLETON }),
			serviceData: asClass(ServiceData, { lifetime: Lifetime.SINGLETON }),
			// serviceAuth: asClass(ServiceItems, { lifetime: Lifetime.SINGLETON }),
		});

		(iocManager.resolve('serviceData') as ServiceData).setInitialData();
	}
}
