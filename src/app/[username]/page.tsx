import { countMemosByUserId, getMemosByUserId } from "@/actions/memo";
import { getUserByUsername } from "@/actions/user";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import MemoBody from "./_components/MemoBody";
import MemoList from "./_components/memo-list";
import { MemoListPagination } from "./_components/memo-list-pagination";
import MemoTitleForm from "./_components/memo-title-form";

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

	const clerkUser = await currentUser();
	const myMemos = Boolean(clerkUser?.publicMetadata.username === username);

	const selectedMemo = memoId ? memos.find((m) => m.id === Number(memoId)) : null;

	return (
		<div>
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel defaultSize={25}>
					<div className="pl-5 border-r border-key">
						<div className="grid grid-rows-[auto,1fr,auto] h-[calc(100vh-82px)] overflow-y-scroll">
							{/* {myMemos && <MemoTitleForm userId={user.id} />} */}
							<MemoTitleForm userId={user.id} />
							<div className="overflow-y-auto">
								<MemoList data={memos} activeMemoId={selectedMemo?.id} />
							</div>
							<MemoListPagination currentPage={page} totalPages={totalPages} />
						</div>
					</div>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={75}>
					<div className="editor-area h-full">
						{selectedMemo && <MemoBody data={selectedMemo} isEditMode={myMemos} />}
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
