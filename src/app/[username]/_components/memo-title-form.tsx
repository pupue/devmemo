"use client";

import { createMemo } from "@/actions/memo";
import { extractFirstErrors } from "@/app/utils/validation";
import type { InputProps } from "@/components/ui/input";
import ErrorMessage from "@/components/ui/typography/error-message";
import { type MemoTitleErrors, MemoTitleSchema } from "@/utils/validation";
import { SendHorizontal as SubmitIcon } from "lucide-react";
import { useState } from "react";
import * as v from "valibot";

type Props = {
	userId: number;
};

export default function MemoTitleForm({ userId }: Props) {
	const [errors, setErrors] = useState<MemoTitleErrors>({});
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrors({});

		const form = e.currentTarget;

		const formData = new FormData(e.currentTarget);
		const title = formData.get("title") as string;

		const result = v.safeParse(MemoTitleSchema, {
			title,
		});

		if (!result.success) {
			const issues = v.flatten(result.issues);
			const extracted = extractFirstErrors<MemoTitleErrors>(issues.nested ?? {});
			setErrors(extracted);
			return;
		}

		setLoading(true);

		try {
			await createMemo({
				userId,
				title,
			});
			form.reset();
		} catch (error) {
			console.error("User creation failed:", error);
			setErrors({ title: "エラーが発生しました" });
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="p-4">
				<div className="relative">
					<TitleInput name="title" type="text" placeholder="タイトル" />
					<div className="flex absolute top-2/4 -translate-y-2/4 right-4">
						<button disabled={loading} type="submit">
							<SubmitIcon size={16} color="#4a6545" />
						</button>
					</div>
				</div>
			</div>
			<ErrorMessage>{errors.title}</ErrorMessage>
		</form>
	);
}

function TitleInput(props: InputProps) {
	return (
		<input
			{...props}
			type="text"
			className="rounded w-full py-2 px-4 pr-20 outline-1 outline-key placeholder:text-sm"
		/>
	);
}
