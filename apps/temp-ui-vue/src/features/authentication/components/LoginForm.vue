<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useStoreAuth } from '@/stores/storeAuth';
import type { ILoginCredentials } from '../types';
import { authLogin } from '../services';

const props = defineProps<{
	redirect_to?: string;
}>();

const { t } = useI18n();

const storeAuth = useStoreAuth();
const { loading, error } = storeToRefs(storeAuth);

const form = ref<ILoginCredentials>({ email: '', password: '' });

const router = useRouter();

const handleSubmit = async () => {
	await authLogin(form.value, router, props.redirect_to);
};
</script>

<template>
	<Card class="w-full max-w-md shadow-xl">
		<CardHeader>
			<CardTitle class="text-2xl font-bold text-center mb-2">
				{{ t('features.authentication.loginForm.title') }}
			</CardTitle>
			<p class="text-center text-muted-foreground mb-4">
				{{ t('features.authentication.loginForm.subtitle') }}
			</p>
		</CardHeader>
		<CardContent>
			<form @submit.prevent="handleSubmit" class="space-y-4">
				<div>
					<label for="email" class="block text-sm font-medium mb-1">
						{{ t('features.authentication.loginForm.emailLabel') }}
					</label>
					<Input
						v-model="form.email"
						type="email"
						autocomplete="email"
						:placeholder="t('features.authentication.loginForm.emailPlaceholder')"
						required
						aria-required="true"
						class="w-full"
					/>
				</div>
				<div>
					<label for="password" class="block text-sm font-medium mb-1">
						{{ t('features.authentication.loginForm.passwordLabel') }}
					</label>
					<Input
						v-model="form.password"
						type="password"
						autocomplete="current-password"
						:placeholder="t('features.authentication.loginForm.passwordPlaceholder')"
						required
						aria-required="true"
						class="w-full"
					/>
				</div>
				<div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
				<Button :disabled="loading" type="submit" class="w-full mt-2">
					<span v-if="loading">{{ t('common.messages.loading') }}</span>
					<span v-else>{{ t('features.authentication.loginForm.submitButton') }}</span>
				</Button>
			</form>
			<Separator class="my-6" />
			<div class="flex flex-col items-center gap-2">
				<span class="text-xs text-muted-foreground">{{ t('features.authentication.loginForm.or') }}</span>
				<div class="flex gap-2 w-full justify-center">
					<Button variant="outline" aria-label="Sign in with Facebook" class="w-1/3">
						<svg class="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0"
							/>
						</svg>
					</Button>
					<Button variant="outline" aria-label="Sign in with Google" class="w-1/3">
						<svg class="w-5 h-5 mx-auto" viewBox="0 0 48 48">
							<g>
								<path
									fill="#4285F4"
									d="M24 9.5c3.54 0 6.36 1.53 7.82 2.81l5.75-5.75C34.64 3.64 29.82 1.5 24 1.5 14.82 1.5 6.87 7.98 3.69 16.36l6.68 5.19C12.2 15.09 17.61 9.5 24 9.5z"
								/>
								<path
									fill="#34A853"
									d="M46.1 24.5c0-1.64-.15-3.22-.43-4.74H24v9.24h12.4c-.54 2.9-2.18 5.36-4.64 7.04l7.18 5.59C43.98 37.36 46.1 31.36 46.1 24.5z"
								/>
								<path
									fill="#FBBC05"
									d="M10.37 28.09c-1.09-3.19-1.09-6.6 0-9.79l-6.68-5.19C.99 17.36 0 20.57 0 24s.99 6.64 2.69 9.89l6.68-5.19z"
								/>
								<path
									fill="#EA4335"
									d="M24 46.5c6.48 0 11.93-2.14 15.9-5.81l-7.18-5.59c-2.01 1.35-4.59 2.15-8.72 2.15-6.39 0-11.8-5.59-13.63-12.86l-6.68 5.19C6.87 40.02 14.82 46.5 24 46.5z"
								/>
							</g>
						</svg>
					</Button>
					<Button variant="outline" aria-label="Sign in with Apple" class="w-1/3">
						<svg class="w-5 h-5 mx-auto" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M16.365 1.43c0 1.14-.93 2.07-2.07 2.07-.02 0-.04 0-.06-.01-.02-.01-.04-.01-.06-.01-.02 0-.04 0-.06.01-.02.01-.04.01-.06.01-1.14 0-2.07-.93-2.07-2.07 0-1.14.93-2.07 2.07-2.07.02 0 .04 0 .06.01.02.01.04.01.06.01.02 0 .04 0 .06-.01.02-.01.04-.01.06-.01 1.14 0 2.07.93 2.07 2.07zM21.5 16.5c-.13 2.5-2.13 5.5-4.5 5.5-1.13 0-1.5-.75-3-0.75s-1.88.75-3 .75c-2.37 0-4.37-3-4.5-5.5-.13-2.5 1.5-3.5 3-3.5 1.13 0 1.5.75 3 .75s1.88-.75 3-.75c1.5 0 3.13 1 3 3.5z"
							/>
						</svg>
					</Button>
				</div>
			</div>
		</CardContent>
		<CardFooter class="flex flex-col items-center">
			<span class="text-sm text-muted-foreground">
				{{ t('features.authentication.loginForm.noAccount') }}
				<a href="/signup" class="text-blue-600 hover:underline ml-1">{{
					t('features.authentication.loginForm.signupLink')
				}}</a>
			</span>
		</CardFooter>
	</Card>
</template>

<style scoped>
@media (max-width: 640px) {
	.min-h-screen {
		min-height: 100vh;
		padding: 1.5rem 0.5rem;
	}
}
</style>
