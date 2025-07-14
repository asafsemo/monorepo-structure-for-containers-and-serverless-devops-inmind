<script setup lang="ts">
import type { IProjectDetail } from '../types';

interface IProps {
	project: IProjectDetail;
}

defineProps<IProps>();
</script>

<template>
	<Card>
		<CardHeader>
			<CardTitle>{{ $t('features.projects.projectDetail.overview') }}</CardTitle>
		</CardHeader>
		<CardContent>
			<p class="text-muted-foreground">
				{{ project.description || $t('features.projects.projectDetail.noDescription') }}
			</p>
		</CardContent>
	</Card>
</template> 