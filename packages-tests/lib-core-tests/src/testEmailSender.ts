import { IOptions, ParentBaseObject } from '@pkg/lib-containers';
import { IEmailSender } from '@pkg/lib-core';

const CLASSNAME = 'EmailSender';

export class TestEmailSender extends ParentBaseObject implements IEmailSender {
	public send(options?: IOptions): Promise<any> {
		const funcName = `${CLASSNAME} - send`;
		const { logger: _logger } = this.extractOptions(funcName, options);
		throw new Error('TestEmailSender - Method not implemented.');
	}
}
