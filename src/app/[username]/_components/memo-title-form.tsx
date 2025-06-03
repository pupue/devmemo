"use client";

import { createMemo } from "@/actions/memo";
import { extractFirstErrors } from "@/app/utils/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ErrorMessage from "@/components/ui/typography/error-message";
import { type MemoTitleErrors, MemoTitleSchema } from "@/utils/validation";
import { useState } from "react";
import * as v from "valibot";

type Props = {
	userId: number;
};

export default function MemoTitleForm({ userId }: Props) {
	const [errors, setErrors] = useState<MemoTitleErrors>({});

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

		try {
			await createMemo({
				userId,
				title,
			});
			form.reset();
		} catch (error) {
			console.error("User creation failed:", error);
			setErrors({ title: "エラーが発生しました" });
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="flex items-center gap-2">
				<Input name="title" type="text" placeholder="タイトル" />
				<Button type="submit">追加</Button>
			</div>
			<ErrorMessage>{errors.title}</ErrorMessage>
		</form>
	);
}
