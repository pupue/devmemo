"use server";

import { memos } from "@/db/schema";
import { db } from "@/libs/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getMemos(userId: string) {
	const rows = await db.select().from(memos).where(eq(memos.userUuid, userId));
	return rows;
}

export async function createMemo(userId: string, contents: string) {
	try {
		await db.insert(memos).values({
			uuid: crypto.randomUUID(),
			contents,
			userUuid: userId,
		});
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
				updatedAt: new Date().toISOString(),
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
