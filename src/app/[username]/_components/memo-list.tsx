import { getMemosByUserId } from "@/actions/memo";
import { getUserByUsername, isClerkUsernameMatchDb } from "@/actions/user";
import { notFound } from "next/navigation";
import MemoListItemButton from "./memo-list-item-button";
import { MemoListPagination } from "./memo-list-pagination";
import MemoTitleForm from "./memo-title-form";

type Props = {
	username: string;
};

export default async function MemoList({ username }: Props) {
	const user = await getUserByUsername(username);
	if (!user) return notFound();

	const isMe = await isClerkUsernameMatchDb(username);

	const limit = 10;
	const offset = (1 - 1) * limit;
	const memos = await getMemosByUserId(user.id, { offset, limit });

	return (
		<div>
			{isMe && <MemoTitleForm userId={user.id} />}
			<div className="overflow-y-auto">
				<div className="border-t border-key">
					{memos.map((memo) => (
						<MemoListItemButton key={memo.id} href={`/${username}/${memo.id}`}>
							{memo.title}
						</MemoListItemButton>
					))}
				</div>
			</div>
			<MemoListPagination currentPage={1} totalPages={1} />
		</div>
	);
}
