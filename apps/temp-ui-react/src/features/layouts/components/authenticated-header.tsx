import { ThemeToggle } from "@/features/theme/containers/theme-toggle.tsx";
import { UserMenu } from "./user-menu.tsx";

interface AuthenticatedMainHeaderProps {
	title: string;
	children?: React.ReactNode;
	handleLogout: () => void;
}

export const AuthenticatedMainHeader = (
	props: AuthenticatedMainHeaderProps,
) => {
	const { children, handleLogout, title } = props;

	return (
		<header className="border-b">
			<div className="flex h-16 items-center px-4">
				<div className="flex items-center space-x-4 ml-4 md:ml-0">
					{children}
					<h1 className="text-xl font-bold">{title}</h1>
				</div>
				<div className="ml-auto flex items-center space-x-4">
					<ThemeToggle />
					<div className="hidden md:block">
						<UserMenu handleLogout={handleLogout} />
					</div>
				</div>
			</div>
		</header>
	);
};
