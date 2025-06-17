"use client";

import { deleteMemo } from "@/actions/memo";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical as MenuIcon } from "lucide-react";
import Link, { type LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Props = LinkProps & {
	id: number;
	username: string;
	children: React.ReactNode;
};

export default function MemoListItemButton({ id, username, children, ...props }: Props) {
	const pathname = usePathname();
	const isActive = pathname === props.href;

	const router = useRouter();
	const handleDelete = async () => {
		try {
			await deleteMemo(id);
			router.push(`/${username}`);
		} catch (error) {
			console.error("Memo deletion failed:", error);
		}
	};

	if (isActive) {
		return (
			<div className="flex items-center justify-between gap-2 text-sm w-full border-b border-key p-4 bg-gray-300">
				{children}
				<MemoMenu onClick={handleDelete} />
			</div>
		);
	}

	return (
		<div className="flex items-center justify-between gap-2 border-b border-key hover:bg-gray-200">
			<Link className="text-sm cursor-pointer block w-full p-4" {...props}>
				{children}
			</Link>
			<div className="mr-4">
				<MemoMenu onClick={handleDelete} />
			</div>
		</div>
	);
}

function MemoMenu({ onClick }: { onClick: () => void }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="p-1 rounded-full hover:bg-gray-400">
				<MenuIcon color="#f5f5f5" size={16} />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={onClick} className="text-red-500">
					削除する
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
