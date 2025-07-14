<script setup lang="ts">
interface Props {
	show: boolean
}

defineProps<Props>()
</script>

<template>
	<Teleport to="body">
		<Transition
			enter-active-class="transition-opacity duration-300 ease-out"
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-active-class="transition-opacity duration-200 ease-in"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div
				v-if="show"
				class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
			>
				<div class="bg-white rounded-lg p-8 shadow-xl">
					<div class="flex flex-col items-center space-y-4">
						<!-- Animated loading spinner -->
						<div class="relative">
							<div class="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
						</div>
						
						<!-- Loading text -->
						<p class="text-gray-600 font-medium">Loading projects...</p>
						
						<!-- Additional animated dots -->
						<div class="flex space-x-1">
							<div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
							<div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
							<div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
						</div>
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<style scoped>
/* Custom animation for the dots */
@keyframes bounce {
	0%, 80%, 100% {
		transform: scale(0);
	}
	40% {
		transform: scale(1);
	}
}

.animate-bounce {
	animation: bounce 1.4s infinite ease-in-out both;
}
</style> 