import { ILogger, IOptions, ParentBaseObject } from '@pkg/lib-containers';

const CLASSNAME = 'ServiceGeneric';

export default class ServiceGeneric extends ParentBaseObject {
	constructor(logger: ILogger) {
		super(logger);
	}

	public async run(options?: IOptions): Promise<void> {
		const funcName = `${CLASSNAME} - login`;
		const { logger: _logger } = this.extractOptions(funcName, options);

		console.log(111111, 'ServiceGeneric');
	}
}
