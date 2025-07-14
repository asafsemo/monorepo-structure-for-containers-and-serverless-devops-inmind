<script setup lang="ts">
import { CpuChipIcon } from '@heroicons/vue/24/outline';
import type { IProjectDetail } from '../types';

interface IProps {
	project: IProjectDetail;
}

defineProps<IProps>();
</script>

<template>
	<Card>
		<CardHeader>
			<CardTitle>{{ $t('features.projects.projectDetail.technologies') }}</CardTitle>
		</CardHeader>
		<CardContent>
			<div v-if="project.technologies && project.technologies.length > 0" class="flex flex-wrap gap-2">
				<Badge v-for="tech in project.technologies" :key="tech" variant="secondary">
					{{ tech }}
				</Badge>
			</div>
			<div v-else class="text-center py-8 text-muted-foreground">
				<CpuChipIcon class="w-12 h-12 mx-auto mb-2 opacity-50" />
				<p>{{ $t('features.projects.projectDetail.noTechnologies') }}</p>
			</div>
		</CardContent>
	</Card>
</template>
