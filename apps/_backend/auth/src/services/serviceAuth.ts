import {
	ILogger,
	IOptions,
	ParentBaseObject,
} from '@pkg/lib-containers';
import { IEmailSender } from '@pkg/lib-core';

const CLASSNAME = 'ServiceAuth';

export default class ServiceAuth extends ParentBaseObject {

	constructor(
		logger: ILogger,
		private readonly emailSender: IEmailSender,
	) {
		super(logger);
	}

	public async login(options?: IOptions): Promise<any> {
		const funcName = `${CLASSNAME} - login`;
		const { logger: _logger } = this.extractOptions(funcName, options);

		return 'login';
	}

	public async logout(options?: IOptions): Promise<any> {
		const funcName = `${CLASSNAME} - login`;
		const { logger: _logger } = this.extractOptions(funcName, options);

		return 'logout';
	}

	public async isLogin(options?: IOptions): Promise<any> {
		const funcName = `${CLASSNAME} - login`;
		const { logger: _logger } = this.extractOptions(funcName, options);

		return 'isLogin';
	}

	public async forgotMyPassword(options?: IOptions): Promise<any> {
		const funcName = `${CLASSNAME} - login`;
		const { logger } = this.extractOptions(funcName, options);

		this.emailSender.send({ logger });
		return 'forgotMyPassword';
	}
}
