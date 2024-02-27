import {
	IIocManager,
	ILogger,
	Lifetime,
	asClass,
} from '@pkg/lib-containers';
import { TestEmailSender } from '@pkg-tests/lib-core';
import ServiceLoader from '../runtime_load/serviceLoader.js';

export default class TestServiceLoader extends ServiceLoader {
	constructor(logger: ILogger, iocManager: IIocManager) {
		super(logger, iocManager);

		iocManager.register({
			emailSender: asClass(TestEmailSender, {
				lifetime: Lifetime.SINGLETON,
			}),
		});
	}
}
