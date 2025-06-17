import Link from "next/link";

export default function Logo() {
	return (
		<div>
			<Link href="/" className="text-2xl font-extrabold">
				ただ思いついたことをさっとメモに残していくアプリ
			</Link>
		</div>
	);
}
