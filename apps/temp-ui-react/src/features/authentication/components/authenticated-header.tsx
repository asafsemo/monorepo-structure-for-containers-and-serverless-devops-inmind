import { useAuthentication } from "../services";
import { UserMenu } from "./user-menu";

interface AuthenticatedMainHeaderProps {
	title: string;
	children?: React.ReactNode;
	rightPanelActions?: React.ReactNode;
}

export const AuthenticatedMainHeader = (
	props: AuthenticatedMainHeaderProps,
) => {
	const { children, title, rightPanelActions } = props;

	const { logout } = useAuthentication();

	return (
		<header className="border-b">
			<div className="flex h-16 items-center px-4">
				<div className="flex items-center space-x-4 ml-4 md:ml-0">
					{children}
					<h1 className="text-xl font-bold">{title}</h1>
				</div>
				<div className="ml-auto flex items-center space-x-4">
					{rightPanelActions}
					<div className="hidden md:block">
						<UserMenu handleLogout={logout} />
					</div>
				</div>
			</div>
		</header>
	);
};
