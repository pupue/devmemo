import { countMemosByUserId, getMemosByUserId } from "@/actions/memo";
import { getUserByUsername } from "@/actions/user";

import Container from "@/components/ui/container";

import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import MemoList from "./_components/memo-list";
import MemoTitleForm from "./_components/memo-title-form";

export default async function MemosPage({
	params,
	searchParams,
}: {
	params: Promise<{ username: string }>;
	searchParams: Promise<{ page?: string }>;
}) {
	const { username } = await params;

	const user = await getUserByUsername(username);
	if (!user) return notFound();

	const { page: searchParamsPage } = await searchParams;
	const page = Number(searchParamsPage ?? "1");
	const limit = 10;
	const offset = (page - 1) * limit;
	const memos = await getMemosByUserId(user.id, { offset, limit });

	const total = await countMemosByUserId(user.id);
	const totalPages = Math.ceil(total / limit);

	const clerkUser = await currentUser();
	const myMemos = clerkUser?.publicMetadata.username === username;

	return (
		<Container>
			<div className="space-y-10">
				{myMemos && <MemoTitleForm userId={user.id} />}
				<MemoList data={memos} isEditMode={myMemos} currentPage={page} totalPages={totalPages} />
			</div>
		</Container>
	);
}
