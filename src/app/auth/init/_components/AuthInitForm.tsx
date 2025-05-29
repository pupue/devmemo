"use client";

import { createUser } from "@/actions/user";
import { extractFirstErrors } from "@/app/utils/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type UsernameData, type UsernameErrors, UsernameSchema } from "@/utils/validation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as v from "valibot";

export default function AuthInitForm() {
	const router = useRouter();
	const [errors, setErrors] = useState<UsernameErrors>({});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrors({});

		const formData = new FormData(e.currentTarget);
		const data = {
			username: formData.get("username") as string,
		};

		const result = v.safeParse(UsernameSchema, data);

		if (!result.success) {
			const issues = v.flatten(result.issues);
			const extracted = extractFirstErrors<UsernameData>(issues.nested ?? {});
			setErrors(extracted);
		}

		try {
			const res = await createUser(data);
			if (res.success) {
				router.push(`/${res.username}`);
			}
		} catch (error) {
			console.error("User creation failed:", error);
			setErrors({ username: "ユーザーの作成に失敗しました。" });
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="username">ユーザー名</Label>
				<Input name="username" type="text" id="username" placeholder="komi" error={errors.username} />
			</div>
			<Button type="submit">送信</Button>
		</form>
	);
}
