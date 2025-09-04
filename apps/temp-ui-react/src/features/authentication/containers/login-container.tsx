import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { StrictKeys } from "@/lib/strictKeys";
import { getTranslation } from "@/integrations/i18n";
import { useAuthentication } from "../services";
import type { EmailLoginCredentials } from "../types";

interface LoginContainerProps {
	redirectTo?: string;
}

const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(1, "Password is required"),
});

type InferredLoginCredentials = z.infer<typeof loginSchema>;
const _schemaKeysCheck: StrictKeys<
	InferredLoginCredentials,
	EmailLoginCredentials
> = true;
if (!_schemaKeysCheck) {
	throw new Error("Login schema keys do not match EmailLoginCredentials");
}

export const LoginContainer = (props: LoginContainerProps) => {
	const { redirectTo } = props;
	const t = getTranslation();

	const navigate = useNavigate();
	const { loginEmail, error, isLoading } = useAuthentication();

	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<EmailLoginCredentials>({
		resolver: zodResolver(loginSchema),
	});

	const handleFormSubmit = async (credentials: EmailLoginCredentials) => {
		try {
			await loginEmail(credentials);

			const to = redirectTo || "/";
			navigate({ to });
		} catch (error) {
			// Error is automatically handled by the atom
			console.error("Login failed:", error);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center">
						{t("features.authentication.loginForm.title", "ASAFAAAAA")}
					</CardTitle>
					<CardDescription className="text-center">
						{t("features.authentication.loginForm.subtitle")}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
						{error && (
							<div
								className="text-red-500 text-sm text-center"
								data-testid="login-error"
							>
								{error.toString()}
							</div>
						)}

						<div className="space-y-2">
							<Label htmlFor="email">
								{t("features.authentication.loginForm.emailLabel")}
							</Label>
							<Input
								{...register("email")}
								type="email"
								placeholder={t(
									"features.authentication.loginForm.emailPlaceholder",
								)}
								autoComplete="email"
								data-testid="email-input"
							/>
							{errors.email && (
								<p className="text-red-500 text-sm">{errors.email.message}</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">
								{t("features.authentication.loginForm.passwordLabel")}
							</Label>
							<div className="relative">
								<Input
									{...register("password")}
									type={showPassword ? "text" : "password"}
									placeholder={t(
										"features.authentication.loginForm.passwordPlaceholder",
									)}
									autoComplete="current-password"
									data-testid="password-input"
								/>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
									onClick={() => setShowPassword(!showPassword)}
									data-testid="toggle-password-button"
								>
									{showPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</Button>
							</div>
							{errors.password && (
								<p className="text-red-500 text-sm">
									{errors.password.message}
								</p>
							)}
						</div>

						<Button
							type="submit"
							className="w-full"
							disabled={isSubmitting || isLoading}
							data-testid="submit-button"
						>
							{isSubmitting || isLoading
								? t("common.messages.loading")
								: t("features.authentication.loginForm.submitButton")}
						</Button>
					</form>

					<div className="mt-4 text-center text-sm">
						{t("features.authentication.loginForm.noAccount")}{" "}
						<Link
							to="/auth/register"
							search={{
								redirectTo: redirectTo,
							}}
							className="text-primary hover:underline"
						>
							{t("features.authentication.loginForm.signupLink")}
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
