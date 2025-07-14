<script setup lang="ts">
import type { IProject } from '../types';
import ProjectCard from './ProjectCard.vue';

const props = defineProps<{
	projects?: IProject[];
}>();
</script>

<template>
	<template v-for="project in props.projects" :key="project.id">
		<ProjectCard :project="project" />
	</template>
</template>
