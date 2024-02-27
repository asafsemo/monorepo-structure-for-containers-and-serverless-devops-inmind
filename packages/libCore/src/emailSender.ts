import { IOptions, ParentBaseObject } from '@pkg/lib-containers';
import { IEmailSender } from './interfaces.js';

const CLASSNAME = 'EmailSender';

export class EmailSender extends ParentBaseObject implements IEmailSender {
	public send(options?: IOptions): Promise<any> {
		const funcName = `${CLASSNAME} - send`;
		const { logger: _logger } = this.extractOptions(funcName, options);
		throw new Error('EmailSender - Method not implemented');
	}
}
