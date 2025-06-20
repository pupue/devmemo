"use client";
import { useEffect, useRef, useState } from "react";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { updateMemo } from "@/actions/memo";
import type { Memo } from "@/types/memo";
import { codeBlock } from "@blocknote/code-block";
import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import Markdown from "react-markdown";

type Props = {
	memo: Memo;
	isEditMode: boolean;
};

const schema = BlockNoteSchema.create({
	blockSpecs: {
		paragraph: defaultBlockSpecs.paragraph,
		heading: defaultBlockSpecs.heading,
		bulletListItem: defaultBlockSpecs.bulletListItem,
		codeBlock: defaultBlockSpecs.codeBlock,
	},
});

export default function MemoBody({ memo, isEditMode }: Props) {
	const { id, contents } = memo;

	const [isEditing, setIsEditing] = useState(false);
	const [markdown, setMarkdown] = useState<string>(contents ?? "");

	const editor = useCreateBlockNote({ schema, codeBlock });

	// 初期データ読み込み
	useEffect(() => {
		async function loadInitialHTML() {
			const blocks = await editor.tryParseMarkdownToBlocks(contents ?? "");
			editor.replaceBlocks(editor.document, blocks);
		}
		loadInitialHTML();
	}, [editor, contents]);

	// オートセーブ処理
	const saveTimeout = useRef<NodeJS.Timeout | null>(null);
	const lastSavedMarkdown = useRef<string>(contents ?? "");
	useEffect(() => {
		if (!editor) return;

		const unsubscribe = editor.onChange(() => {
			if (saveTimeout.current) clearTimeout(saveTimeout.current);

			saveTimeout.current = setTimeout(async () => {
				const blocks = editor.document;
				const markdownFromBlocks = await editor.blocksToMarkdownLossy(blocks);

				if (markdownFromBlocks !== lastSavedMarkdown.current) {
					console.log("auto-save");
					await updateMemo(id, markdownFromBlocks);
					lastSavedMarkdown.current = markdownFromBlocks;
					setMarkdown(markdownFromBlocks);
				}
			}, 2000);
		});

		return () => {
			unsubscribe?.();
			if (saveTimeout.current) clearTimeout(saveTimeout.current);
		};
	}, [editor, id]);

	if (!editor) return <p>読み込み中...</p>;

	return (
		<div>
			{isEditMode ? (
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

			{/* {isEditMode && (
        <div className="flex justify-end space-x-2 mt-2">
          {isEditing ? (
            <Button
              onClick={handeSave}
              className="bg-green-500 hover:bg-green-500/90 text-white"
            >
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
                  This action cannot be undone. The memo will be permanently
                  removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteMemo(id)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )} */}
		</div>
	);
}
