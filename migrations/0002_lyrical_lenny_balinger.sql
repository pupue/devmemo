PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_memos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text,
	`contents` text,
	`user_uuid` text,
	`created_at` text DEFAULT '2025-05-28T02:20:43.909Z' NOT NULL,
	`updated_at` text DEFAULT '2025-05-28T02:20:43.910Z' NOT NULL,
	FOREIGN KEY (`user_uuid`) REFERENCES `users`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_memos`("id", "uuid", "contents", "user_uuid", "created_at", "updated_at") SELECT "id", "uuid", "contents", "user_uuid", "created_at", "updated_at" FROM `memos`;--> statement-breakpoint
DROP TABLE `memos`;--> statement-breakpoint
ALTER TABLE `__new_memos` RENAME TO `memos`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP INDEX "users_uuid_unique";--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-05-28T02:20:43.909Z';--> statement-breakpoint
CREATE UNIQUE INDEX `users_uuid_unique` ON `users` (`uuid`);--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-05-28T02:20:43.910Z';