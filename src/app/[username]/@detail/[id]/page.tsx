import { getMemoById } from "@/actions/memo";
import { isClerkUsernameMatchDb } from "@/actions/user";
import { notFound } from "next/navigation";
import MemoBody from "../../_components/memo-body";

export default async function MemosDetailPage({
	params,
}: {
	params: Promise<{ username: string; id: string }>;
}) {
	const { username, id } = await params;

	const memos = await getMemoById(Number(id));

	if (!memos.length) return notFound();

	const memo = memos[0];
	const isMe = await isClerkUsernameMatchDb(username);

	return (
		<div className="editor-area h-full">
			<MemoBody memo={memo} isEditMode={isMe} />
		</div>
	);
}
