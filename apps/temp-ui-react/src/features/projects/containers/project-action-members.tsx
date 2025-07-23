import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar } from "@/components/ui/avatar.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card.tsx";
import { getStatusColor } from "../services";

interface ProjectActionMembersProps {
	members: any;
}

export const ProjectActionMembers = (props: ProjectActionMembersProps) => {
	const { members } = props;

	return (
		<div className="space-y-4">
			{members.map((member: any) => (
				<Card key={member.id}>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<div className="flex items-center space-x-3">
							<Avatar className="h-8 w-8">
								<AvatarFallback>
									{member.name
										.split(" ")
										.map((n: string) => n[0])
										.join("")}
								</AvatarFallback>
							</Avatar>
							<div>
								<CardTitle className="text-base">{member.name}</CardTitle>
								<CardDescription>{member.email}</CardDescription>
							</div>
						</div>
						<Badge
							className={`${getStatusColor(member.status)} text-white border-0`}
						>
							{member.status}
						</Badge>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 gap-4 text-sm">
							<div>
								<p className="text-muted-foreground">Role</p>
								<p className="font-medium">{member.role}</p>
							</div>
							<div>
								<p className="text-muted-foreground">Joined</p>
								<p className="font-medium">{member.joinedAt}</p>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
};
