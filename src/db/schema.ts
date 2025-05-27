import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";

const timestamps = {
	createdAt: t.text("created_at").notNull().default(new Date().toISOString()),
	updatedAt: t.text("updated_at").notNull().default(new Date().toISOString()),
};

export const users = table(
	"users",
	{
		id: t.int().primaryKey({ autoIncrement: true }),
		...timestamps,
		// firstName: t.text("first_name"),
		// lastName: t.text("last_name"),
		// email: t.text().notNull(),
		// invitee: t.int().references((): AnySQLiteColumn => users.id),
		// role: t.text().$type<"guest" | "user" | "admin">().default("guest"),
	},
	// (table) => [t.uniqueIndex("email_idx").on(table.email)],
);

export const memos = table("memos", {
	id: t.int().primaryKey({ autoIncrement: true }),
	uuid: t.text().$default(() => generateUniqueString(16)),
	contents: t.text(),
	userId: t.int("user_id").references(() => users.id),
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
