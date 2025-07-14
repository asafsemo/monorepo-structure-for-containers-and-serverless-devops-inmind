<script setup lang="ts">
const latestProjects = computed(() => {
	const retVal: any = [{ key: 1, title: 'Latest Projects', url: '#', items: [] }];
	retVal[0].key = Math.floor(Math.random() * 1000000);
	// 	// const latestProjects = projects.value.slice(0, 3);
	// 	// latestProjects.forEach((project: any) => {
	// 	// 	retVal[0].items.push({ title: project.name, url: `/project/${project.id}`, isActive: true });
	// 	// });
	return retVal;
});
</script>

<template>
	<SidebarProvider>
		<AppSidebar :navMenuItems="latestProjects" :key="latestProjects[0].key" />
		<SidebarInset>
			<header class="flex h-16 shrink-0 items-center gap-2 border-b">
				<div class="flex items-center gap-2 px-3">
					<SidebarTrigger />
				</div>
			</header>
			<div class="flex flex-1 flex-col gap-4 p-4">
				<RouterView />
			</div>
		</SidebarInset>
	</SidebarProvider>
</template>
