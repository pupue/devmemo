"use server";

import { extractFirstErrors } from "@/app/utils/validation";
import { users } from "@/db/schema";
import { db } from "@/libs/db";
import { type UsernameData, UsernameSchema } from "@/utils/validation";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import * as v from "valibot";

export async function createUser(data: UsernameData) {
	const result = v.safeParse(UsernameSchema, data);
	if (!result.success) {
		const issues = v.flatten(result.issues);
		const extracted = extractFirstErrors<UsernameData>(issues.nested ?? {});
		return { success: false, errors: extracted };
	}

	const user = await currentUser();
	if (!user) {
		return {
			success: false,
			errors: { username: ["ログイン情報が取得できません"] },
		};
	}
	const existing = await db.select().from(users).where(eq(users.uuid, user.id));

	if (existing.length > 0) {
		return {
			success: false,
			errors: { username: ["すでに登録済みです"] },
		};
	}

	await db.insert(users).values({
		uuid: user.id,
		username: result.output.username,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	});

	return {
		success: true,
		username: result.output.username,
	};
}
