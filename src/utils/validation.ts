import * as v from "valibot";

export const UsernameSchema = v.object({
	username: v.pipe(
		v.string("入力必須です"),
		v.minLength(3, "3文字以上で入力してください"),
		v.maxLength(20, "20文字以下で入力してください"),
		v.regex(/^[a-zA-Z0-9]+$/, "英数字のみ使用可能です"),
	),
});

export type UsernameData = v.InferOutput<typeof UsernameSchema>;
export type UsernameErrors = Partial<Record<string, string>>;
