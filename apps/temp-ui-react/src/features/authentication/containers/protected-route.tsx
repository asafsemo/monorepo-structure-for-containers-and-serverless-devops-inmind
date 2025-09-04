import { useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { authUserStorageKey } from "../services";

interface ProtectedRouteProps {
	children: React.ReactNode;
	redirectTo: string;
}

export const ProtectedRoute = (props: ProtectedRouteProps) => {
	const { redirectTo, children } = props;

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const authUser = localStorage.getItem(authUserStorageKey);
		if (!authUser?.length) {
			navigate({
				to: redirectTo,
				search: { redirectTo: location.href },
				replace: true,
			});
		}
	}, []);

	return <>{children}</>;
};
