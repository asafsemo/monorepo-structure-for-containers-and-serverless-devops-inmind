import { IOptions, ILogger, ParentBaseObject } from '@pkg/lib-containers';

const CLASSNAME = 'NewClass';

export class NewClass extends ParentBaseObject {
	constructor(logger: ILogger) {
		super(logger);
	}

	public send(options?: IOptions): Promise<any> {
		const funcName = `${CLASSNAME} - send`;
		const { logger: _logger } = this.extractOptions(funcName, options);
		throw new Error('NewClass - Method not implemented');
	}
}
