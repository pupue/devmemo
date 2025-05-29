import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";

const timestamps = {
	createdAt: t.text("created_at").notNull().default(new Date().toISOString()),
	updatedAt: t.text("updated_at").notNull().default(new Date().toISOString()),
};

export const users = table("users", {
	id: t.int().primaryKey({ autoIncrement: true }),
	uuid: t.text("uuid").notNull().unique(),
	...timestamps,
});

export const memos = table("memos", {
	id: t.int().primaryKey({ autoIncrement: true }),
	uuid: t.text().$default(() => generateUniqueString(16)),
	contents: t.text(),
	userUuid: t.text("user_uuid").references(() => users.uuid),
	...timestamps,
});

function generateUniqueString(length = 12): string {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let uniqueString = "";

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		uniqueString += characters[randomIndex];
	}

	return uniqueString;
}
