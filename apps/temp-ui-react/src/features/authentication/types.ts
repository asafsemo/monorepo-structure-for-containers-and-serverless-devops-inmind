export interface EmailLoginCredentials {
	email: string;
	password: string;
}

export interface LocalUser {
	authenticated?: boolean;
}

export interface RegisterDetails {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}
