<script setup lang="ts">
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline';
import { useQuery } from '@tanstack/vue-query';
import {
	ProjectDescription,
	ProjectHeader,
	ProjectOverviewCards,
	ProjectTasks,
	ProjectTeamMembers,
	ProjectTechnologies,
	ProjectTimeline,
} from '@/features/projects';
import { serviceProjects } from '@/features/projects/services';

// Get project ID from route params
const route = useRoute();
const projectId = computed(() => {
	const params = route.params as Record<string, string | string[]>;
	const id = params.id;
	return Array.isArray(id) ? id[0] : id || '';
});

const buttonClick = () => {
	window.location.reload();
};

// Fetch project data
let currentAttempt = 0;
const {
	data: project,
	isLoading,
	error,
	isError,
} = useQuery({
	queryKey: ['project', projectId],
	queryFn: () => {
		return serviceProjects.getProjectById(projectId.value || '', currentAttempt);
	},
	enabled: computed(() => !!projectId.value),
	retry: (failureCount, error) => {
		if (error.cause === 'Authentication failed') {
			return false;
		}
		currentAttempt = failureCount;
		return failureCount < 3;
	},
	retryDelay: 1000,
});

// Event handlers
const handleEditProject = () => {
	console.log('Edit project clicked');
	// TODO: Implement edit project logic
};

const handleAddTask = () => {
	console.log('Add task clicked');
	// TODO: Implement add task logic
};

const handleAddTeamMember = () => {
	console.log('Add team member clicked');
	// TODO: Implement add team member logic
};
</script>

<template>
	<div class="container mx-auto px-4 py-8">
		<!-- Loading State -->
		<div v-if="isLoading" class="flex items-center justify-center min-h-96">
			<div class="text-center">
				<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
				<p class="text-muted-foreground">{{ $t('common.messages.loading') }}</p>
			</div>
		</div>

		<!-- Error State -->
		<div v-else-if="isError" class="flex items-center justify-center min-h-96">
			<Card class="w-full max-w-md">
				<CardContent class="p-6 text-center">
					<div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<ExclamationTriangleIcon class="w-8 h-8 text-red-600" />
					</div>
					<h3 class="text-lg font-semibold mb-2">{{ $t('common.messages.error') }}</h3>
					<p class="text-muted-foreground mb-4">{{ error?.message }}</p>
					<Button @click="buttonClick" variant="outline"> Try Again </Button>
				</CardContent>
			</Card>
		</div>

		<!-- Project Details -->
		<div v-else-if="project" class="space-y-6">
			<!-- Header -->
			<ProjectHeader :project="project" @edit-project="handleEditProject" @add-task="handleAddTask" />

			<!-- Overview Cards -->
			<ProjectOverviewCards :project="project" />

			<!-- Main Content -->
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<!-- Left Column -->
				<div class="lg:col-span-2 space-y-6">
					<!-- Description -->
					<ProjectDescription :project="project" />

					<!-- Tasks -->
					<ProjectTasks :project="project" @add-task="handleAddTask" />
				</div>

				<!-- Right Column -->
				<div class="space-y-6">
					<!-- Team Members -->
					<ProjectTeamMembers :project="project" @add-team-member="handleAddTeamMember" />

					<!-- Technologies -->
					<ProjectTechnologies :project="project" />

					<!-- Project Timeline -->
					<ProjectTimeline :project="project" />
				</div>
			</div>
		</div>
	</div>
</template>

<route lang="yaml">
meta:
  layout: ProjectMenu
</route>
