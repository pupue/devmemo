import { countMemosByUserId, getMemosByUserId } from "@/actions/memo";
import { getUserByUsername } from "@/actions/user";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Container from "@/components/ui/container";
import {
	Pagination as ClerkPagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { CreateMemoButton } from "./_components/CreateMemoButton";
import MemoBody from "./_components/MemoBody";

export default async function MemosPage({
	params,
	searchParams,
}: {
	params: { username: string };
	searchParams: { page?: string };
}) {
	const { username } = params;

	const user = await getUserByUsername(username);
	if (!user) return notFound();

	const page = Number(searchParams.page ?? "1");
	const limit = 10;
	const offset = (page - 1) * limit;
	const memos = await getMemosByUserId(user.id, { offset, limit });

	const total = await countMemosByUserId(user.id);
	const totalPages = Math.ceil(total / limit);

	const clerkUser = await currentUser();
	const myMemos = clerkUser?.publicMetadata.username === username;

	return (
		<Container>
			{myMemos && (
				<div className="flex justify-end items-center mb-8">
					<CreateMemoButton userId={user.id} />
				</div>
			)}
			<Accordion type="single" collapsible className="w-full">
				{memos.map((memo) => (
					<AccordionItem key={memo.id} value={memo.id.toString()}>
						<AccordionTrigger>{extractTitle(memo.contents)}</AccordionTrigger>
						<AccordionContent>
							<MemoBody data={memo} showEditButton={myMemos} />
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
			<Pagination currentPage={page} totalPages={totalPages} />
		</Container>
	);
}

function extractTitle(markdown: string | null): string {
	const lines = (markdown ?? "").split("\n");
	for (const line of lines) {
		if (line.startsWith("# ")) return line.replace("# ", "").trim();
	}
	return "NO TITLE";
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
