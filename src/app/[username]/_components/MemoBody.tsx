"use client";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 as DeleteIcon, Check as DoneIcon, SquarePen as EditIcon } from "lucide-react";
import { useEffect, useState } from "react";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { deleteMemo, updateMemo } from "@/actions/memo";
import type { Memo } from "@/types/memo";
import { codeBlock } from "@blocknote/code-block";
import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import Markdown from "react-markdown";

type Props = {
	data: Memo;
	showEditButton: boolean;
};

const schema = BlockNoteSchema.create({
	blockSpecs: {
		paragraph: defaultBlockSpecs.paragraph,
		heading: defaultBlockSpecs.heading,
		bulletListItem: defaultBlockSpecs.bulletListItem,
		codeBlock: defaultBlockSpecs.codeBlock,
	},
});

export default function MemoBody({ data, showEditButton }: Props) {
	const { id, contents } = data;

	const [isEditing, setIsEditing] = useState(false);
	const [markdown, setMarkdown] = useState<string>(contents ?? "");

	const editor = useCreateBlockNote({ schema, codeBlock });

	useEffect(() => {
		async function loadInitialHTML() {
			const blocks = await editor.tryParseMarkdownToBlocks(contents ?? "");
			editor.replaceBlocks(editor.document, blocks);
		}
		loadInitialHTML();
	}, [editor, contents]);

	const handeSave = async () => {
		if (!editor) return;
		const blocks = editor.document;
		const markdownFromBlocks = await editor.blocksToMarkdownLossy(blocks);
		updateMemo(id, markdownFromBlocks);
		setMarkdown(markdownFromBlocks);
		setIsEditing(false);
	};

	if (!editor) return <p>読み込み中...</p>;

	return (
		<div>
			{isEditing ? (
				<BlockNoteView editor={editor} />
			) : (
				<div className="bn-default-styles">
					<Markdown
						components={{
							h1: () => null,
							h2: ({ node, children, ...props }) => {
								const id = crypto.randomUUID();
								return (
									<div className="bn-block-outer" data-node-type="blockOuter" data-id={id}>
										<div className="bn-block" data-node-type="blockContainer" data-id={id}>
											<div className="bn-block-content" data-content-type="heading" data-level="2">
												<h2 className="bn-inline-content" {...props}>
													{children}
												</h2>
											</div>
										</div>
									</div>
								);
							},
						}}
					>
						{markdown}
					</Markdown>
				</div>
			)}

			{showEditButton && (
				<div className="flex justify-end space-x-2 mt-2">
					{isEditing ? (
						<Button onClick={handeSave} className="bg-green-500 hover:bg-green-500/90 text-white">
							<DoneIcon />
						</Button>
					) : (
						<Button variant="outline" onClick={() => setIsEditing(true)}>
							<EditIcon />
						</Button>
					)}

					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="destructive">
								<DeleteIcon />
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Delete this memo?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. The memo will be permanently removed.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={() => deleteMemo(id)}>Delete</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			)}
		</div>
	);
}
