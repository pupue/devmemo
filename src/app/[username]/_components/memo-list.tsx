import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
	Pagination as ClerkPagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import type { Memo } from "@/types/memo";
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
			<Pagination currentPage={currentPage} totalPages={totalPages} />
		</div>
	);
}

function Pagination({
	currentPage,
	totalPages,
}: {
	currentPage: number;
	totalPages: number;
}) {
	const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
	const maxVisible = 5;
	const shouldEllipsis = totalPages > maxVisible;
	const visiblePages = shouldEllipsis ? pageNumbers.slice(0, maxVisible) : pageNumbers;

	return (
		<ClerkPagination className="mt-8">
			<PaginationContent>
				{/* 前へ */}
				{currentPage > 1 && (
					<PaginationItem>
						<PaginationPrevious href={`?page=${currentPage - 1}`} />
					</PaginationItem>
				)}

				{/* ページ番号 */}
				{visiblePages.map((p) => (
					<PaginationItem key={p}>
						<PaginationLink href={`?page=${p}`} isActive={p === currentPage}>
							{p}
						</PaginationLink>
					</PaginationItem>
				))}

				{/* 省略記号 */}
				{shouldEllipsis && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				{/* 次へ */}
				{currentPage < totalPages && (
					<PaginationItem>
						<PaginationNext href={`?page=${currentPage + 1}`} />
					</PaginationItem>
				)}
			</PaginationContent>
		</ClerkPagination>
	);
}
