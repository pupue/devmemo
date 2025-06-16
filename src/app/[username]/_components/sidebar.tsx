import { getUserByUsername } from "@/actions/user";
import MemoList from "./memo-list";
import { MemoListPagination } from "./memo-list-pagination";
import MemoTitleForm from "./memo-title-form";

type Props = {
	username: string;
};

export default async function Sidebar({ username }: Props) {
	const user = await getUserByUsername(username);

	return (
		<div className="pl-5 border-r border-key">
			<div className="grid grid-rows-[auto,1fr,auto] h-[calc(100vh-82px)] overflow-y-scroll">
				<div>
					{/* {myMemos && <MemoTitleForm userId={user.id} />} */}
					<MemoTitleForm userId={user.id} />
					<div className="overflow-y-auto">
						<MemoList username={username} />
					</div>
					<MemoListPagination currentPage={1} totalPages={1} />
				</div>
			</div>
		</div>
	);
}
