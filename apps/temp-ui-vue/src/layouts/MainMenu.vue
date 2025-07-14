<!-- <script lang="ts">
export const iframeHeight = '800px';
export const description = 'A sidebar with submenus.';
</script> -->

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Globe, LogOut } from 'lucide-vue-next';
import type { AcceptableValue } from 'reka-ui';
import { authLogout } from '@/features/authentication/services';

// import { storeToRefs } from 'pinia';
// import { useStoreProjects } from '@/stores/storeProjects';

// const projectsStore = useStoreProjects();
// const { projects } = storeToRefs(projectsStore);
const router = useRouter();

const { locale } = useI18n();

const availableLocales = [
	{ code: 'en', name: 'English' },
	{ code: 'he', name: 'עברית' },
];

const changeLanguage = (langCode: AcceptableValue) => {
	locale.value = langCode?.toString() || 'en';
};

// const latestProjects = computed(() => {
// 	const retVal: any = [{ key: 1, title: 'Latest Projects', url: '#', items: [] }];
// 	retVal[0].key = Math.floor(Math.random() * 1000000);
// 	// const latestProjects = projects.value.slice(0, 3);
// 	// latestProjects.forEach((project: any) => {
// 	// 	retVal[0].items.push({ title: project.name, url: `/project/${project.id}`, isActive: true });
// 	// });
// 	return retVal;
// });
const handleLogout = async () => {
	await authLogout();
	router.push('/login');
};
</script>

<template>
	<SidebarProvider>
		<SidebarInset>
			<header class="flex h-16 shrink-0 items-center gap-2 border-b">
				<div class="flex items-center gap-2 px-3">
					<Separator orientation="vertical" class="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem class="hidden md:block">
								<BreadcrumbLink href="#"> Building Your Application </BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator class="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>Data Fetching</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>

					<div class="ml-auto flex items-center gap-2">
						<Button variant="outline" size="sm" @click="handleLogout">
							<LogOut class="h-4 w-4" />
							Logout
						</Button>
					</div>

					<div class="flex items-center gap-2 ml-auto">
						<Globe class="h-4 w-4" />
						<Select v-model="locale" @update:model-value="changeLanguage">
							<SelectTrigger class="w-[120px] bg-transparent">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem v-for="lang in availableLocales" :key="lang.code" :value="lang.code">
									{{ lang.name }}
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</header>
			<div class="flex flex-1 flex-col gap-4 p-4">
				<RouterView />
			</div>
		</SidebarInset>
	</SidebarProvider>
</template>
