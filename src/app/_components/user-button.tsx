"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function UserButton() {
	const { user } = useUser();
	const router = useRouter();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={user?.imageUrl} alt="User Avatar" />
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="right-4">
				<DropdownMenuItem onSelect={() => router.push(`/${user?.publicMetadata.username}`)}>
					マイページ
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<SignOutButton redirectUrl="/" />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
