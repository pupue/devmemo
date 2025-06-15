import { countMemosByUserId, getMemosByUserId } from "@/actions/memo";
import { getUserByUsername } from "@/actions/user";
import { notFound } from "next/navigation";
import MemoList from "../_components/memo-list";
import { MemoListPagination } from "../_components/memo-list-pagination";
import MemoTitleForm from "../_components/memo-title-form";

export default async function MemosPage({
	params,
	searchParams,
}: {
	params: Promise<{ username: string }>;
	searchParams: Promise<{ id?: string; page?: string }>;
}) {
	const { username } = await params;

	const user = await getUserByUsername(username);
	if (!user) return notFound();

	const { page: searchParamsPage, id: memoId } = await searchParams;
	const page = Number(searchParamsPage ?? "1");
	const limit = 10;
	const offset = (page - 1) * limit;
	const memos = await getMemosByUserId(user.id, { offset, limit });

	const total = await countMemosByUserId(user.id);
	const totalPages = Math.ceil(total / limit);

	const selectedMemo = memoId ? memos.find((m) => m.id === Number(memoId)) : null;

	return (
		<div>
			{/* {myMemos && <MemoTitleForm userId={user.id} />} */}
			<MemoTitleForm userId={user.id} />
			<div className="overflow-y-auto">
				<MemoList username={username} memos={memos} activeMemoId={selectedMemo?.id} />
			</div>
			<MemoListPagination currentPage={page} totalPages={totalPages} />
		</div>
	);
}
