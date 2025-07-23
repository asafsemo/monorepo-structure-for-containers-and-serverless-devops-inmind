import { Link } from "@tanstack/react-router";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

interface ProjectSidebarProps {
	actions: {
		title: string;
		url: string;
		icon: React.ElementType;
	}[];
	projectId: number;
}

export const ProjectSidebar = (props: ProjectSidebarProps) => {
	const { projectId, actions } = props;
	const { state } = useSidebar();
	const collapsed = state === "collapsed";

	return (
		<Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Project Actions</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{actions.map((action) => (
								<SidebarMenuItem key={action.title}>
									<SidebarMenuButton asChild>
										<Link
											to={`/project/${projectId}/${action.url}`}
											className="flex items-center"
										>
											<action.icon className="mr-2 h-4 w-4" />
											{!collapsed && <span>{action.title}</span>}
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
};
