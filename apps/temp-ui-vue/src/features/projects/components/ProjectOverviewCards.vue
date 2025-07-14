<script setup lang="ts">
import { CalendarIcon, ChartBarIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline';
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

// Format currency utility
const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount);
};
</script>

<template>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
		<Card>
			<CardContent class="p-4">
				<div class="flex items-center gap-2">
					<CalendarIcon class="w-5 h-5 text-muted-foreground" />
					<span class="text-sm font-medium">{{ $t('features.projects.projectDetail.createdAt') }}</span>
				</div>
				<p class="text-lg font-semibold mt-1">{{ formatDate(project.createdAt) }}</p>
			</CardContent>
		</Card>

		<Card>
			<CardContent class="p-4">
				<div class="flex items-center gap-2">
					<ClockIcon class="w-5 h-5 text-muted-foreground" />
					<span class="text-sm font-medium">{{ $t('features.projects.projectDetail.deadline') }}</span>
				</div>
				<p class="text-lg font-semibold mt-1">
					{{ project.deadline ? formatDate(project.deadline) : 'Not set' }}
				</p>
			</CardContent>
		</Card>

		<Card v-if="project.budget">
			<CardContent class="p-4">
				<div class="flex items-center gap-2">
					<CurrencyDollarIcon class="w-5 h-5 text-muted-foreground" />
					<span class="text-sm font-medium">{{ $t('features.projects.projectDetail.budget') }}</span>
				</div>
				<p class="text-lg font-semibold mt-1">{{ formatCurrency(project.budget) }}</p>
			</CardContent>
		</Card>

		<Card>
			<CardContent class="p-4">
				<div class="flex items-center gap-2">
					<ChartBarIcon class="w-5 h-5 text-muted-foreground" />
					<span class="text-sm font-medium">{{ $t('features.projects.projectDetail.progress') }}</span>
				</div>
				<div class="mt-2">
					<div class="flex items-center justify-between mb-1">
						<span class="text-lg font-semibold">{{ project.progress }}%</span>
					</div>
					<div class="w-full bg-gray-200 rounded-full h-2">
						<div
							class="bg-primary h-2 rounded-full transition-all duration-300"
							:style="`width: ${project.progress}%`"
						></div>
					</div>
				</div>
			</CardContent>
		</Card>
	</div>
</template>
