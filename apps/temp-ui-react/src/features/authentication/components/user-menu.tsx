import { LogOut, Settings } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getTranslation } from "@/integrations/i18n";

interface UserMenuProps {
	handleLogout: () => void;
}

export const UserMenu = (props: UserMenuProps) => {
	const t = getTranslation();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarFallback>AD</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuItem data-testid="settings-menu-item">
					<Settings className="mr-2 h-4 w-4" />
					{t("features.authentication.userMenu.settings", "Settings")}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={props.handleLogout} data-testid="logout-menu-item">
					<LogOut className="mr-2 h-4 w-4" />
					{t("features.authentication.userMenu.logout", "Logout")}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
