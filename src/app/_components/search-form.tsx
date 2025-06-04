"use client";

import { searchMemos } from "@/actions/memo";
import { getUserByUsername } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Memo } from "@/types/memo";
import { useParams } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function SearchForm() {
	const params = useParams();
	const username = params.username as string;
	const [q, setQ] = useQueryState("q", parseAsString.withDefault(""));
	const [memos, setMemos] = useState<Memo[]>([]);
	const trimmedQ = q.trim();

	const update = useDebouncedCallback((value: string) => {
		const trimmed = value.trim();
		if (trimmed) {
			setQ(trimmed);
		} else {
			setQ(null);
		}
	}, 1000);

	useEffect(() => {
		const fetch = async () => {
			const { id } = await getUserByUsername(username);
			const res = await searchMemos({ userId: id, query: trimmedQ });
			setMemos(res);
		};

		if (trimmedQ) {
			fetch();
		}
	}, [trimmedQ, username]);

	return (
		<form>
			<Input name="q" onChange={(e) => update(e.target.value)} />
			<div>{memos.length}</div>
			{trimmedQ && (
				<Button type="button" onClick={() => setQ(null)}>
					クリア
				</Button>
			)}
		</form>
	);
}
