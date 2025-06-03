import { sql } from "drizzle-orm";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";

export const isoDateTime = t.customType<{
	data: Date; // TypeScript上の型
	driverData: string; // DB上の型
}>({
	// DB上の型
	dataType: (): string => "text",

	// TypeScript -> DBの変換
	toDriver: (value: Date): string => value.toISOString(),

	// DB -> TypeScriptの変換
	fromDriver: (value: string): Date => new Date(value),
});

const timestamps = {
	created_at: isoDateTime().notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
	updated_at: isoDateTime().notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
};

export const users = table("users", {
	id: t.int().primaryKey({ autoIncrement: true }),
	username: t.text("username").notNull().unique(),
	...timestamps,
});

export const memos = table("memos", {
	id: t.int().primaryKey({ autoIncrement: true }),
	title: t.text("title").notNull().default(""),
	contents: t.text(),
	userId: t.int("user_id").references(() => users.id),
	...timestamps,
});
