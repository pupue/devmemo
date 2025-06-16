import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import Sidebar from "./_components/sidebar";

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ username: string }>;
}>) {
	const { username } = await params;

	return (
		<ResizablePanelGroup direction="horizontal">
			<ResizablePanel defaultSize={25}>
				<Sidebar username={username} />
			</ResizablePanel>
			<ResizableHandle />
			<ResizablePanel defaultSize={75}>{children}</ResizablePanel>
		</ResizablePanelGroup>
	);
}
