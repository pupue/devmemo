import { getMemosByUserId } from "@/actions/memo";
import { getUserByUsername } from "@/actions/user";
import { notFound } from "next/navigation";
import MemoListItemButton from "./memo-list-item-button";

type Props = {
	username: string;
};

export default async function MemoList({ username }: Props) {
	const user = await getUserByUsername(username);
	if (!user) return notFound();

	const limit = 10;
	const offset = (1 - 1) * limit;
	const memos = await getMemosByUserId(user.id, { offset, limit });

	return (
		<div className="border-t border-key">
			{memos.map((memo) => (
				<MemoListItemButton key={memo.id} href={`/${username}/${memo.id}`}>
					{memo.title}
				</MemoListItemButton>
			))}
		</div>
	);
}
