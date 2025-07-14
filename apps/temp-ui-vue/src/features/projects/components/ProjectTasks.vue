<script setup lang="ts">
import { CheckCircleIcon } from '@heroicons/vue/24/outline';
import type { IProjectDetail } from '../types';

interface IProps {
	project: IProjectDetail;
}

defineProps<IProps>();

const emit = defineEmits<{
	addTask: [];
}>();

// Format date utility
const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};

// Get priority color
const getPriorityColor = (priority: string) => {
	switch (priority.toLowerCase()) {
		case 'high':
			return 'bg-red-100 text-red-800';
		case 'medium':
			return 'bg-yellow-100 text-yellow-800';
		case 'low':
			return 'bg-green-100 text-green-800';
		default:
			return 'bg-gray-100 text-gray-800';
	}
};

// Get task status color
const getTaskStatusColor = (status: string) => {
	switch (status.toLowerCase()) {
		case 'completed':
			return 'bg-green-100 text-green-800';
		case 'in-progress':
			return 'bg-blue-100 text-blue-800';
		case 'pending':
			return 'bg-yellow-100 text-yellow-800';
		default:
			return 'bg-gray-100 text-gray-800';
	}
};
</script>

<template>
	<Card>
		<CardHeader>
			<div class="flex items-center justify-between">
				<CardTitle>{{ $t('features.projects.projectDetail.tasks') }}</CardTitle>
				<Button size="sm" variant="outline" @click="emit('addTask')">
					{{ $t('features.projects.projectDetail.actions.addTask') }}
				</Button>
			</div>
		</CardHeader>
		<CardContent>
			<div v-if="project.tasks && project.tasks.length > 0" class="space-y-3">
				<div
					v-for="task in project.tasks"
					:key="task.id"
					class="flex items-center justify-between p-3 border rounded-lg"
				>
					<div class="flex-1">
						<div class="flex items-center gap-2">
							<h4 class="font-medium">{{ task.title }}</h4>
							<Badge :class="getTaskStatusColor(task.status)" class="text-xs">
								{{ $t(`features.projects.projectDetail.taskStatus.${task.status}`) }}
							</Badge>
							<Badge :class="getPriorityColor(task.priority)" class="text-xs">
								{{ $t(`features.projects.projectDetail.taskPriority.${task.priority}`) }}
							</Badge>
						</div>
						<div class="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
							<span v-if="task.assignee">Assigned to: {{ task.assignee }}</span>
							<span v-if="task.dueDate">Due: {{ formatDate(task.dueDate) }}</span>
						</div>
					</div>
				</div>
			</div>
			<div v-else class="text-center py-8 text-muted-foreground">
				<CheckCircleIcon class="w-12 h-12 mx-auto mb-2 opacity-50" />
				<p>{{ $t('features.projects.projectDetail.noTasks') }}</p>
			</div>
		</CardContent>
	</Card>
</template>
