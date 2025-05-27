"use server";

import { db } from "@/lib/db";
import { memos } from "./db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getMemos(userId: number) {
	const rows = await db.select().from(memos).where(eq(memos.userId, userId));
	return rows;
}

export async function createMemo(contents: string) {
	try {
		await db.insert(memos).values({
			uuid: crypto.randomUUID(),
			contents,
			userId: 1, // Assuming a user ID of 1 for demonstration purposes
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
