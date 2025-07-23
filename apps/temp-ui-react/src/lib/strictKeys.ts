// Another common way, often simpler for basic key comparison:
export type StrictKeys<T, U> = Exclude<keyof T, keyof U> extends never
	? Exclude<keyof U, keyof T> extends never
		? true
		: false
	: false;
