<script setup lang="ts">
import type { IProject } from '../types';

const props = defineProps<{
	project: IProject;
}>();

const router = useRouter();

const openProjectPage = (projectId: number) => {
	router.push(`/project/${projectId}`);
};
</script>

<template>
	<Card class="shadow-lg">
		<CardHeader>
			<img :src="props.project.thumbnail" alt="" class="h-48 w-full object-cover" />
		</CardHeader>
		<CardContent class="p-6">
			<h3 class="text-lg font-semibold mb-4">{{ props.project.name }}</h3>
			<div class="space-y-2">
				<p class="text-sm"><span class="font-medium">Client:</span> {{ props.project.client }}</p>
				<p class="text-sm"><span class="font-medium">Status:</span> {{ props.project.status }}</p>
				<p class="text-sm text-muted-foreground">{{ props.project.description }}</p>
			</div>
		</CardContent>
		<CardFooter>
			<Button @click="openProjectPage(project.id)" class="w-full"> Enter Config </Button>
		</CardFooter>
	</Card>
</template>
