import MemoList from "./memo-list";

type Props = {
	username: string;
};

export default async function Sidebar({ username }: Props) {
	return (
		<div className="pl-5 border-r border-key">
			<div className="grid grid-rows-[auto,1fr,auto] h-[calc(100vh-82px)] overflow-y-scroll">
				<MemoList username={username} />
			</div>
		</div>
	);
}
