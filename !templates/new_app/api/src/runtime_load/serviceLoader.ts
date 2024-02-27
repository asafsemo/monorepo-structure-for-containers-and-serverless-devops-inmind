import {
	IIocManager,
	ILogger,
	Lifetime,
	ParentBaseObject,
	RESOLVER,
	asClass,
} from '@pkg/lib-containers';
import { EmailSender } from '@pkg/lib-core';
import ServiceGeneric from '../services/serviceGeneric.js';

export default class ServiceLoader extends ParentBaseObject {
	public static [RESOLVER] = {
		lifetime: Lifetime.SINGLETON,
		priority: 2,
	};

	constructor(logger: ILogger, iocManager: IIocManager) {
		super(logger);

		iocManager.register({
			emailSender: asClass(EmailSender, { lifetime: Lifetime.SINGLETON }),
			serviceAuth: asClass(ServiceGeneric, { lifetime: Lifetime.SINGLETON }),
		});
	}
}
