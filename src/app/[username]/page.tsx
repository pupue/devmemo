import { getMemos } from "@/actions/memo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { currentUser } from "@clerk/nextjs/server";
import { CreateMemoButton } from "./_components/CreateMemoButton";
import MemoBody from "./_components/MemoBody";

export default async function Home() {
	const user = await currentUser();

	if (!user) return null;

	const memos = await getMemos(user.id);

	return (
		<div className="max-w-5xl py-10 px-5 mx-auto">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-6xl font-bold">Devmemo</h1>
				<CreateMemoButton userId={user.id} />
			</div>
			<Accordion type="single" collapsible className="w-full">
				{memos.map((memo) => (
					<AccordionItem key={memo.id} value={memo.id.toString()}>
						<AccordionTrigger>{extractTitle(memo.contents)}</AccordionTrigger>
						<AccordionContent>
							<MemoBody data={memo} />
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}

function extractTitle(markdown: string | null): string {
	const lines = (markdown ?? "").split("\n");
	for (const line of lines) {
		if (line.startsWith("# ")) return line.replace("# ", "").trim();
	}
	return "NO TITLE";
}
