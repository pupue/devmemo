import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { getMemos } from "@/actions";
import { CreateMemoButton } from "./_components/CreateMemoButton";
import MemoBody from "./_components/MemoBody";

export default async function Home() {
	const memos = await getMemos(1);

	return (
		<div className="max-w-5xl py-10 px-5 mx-auto">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-6xl font-bold">Devmemo</h1>
				<CreateMemoButton />
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
