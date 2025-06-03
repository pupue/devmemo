"use server";

import { memos } from "@/db/schema";
import { db } from "@/libs/db";
import type { InsertMemo } from "@/types/memo";
import { desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * user_idからメモを取得する
 */
export async function getMemosByUserId(userId: number, opts: { offset: number; limit: number }) {
	return await db
		.select()
		.from(memos)
		.where(eq(memos.userId, userId))
		.orderBy(desc(memos.created_at))
		.limit(opts.limit)
		.offset(opts.offset);
}

/**
 * user_idからメモの数を取得する
 */
export async function countMemosByUserId(userId: number) {
	const result = await db.select({ count: sql<number>`count(*)` }).from(memos).where(eq(memos.userId, userId));
	return result[0].count;
}

/**
 * メモを作成する
 */
export type CreateMemoProps = Pick<InsertMemo, "userId" | "title">;
export async function createMemo(data: CreateMemoProps) {
	try {
		await db.insert(memos).values({ ...data });
		revalidatePath("/memos");
	} catch (error) {
		console.error("Error creating memo:", error);
		throw new Error("Failed to create memo");
	}
}

export async function updateMemo(id: number, contents: string) {
	try {
		await db
			.update(memos)
			.set({
				contents,
				updated_at: sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`,
			})
			.where(eq(memos.id, id));
		revalidatePath("/memos");
	} catch (error) {
		console.error("Error updating memo:", error);
		throw new Error("Failed to update memo");
	}
}

export async function deleteMemo(id: number) {
	try {
		await db.delete(memos).where(eq(memos.id, id));
		revalidatePath("/memos");
	} catch (error) {
		console.error("Error deleting memo:", error);
		throw new Error("Failed to delete memo");
	}
}
