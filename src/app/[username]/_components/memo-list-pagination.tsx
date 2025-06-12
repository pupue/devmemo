import { cn } from "@/libs/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export function MemoListPagination({
	currentPage,
	totalPages,
}: {
	currentPage: number;
	totalPages: number;
}) {
	return (
		<div className="p-4">
			<nav>
				<ul className="flex gap-2">
					<PaginationItem type="prev" currentPage={currentPage} disabled={currentPage <= 1} />
					<PaginationItem type="next" currentPage={currentPage} disabled={currentPage >= totalPages} />
				</ul>
			</nav>
		</div>
	);
}

const paginationMeta = {
	prev: {
		label: "Go to previous page",
		icon: <ChevronLeft color="white" className="h-4 w-4" />,
		getPage: (current: number) => current - 1,
	},
	next: {
		label: "Go to next page",
		icon: <ChevronRight color="white" className="h-4 w-4" />,
		getPage: (current: number) => current + 1,
	},
} as const;

type PaginationType = keyof typeof paginationMeta;

function PaginationItem({
	type,
	currentPage,
	disabled,
}: {
	type: PaginationType;
	currentPage: number;
	disabled: boolean;
}) {
	const { label, icon, getPage } = paginationMeta[type];
	const page = getPage(currentPage);

	return (
		<li>
			<Link
				aria-label={label}
				aria-disabled={disabled}
				href={disabled ? "#" : `?page=${page}`}
				className={cn(
					"flex items-center justify-center w-8 aspect-square",
					disabled ? "pointer-events-none bg-gray-400" : "bg-[#00693e]",
				)}
			>
				{icon}
			</Link>
		</li>
	);
}
