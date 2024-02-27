export enum EManagedError {
	INTERNAL_ERROR = 'INTERNAL_ERROR',
	REQUEST_PARAM_MISSING = 'REQUEST_PARAM_MISSING',
	RESPONSE_BODY_EMPTY = 'RESPONSE_BODY_EMPTY',
	ITEMS_COPY_ERROR = 'ITEMS_COPY_ERROR',
	ITEMS_STATUS_ERROR = 'ITEMS_STATUS_ERROR',
}

export interface IManagedErrorResponse {
	type: EManagedError;
	message: string;
	trace: string;
	stack: undefined | string;
	internalError: undefined | string;
	extraData: any | undefined;
}

interface IManagedErrorOptions {
	httpErrorCode?: number;
	internalError?: Error | undefined;
	extraData?: any;
}

export class ManagedError extends Error {
	constructor(
		message: string,
		private readonly type: EManagedError,
		private readonly options?: IManagedErrorOptions,
	) {
		super(message);
	}

	public get Type() {
		return this.type;
	}
	public get httpErrorCode() {
		return this.options?.httpErrorCode;
	}
	public get internalError() {
		return this.options?.internalError;
	}
	public get extraData() {
		return this.options?.extraData;
	}
}
