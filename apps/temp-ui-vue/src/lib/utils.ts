// import { getCurrentInstance } from 'vue';
// import type { Router } from 'vue-router/auto';
import type { Router } from 'vue-router';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
// import { router } from '@/plugins/router';
import { useStoreAuth } from '@/stores/storeAuth';

const storeAuth = useStoreAuth();

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface IExtraData {
	retryCount?: number;
	skipAuthHeader?: boolean;
	skipRedirectToLogin?: boolean;
	error?: Error;
	router?: Router;
}

export async function fetchWithAuthAndRefreshTokenHandle<T>(
	url: string,
	init?: RequestInit,
	extraData?: IExtraData,
): Promise<T> {
	const urlObj = new URL(url, import.meta.env.VITE_APISERVER_BASEURL || window.origin);

	if (!urlObj.searchParams.has('retryCount')) {
		urlObj.searchParams.set('retryCount', (extraData?.retryCount || 1).toString());
	}

	if (!urlObj.searchParams.has('ts')) {
		urlObj.searchParams.set('ts', Date.now().toString());
	}

	const maxRefreshTokenRetries = 2;

	for (let refreshTokenRetry = 0; refreshTokenRetry < maxRefreshTokenRetries; refreshTokenRetry++) {
		// Add authorization header if access token exists
		const headers = new Headers(init?.headers);
		if (!extraData?.skipAuthHeader && storeAuth.access_token?.length) {
			headers.set('Authorization', `Bearer ${storeAuth.access_token}`);
		}

		const requestInit: RequestInit = {
			...init,
			headers,
		};

		const response = await fetch(urlObj, requestInit);

		if (response.ok) {
			const body = await response.json();
			return body as T;
		}

		// Handle authentication errors
		const errorCodesAuth = [401, 403];
		if (!errorCodesAuth.includes(response.status)) {
			// Non-authentication error - include response details
			const errorBody = await response.text().catch(() => 'Unable to read response body');
			const error =
				extraData?.error || new Error(`Server returned ${response.status}: ${response.statusText}. Body: ${errorBody}`);
			error.cause = response;
			throw error;
		}

		// Authentication error - attempt token refresh if not the last retry
		if (!refreshTokenRetry) {
			const refreshSuccess = await attemptTokenRefresh();
			if (refreshSuccess) {
				continue; // Retry the original request with new token
			}
		}

		if (!extraData?.skipRedirectToLogin) {
			const currentPath = window.location.pathname + window.location.search;
			if (extraData?.router) {
				extraData?.router?.push({
					path: '/login',
					query: {
						redirect_to: currentPath,
					},
				});
			} else {
				console.log('window redirect and not router');
				const encodedRedirectTo = encodeURIComponent(currentPath);
				window.location.href = `/login?redirect_to=${encodedRedirectTo}`;
			}
		}

		// Throw error instead of returning undefined
		throw new Error('Authentication failed and user was redirected to login', { cause: 'Authentication failed' });
	}

	// This should never be reached, but TypeScript requires it
	throw new Error('Unexpected error in fetchWithAuthAndRefreshTokenHandle');
}

async function attemptTokenRefresh(): Promise<boolean> {
	try {
		const resRefreshToken = await fetch('/api/auth/refresh-token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			// Refresh token is likely handled via HTTP-only cookies
			credentials: 'include',
		});

		if (!resRefreshToken.ok) {
			return false;
		}

		const resRefreshTokenBody = await resRefreshToken.json();
		storeAuth.access_token = resRefreshTokenBody.access_token;

		return true;
	} catch (error) {
		console.log('Error while refresh token', { error });
		return false;
	}
}
