<script setup lang="ts">
import { UserIcon, UsersIcon } from '@heroicons/vue/24/outline';
import type { IProjectDetail } from '../types';

interface IProps {
	project: IProjectDetail;
}

defineProps<IProps>();

const emit = defineEmits<{
	addTeamMember: [];
}>();
</script>

<template>
	<Card>
		<CardHeader>
			<div class="flex items-center justify-between">
				<CardTitle>{{ $t('features.projects.projectDetail.teamMembers') }}</CardTitle>
				<Button size="sm" variant="outline" @click="emit('addTeamMember')">
					{{ $t('features.projects.projectDetail.actions.addTeamMember') }}
				</Button>
			</div>
		</CardHeader>
		<CardContent>
			<div v-if="project.teamMembers && project.teamMembers.length > 0" class="space-y-3">
				<div v-for="member in project.teamMembers" :key="member.id" class="flex items-center gap-3">
					<div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
						<img
							v-if="member.avatar"
							:src="member.avatar"
							:alt="member.name"
							class="w-10 h-10 rounded-full object-cover"
						/>
						<UserIcon v-else class="w-5 h-5 text-primary" />
					</div>
					<div class="flex-1">
						<h4 class="font-medium">{{ member.name }}</h4>
						<p class="text-sm text-muted-foreground">{{ member.role }}</p>
					</div>
				</div>
			</div>
			<div v-else class="text-center py-8 text-muted-foreground">
				<UsersIcon class="w-12 h-12 mx-auto mb-2 opacity-50" />
				<p>{{ $t('features.projects.projectDetail.noTeamMembers') }}</p>
			</div>
		</CardContent>
	</Card>
</template>
