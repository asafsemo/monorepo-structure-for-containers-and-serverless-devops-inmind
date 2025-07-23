import { queryOptions } from "@tanstack/react-query";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import React from "react";
import type { Project } from "./types.ts";

export const fetchProjects = async (): Promise<Project[]> => {
	return [
		{
			id: 1,
			name: "E-commerce Platform",
			description: "Modern online shopping platform with advanced features",
			status: "active",
			lastActivity: "2 hours ago",
			members: 5,
			deployments: 12,
			environment: "production",
			version: "1.0.0",
		},
		{
			id: 2,
			name: "Analytics Dashboard",
			description: "Real-time analytics and reporting system",
			status: "development",
			lastActivity: "1 day ago",
			members: 3,
			deployments: 8,
			environment: "staging",
			version: "1.0.0",
		},
		{
			id: 3,
			name: "Mobile Banking App",
			description: "Secure mobile banking application",
			status: "testing",
			lastActivity: "3 hours ago",
			members: 8,
			deployments: 15,
			environment: "development",
			version: "1.0.0",
		},
		{
			id: 4,
			name: "CRM System",
			description: "Customer relationship management platform",
			status: "active",
			lastActivity: "30 minutes ago",
			members: 6,
			deployments: 20,
			environment: "production",
			version: "1.0.0",
		},
	];
};

export const projectsQueryOptions = queryOptions({
	queryKey: ["projects"],
	queryFn: fetchProjects,
});

export const actionTitles = {
	deployments: "Deployments",
	members: "Team Members",
	database: "Database",
	security: "Security",
	branches: "Branches",
	monitoring: "Monitoring",
} as const;

export const getStatusColor = (status: string) => {
	const retVal: Record<string, string> = {
		success: "bg-green-500",
		active: "bg-green-500",
		failed: "bg-red-500",
		pending: "bg-yellow-500",
		development: "bg-blue-500",
		testing: "bg-yellow-500",
	};

	return retVal[status] || "bg-gray-500";
};

export const getStatusIcon = (status: string) => {
	const retVal: Record<
		string,
		{ component: React.ElementType; className: string }
	> = {
		success: {
			component: CheckCircle,
			className: "h-4 w-4 text-green-500",
		},
		active: {
			component: CheckCircle,
			className: "h-4 w-4 text-green-500",
		},
		failed: {
			component: XCircle,
			className: "h-4 w-4 text-red-500",
		},
		pending: {
			component: Clock,
			className: "h-4 w-4 text-yellow-500",
		},
	};

	const elm = retVal[status] || {
		component: Clock,
		className: "h-4 w-4 text-gray-500",
	};
	return React.createElement(elm.component, { className: elm.className });
};

export const projectActionsQueryOptions = (projectId: string) =>
	queryOptions({
		queryKey: ["projectAction", projectId],
		queryFn: () => fetchProjectActionsData(projectId),
	});

const fetchProjectActionsData = async (_projectId: string) => {
	return {
		deployments: [
			{
				id: 1,
				version: "v2.1.4",
				environment: "Production",
				status: "success",
				deployedBy: "John Doe",
				deployedAt: "2024-03-10 14:30",
				duration: "2m 45s",
			},
			{
				id: 2,
				version: "v2.1.3",
				environment: "Staging",
				status: "success",
				deployedBy: "Jane Smith",
				deployedAt: "2024-03-09 16:15",
				duration: "1m 52s",
			},
			{
				id: 3,
				version: "v2.1.2",
				environment: "Production",
				status: "failed",
				deployedBy: "Bob Wilson",
				deployedAt: "2024-03-08 10:20",
				duration: "Failed after 30s",
			},
		],
		members: [
			{
				id: 1,
				name: "John Doe",
				email: "john@example.com",
				role: "Project Manager",
				joinedAt: "2024-01-15",
				status: "active",
			},
			{
				id: 2,
				name: "Jane Smith",
				email: "jane@example.com",
				role: "Developer",
				joinedAt: "2024-02-01",
				status: "active",
			},
		],
	};
};
