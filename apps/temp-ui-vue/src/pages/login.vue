<script setup lang="ts">
import { LoginForm } from '@/features/authentication';
import { authCheckStatus } from '@/features/authentication/services';

const { query } = useRoute();
const router = useRouter();

onMounted(async () => {
	try {
		await authCheckStatus();
		router.push(query.redirect_to?.toString() || '/');
	} catch (error) {
		console.error('Error checking auth status:', error);
	}
});
</script>

<template>
	<div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-pink-100 to-blue-200">
		<LoginForm :redirect_to="query.redirect_to?.toString()" />
	</div>
</template>

<route lang="yaml">
meta:
  layout: Blank
</route>
