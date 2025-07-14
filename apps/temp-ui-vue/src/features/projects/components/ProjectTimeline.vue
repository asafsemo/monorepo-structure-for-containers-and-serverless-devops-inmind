<script setup lang="ts">
import type { IProjectDetail } from '../types';

interface IProps {
	project: IProjectDetail;
}

defineProps<IProps>();

// Format date utility
const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};
</script>

<template>
	<Card>
		<CardHeader>
			<CardTitle>Project Timeline</CardTitle>
		</CardHeader>
		<CardContent>
			<div class="space-y-3">
				<div class="flex items-center gap-3">
					<div class="w-2 h-2 bg-green-500 rounded-full"></div>
					<div>
						<p class="font-medium">Project Created</p>
						<p class="text-sm text-muted-foreground">{{ formatDate(project.createdAt) }}</p>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<div class="w-2 h-2 bg-blue-500 rounded-full"></div>
					<div>
						<p class="font-medium">Last Updated</p>
						<p class="text-sm text-muted-foreground">{{ formatDate(project.updatedAt) }}</p>
					</div>
				</div>
				<div v-if="project.deadline" class="flex items-center gap-3">
					<div class="w-2 h-2 bg-orange-500 rounded-full"></div>
					<div>
						<p class="font-medium">Deadline</p>
						<p class="text-sm text-muted-foreground">{{ formatDate(project.deadline) }}</p>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
</template> 