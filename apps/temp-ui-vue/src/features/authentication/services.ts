import type { Router } from 'vue-router';
import { storeToRefs } from 'pinia';
import { fetchWithAuthAndRefreshTokenHandle } from '@/lib/utils.js';
import { useStoreAuth } from '@/stores/storeAuth.js';
import type { ILoginCredentials } from './types.js';

const storeAuth = useStoreAuth();
const { error, loading, access_token, user } = storeToRefs(storeAuth);

export async function  authLogin(credentials: ILoginCredentials, router?: Router, redirectTo?: string): Promise<void> {
	console.log('🚀 ~ login ~ redirectTo:', redirectTo);
	loading.value = true;
	error.value = null;
	try {
		const url = './api/auth/login';
		const initRequest = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(credentials),
		};

		// Replace with real API endpoint
		const response = await fetch(url, initRequest);
		if (!response.ok) {
			error.value = `Login failed: ${response.statusText}`;
		}

		const data = await response.json();
		access_token.value = data.access_token;
		user.value = data.user;

		if (router) {
			router.push(redirectTo || '/');
		} else {
			window.location.href = redirectTo || '/';
		}
	} catch (err) {
		error.value = `Error during login: ${err}`;
	} finally {
		loading.value = false;
	}
};

export async function  authLogout(): Promise<void> {
	const url = `./api/auth/logout`;
	const initRequest = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	};

	await fetchWithAuthAndRefreshTokenHandle<void>(url, initRequest);
	storeAuth.access_token = null;
	storeAuth.user = null;
	storeAuth.error = null;
	storeAuth.loading = false;
};

export async function authCheckStatus(): Promise<void> {
	const url = `./api/auth/check-status`;
	const initRequest = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	};

	await fetchWithAuthAndRefreshTokenHandle<void>(url, initRequest, { skipRedirectToLogin: true });
};
