"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import HeaderNavButton from "./header-nav-button";

export default function UserButton() {
	const { user } = useUser();
	const router = useRouter();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<HeaderNavButton as="span">
					<User color="black" size={20} />
				</HeaderNavButton>
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
