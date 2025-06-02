import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";

const timestamps = {
	createdAt: t.text("created_at").notNull().default(new Date().toISOString()),
	updatedAt: t.text("updated_at").notNull().default(new Date().toISOString()),
};

export const users = table("users", {
	id: t.int().primaryKey({ autoIncrement: true }),
	username: t.text("username").notNull().unique(),
	...timestamps,
});

export const memos = table("memos", {
	id: t.int().primaryKey({ autoIncrement: true }),
	contents: t.text(),
	userId: t.int("user_id").references(() => users.id),
	...timestamps,
});
