"use client";

import { createMemo } from "@/actions/memo";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Props = {
	userId: number;
};

export function CreateMemoButton({ userId }: Props) {
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState("");

	const handleCreate = async () => {
		if (!title.trim()) return;

		const markdown = `# ${title.trim()}`;
		await createMemo(userId, markdown);

		setTitle("");
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>New Memo</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Memo</DialogTitle>
					<DialogDescription>You can write markdown and save it.</DialogDescription>
				</DialogHeader>
				<Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
				<DialogFooter>
					<Button variant="secondary" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button onClick={handleCreate}>Create</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
