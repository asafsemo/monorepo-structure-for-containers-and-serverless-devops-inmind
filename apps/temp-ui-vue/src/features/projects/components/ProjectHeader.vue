<script setup lang="ts">
import type { IProjectDetail } from '../types';

interface IProps {
	project: IProjectDetail;
}

defineProps<IProps>();

const emit = defineEmits<{
	editProject: [];
	addTask: [];
}>();

// Get status color
const getStatusColor = (status: string) => {
	switch (status.toLowerCase()) {
		case 'active':
		case 'in-progress':
			return 'bg-green-100 text-green-800';
		case 'completed':
			return 'bg-blue-100 text-blue-800';
		case 'pending':
			return 'bg-yellow-100 text-yellow-800';
		case 'cancelled':
			return 'bg-red-100 text-red-800';
		default:
			return 'bg-gray-100 text-gray-800';
	}
};
</script>

<template>
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold mb-2">{{ project.name }}</h1>
			<div class="flex items-center gap-2">
				<Badge :class="getStatusColor(project.status)">
					{{ project.status }}
				</Badge>
				<span class="text-muted-foreground">{{ project.client }}</span>
			</div>
		</div>
		<div class="flex gap-2">
			<Button variant="outline" @click="emit('editProject')">
				{{ $t('features.projects.projectDetail.actions.editProject') }}
			</Button>
			<Button @click="emit('addTask')">
				{{ $t('features.projects.projectDetail.actions.addTask') }}
			</Button>
		</div>
	</div>
</template> 