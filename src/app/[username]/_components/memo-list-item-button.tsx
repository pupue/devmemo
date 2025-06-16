"use client";

import { cn } from "@/libs/utils";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

type Props = LinkProps & {
	children: React.ReactNode;
};

export default function MemoListItemButton({ children, ...props }: Props) {
	const pathname = usePathname();
	const isActive = pathname === props.href;

	return (
		<Link
			className={cn(
				"text-sm cursor-pointer block w-full border-b border-key p-4 hover:bg-gray-200",
				isActive && "pointer-events-none bg-gray-300",
			)}
			{...props}
		>
			{children}
		</Link>
	);
}
