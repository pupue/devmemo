import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/libs/utils";
import type { Memo } from "@/types/memo";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import MemoBody from "./MemoBody";

type Props = {
	data: Memo[];
	currentPage: number;
	totalPages: number;
	isEditMode: boolean;
};

export default function MemoList({ data: memos, currentPage, totalPages, isEditMode }: Props) {
	return (
		<div>
			<Accordion type="single" collapsible className="w-full">
				{memos.map((memo) => (
					<AccordionItem key={memo.id} value={memo.id.toString()}>
						<AccordionTrigger>{memo.title}</AccordionTrigger>
						<AccordionContent>
							<MemoBody data={memo} isEditMode={isEditMode} />
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
			<div className="flex justify-end mt-8">
				<Pagination currentPage={currentPage} totalPages={totalPages} />
			</div>
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

function Pagination({
	currentPage,
	totalPages,
}: {
	currentPage: number;
	totalPages: number;
}) {
	return (
		<nav>
			<ul className="flex gap-2">
				<PaginationItem type="prev" currentPage={currentPage} disabled={currentPage <= 1} />
				<PaginationItem type="next" currentPage={currentPage} disabled={currentPage >= totalPages} />
			</ul>
		</nav>
	);
}

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
					disabled ? "pointer-events-none bg-gray-400" : "bg-black",
				)}
			>
				{icon}
			</Link>
		</li>
	);
}
