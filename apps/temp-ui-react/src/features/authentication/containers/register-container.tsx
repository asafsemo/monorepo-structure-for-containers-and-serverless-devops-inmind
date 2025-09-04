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
import type { RegisterDetails } from "../types";

interface RegisterContainerProps {
	redirectTo?: string;
}

const registerSchema = z
	.object({
		name: z.string().min(1, "Name is required"),
		email: z.string().email("Invalid email address"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string().min(1, "Please confirm your password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type InferredRegisterDetails = z.infer<typeof registerSchema>;
const _schemaKeysCheck: StrictKeys<InferredRegisterDetails, RegisterDetails> =
	true;
if (!_schemaKeysCheck) {
	throw new Error("Register schema keys do not match RegisterDetails");
}

export const RegisterContainer = (props: RegisterContainerProps) => {
	const { redirectTo } = props;
	const t = getTranslation();

	const navigate = useNavigate();
	const { register: registerUser, error, isLoading } = useAuthentication();

	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterDetails>({
		resolver: zodResolver(registerSchema),
	});

	const handleFormSubmit = async (credentials: RegisterDetails) => {
		try {
			await registerUser(credentials);

			const to = redirectTo || "/";
			navigate({ to });
		} catch (error) {
			// Error is automatically handled by the atom
			console.error("Registration failed:", error);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center">
						{t("features.authentication.signupForm.title")}
					</CardTitle>
					<CardDescription className="text-center">
						{t("features.authentication.signupForm.subtitle")}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
						{error && (
							<div
								className="text-red-500 text-sm text-center"
								data-testid="register-error"
							>
								{error.toString()}
							</div>
						)}

						<div className="space-y-2">
							<Label htmlFor="name">
								{t("features.authentication.signupForm.firstNameLabel")}
							</Label>
							<Input
								{...register("name")}
								type="text"
								placeholder={t(
									"features.authentication.signupForm.firstNamePlaceholder",
								)}
								autoComplete="name"
								data-testid="name-input"
							/>
							{errors.name && (
								<p className="text-red-500 text-sm">{errors.name.message}</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">
								{t("features.authentication.signupForm.emailLabel")}
							</Label>
							<Input
								{...register("email")}
								type="email"
								placeholder={t(
									"features.authentication.signupForm.emailPlaceholder",
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
								{t("features.authentication.signupForm.passwordLabel")}
							</Label>
							<div className="relative">
								<Input
									{...register("password")}
									type={showPassword ? "text" : "password"}
									placeholder={t(
										"features.authentication.signupForm.passwordPlaceholder",
									)}
									autoComplete="new-password"
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

						<div className="space-y-2">
							<Label htmlFor="confirmPassword">
								{t("features.authentication.signupForm.confirmPasswordLabel")}
							</Label>
							<Input
								{...register("confirmPassword")}
								type="password"
								placeholder={t(
									"features.authentication.signupForm.confirmPasswordPlaceholder",
								)}
								autoComplete="new-password"
								data-testid="confirm-password-input"
							/>
							{errors.confirmPassword && (
								<p className="text-red-500 text-sm">
									{errors.confirmPassword.message}
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
								: t("features.authentication.signupForm.submitButton")}
						</Button>
					</form>

					<div className="mt-4 text-center text-sm">
						{t("features.authentication.signupForm.hasAccount")}{" "}
						<Link
							to="/auth/login"
							search={{
								redirectTo: redirectTo,
							}}
							className="text-primary hover:underline"
						>
							{t("features.authentication.signupForm.loginLink")}
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
