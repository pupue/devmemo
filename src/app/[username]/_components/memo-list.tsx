import { cn } from "@/libs/utils";
import type { Memo } from "@/types/memo";
import Link from "next/link";

type Props = {
	memos: Memo[];
	activeMemoId: number | undefined;
	username: string;
};

export default function MemoList({ memos, activeMemoId, username }: Props) {
	return (
		<div className="border-t border-key">
			{memos.map((memo) => (
				<Link
					key={memo.id}
					href={`/${username}/${memo.id}`}
					className={cn(
						"text-sm cursor-pointer block w-full border-b border-key p-4 hover:bg-gray-200",
						activeMemoId === memo.id && "pointer-events-none bg-gray-300",
					)}
				>
					{memo.title}
				</Link>
			))}
		</div>
	);
}
