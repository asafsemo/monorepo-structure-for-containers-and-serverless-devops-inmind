import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { IUser } from '@/features/authentication/types';

export const useStoreAuth = defineStore('auth', () => {
	const access_token = ref<string | null>(null);
	const user = ref<IUser | null>(null);
	const isAuthenticated = computed(() => !!access_token.value);
	const error = ref<string | null>(null);
	const loading = ref(false);

	return { access_token, isAuthenticated, error, loading, user };
});
