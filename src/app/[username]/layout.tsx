import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export default async function RootLayout({
	list,
	detail,
}: Readonly<{
	list: React.ReactNode;
	detail: React.ReactNode;
}>) {
	return (
		<ResizablePanelGroup direction="horizontal">
			<ResizablePanel defaultSize={25}>
				<div className="pl-5 border-r border-key">
					<div className="grid grid-rows-[auto,1fr,auto] h-[calc(100vh-82px)] overflow-y-scroll">{list}</div>
				</div>
			</ResizablePanel>
			<ResizableHandle />
			<ResizablePanel defaultSize={75}>{detail}</ResizablePanel>
		</ResizablePanelGroup>
	);
}
