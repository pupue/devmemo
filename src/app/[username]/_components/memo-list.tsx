import { cn } from "@/libs/utils";
import type { Memo } from "@/types/memo";
import Link from "next/link";

type Props = {
	data: Memo[];
	activeMemoId: number | undefined;
};

export default function MemoList({ data: memos, activeMemoId }: Props) {
	return (
		<div className="border-t border-key">
			{memos.map((memo) => (
				<Link
					key={memo.id}
					href={`?id=${memo.id}`}
					className={cn(
						"cursor-pointer block w-full border-b border-key p-4 hover:bg-gray-200",
						activeMemoId === memo.id && "pointer-events-none bg-gray-300",
					)}
				>
					{memo.title}
				</Link>
			))}
		</div>
	);
}
