import {
	IIocManager,
	ILogger,
	Lifetime,
	ParentBaseObject,
	RESOLVER,
	asClass,
} from '@pkg/lib-containers';
import ServiceGeneric from '../services/serviceGeneric.js';

export default class ServiceLoader extends ParentBaseObject {
	public static [RESOLVER] = {
		lifetime: Lifetime.SINGLETON,
		priority: 2,
	};

	constructor(logger: ILogger, iocManager: IIocManager) {
		super(logger);

		iocManager.register({
			testrunner: asClass(ServiceGeneric, { lifetime: Lifetime.SINGLETON }),
		});
	}
}
