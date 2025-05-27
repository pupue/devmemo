import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import MemoBody from "./_components/MemoBody";

const data = `# Is it accessible?
## はじめに
これは *Markdown* です`;

export default async function Home() {
	return (
		<div className="max-w-5xl py-10 px-5 mx-auto">
			<h1 className="text-6xl font-bold mb-8">Devmemo</h1>

			<Accordion type="single" collapsible className="w-full">
				<AccordionItem value="item-1">
					<AccordionTrigger>Is it accessible?</AccordionTrigger>
					<AccordionContent>
						<MemoBody title="Is it accessible?" contents={data} />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>Is it styled?</AccordionTrigger>
					<AccordionContent>
						Yes. It comes with default styles that matches the other components&apos; aesthetic.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>Is it animated?</AccordionTrigger>
					<AccordionContent>Yes. It&apos;s animated by default, but you can disable it if you prefer.</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
