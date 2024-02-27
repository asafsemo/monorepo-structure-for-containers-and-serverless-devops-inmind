import {
	EManagedError,
	ManagedError,
	IManagedErrorResponse,
} from '@pkg/lib-data';

export function handleError(error: unknown) {
	let httpErrorCode = 570;
	let stack = undefined;
	let internalError = undefined;
	const retErr: IManagedErrorResponse = {
		type: EManagedError.INTERNAL_ERROR,
		message: '',
		trace: '',
		stack,
		internalError,
		extraData: undefined,
	};

	if (error instanceof Error) {
		retErr.message = error.message;
		stack = error.stack;
	}

	if (error instanceof ManagedError) {
		httpErrorCode = error.httpErrorCode || httpErrorCode;
		retErr.type = error.Type;
		retErr.message = error.message;
		retErr.extraData = error.extraData;
		internalError = error.internalError?.stack;
	}

	if (process.env['ENV'] === 'dev') {
		retErr.stack = stack;
		retErr.internalError = internalError;
	}

	return { retErr, httpErrorCode };
}

interface ValidateOptions {
	errorMessage?: string;
	eManagedError?: EManagedError;
	httpErrorCode?: number;
}

export function validateMandatoryObjectFields(
	obj: any,
	fields: string[],
	options?: ValidateOptions,
): any {
	fields.forEach((f) => {
		if (!f?.length) {
			return;
		}
		if (!Object.prototype.hasOwnProperty.call(obj, f)) {
			throw new ManagedError(
				options?.errorMessage?.replace('{paramName}', f) ||
					`Missing field: ${f}`,
				options?.eManagedError || EManagedError.REQUEST_PARAM_MISSING,
				{ httpErrorCode: options?.httpErrorCode || 420 },
			);
		}
		if (!obj[f]) {
			throw new ManagedError(
				options?.errorMessage?.replace('{paramName}', f) ||
					`Missing field: ${f}`,
				options?.eManagedError || EManagedError.REQUEST_PARAM_MISSING,
				{ httpErrorCode: options?.httpErrorCode || 420 },
			);
		}
	});
	return obj;
}
