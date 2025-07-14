<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { PlusCircleIcon } from '@heroicons/vue/24/solid';
import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import LoadingDialog from '@/features/_shared/components/LoadingDialog.vue';
import { ProjectsList, serviceProjects } from '@/features/projects';

const route = useRoute();
const router = useRouter();

// Initialize pageId from URL params, default to 1 if not present
const pageId = ref(parseInt(route.query.pageid as string) || 1);

// Watch for pageId changes and update URL
watch(pageId, (newPageId) => {
	router.push({
		query: {
			...route.query,
			pageid: newPageId.toString(),
		},
	});
});

let currentAttempt = 0;
const { data: projectsPage, isFetching } = useQuery({
	queryKey: ['projects', pageId],
	placeholderData: keepPreviousData,
	queryFn: async () => {
		const response = await serviceProjects.getProjectsList(pageId.value, currentAttempt);
		return response;
	},
	staleTime: 10000,
	retry: (failureCount, error) => {
		if (error.cause === 'Authentication failed') {
			return false;
		}
		currentAttempt = failureCount;
		return failureCount < 3;
	},
});

const showCreateNewProjectPanel = () => {
	serviceProjects.createNewProjectPanel();
};
</script>

<template>
	<div class="container mx-auto p-8">
		<div class="flex items-center justify-between mb-8">
			<h1 class="text-3xl font-bold">Projects</h1>
			<div class="flex gap-2">
				<Pagination
					v-if="projectsPage"
					v-model:page="pageId"
					:total="projectsPage.maxPageId * projectsPage.pageSize"
					:items-per-page="projectsPage.pageSize"
					:sibling-count="1"
					show-edges
					:default-page="1"
				>
					<PaginationContent class="flex items-center gap-1">
						<PaginationFirst />
						<PaginationPrevious />

						<PaginationNext />
						<PaginationLast />
					</PaginationContent>
				</Pagination>
				<Button variant="outline" size="icon" @click="showCreateNewProjectPanel">
					<PlusCircleIcon class="h-4 w-4" />
				</Button>
			</div>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<ProjectsList v-if="projectsPage" :projects="projectsPage.pageData" />
		</div>

		<!-- Loading Dialog -->
		<LoadingDialog :show="isFetching" />
	</div>
</template>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  layout: MainMenu
</route>
