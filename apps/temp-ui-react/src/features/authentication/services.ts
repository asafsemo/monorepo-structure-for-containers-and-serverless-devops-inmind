// // src/hooks/useAuthentication.ts

import { atom, useAtom } from "jotai";
import type { EmailLoginCredentials, RegisterDetails } from "./types.ts";

export const authUserStorageKey = "auth-user";

const $isLoading = atom<boolean>(false);
const $error = atom<Error | null>(null);

export const useAuthentication = () => {
	const [isLoading, setLoading] = useAtom($isLoading);
	const [error, setError] = useAtom($error);

	const isAuthenticated = () => {
		return !!localStorage.getItem(authUserStorageKey);
	};

	const getUser = () => {
		const storage = localStorage.getItem(authUserStorageKey);
		if (!storage) return null;
		return JSON.parse(storage);
	};

	const apiAction = async (
		url: string,
		method: string,
		body: object,
		defaultErrorMessage: string,
	) => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});

			const resBody = await response.json();

			if (!response.ok) {
				const errorMessage = resBody.message || defaultErrorMessage;
				setError(new Error(errorMessage));
				localStorage.removeItem(authUserStorageKey);
				return;
			}

			localStorage.setItem(authUserStorageKey, JSON.stringify(resBody.data));
		} catch (err) {
			setError(err as Error);
			localStorage.removeItem(authUserStorageKey);
		} finally {
			setLoading(false);
		}
	};

	const loginEmail = async (
		credentials: EmailLoginCredentials,
	): Promise<void> => {
		return apiAction("/api/auth/login", "POST", credentials, "Login failed");
	};

	const register = async (registerDetails: RegisterDetails): Promise<void> => {
		return apiAction(
			"/api/auth/register",
			"POST",
			registerDetails,
			"Register failed",
		);
	};

	const logout = async (): Promise<void> => {
		return apiAction("/api/auth/logout", "POST", {}, "Logout failed");
	};

	return {
		loginEmail,
		register,
		logout,
		isAuthenticated,
		isLoading,
		error,
		getUser,
	};
};
