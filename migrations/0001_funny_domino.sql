PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_memos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`contents` text,
	`user_id` integer,
	`created_at` text DEFAULT '2025-06-02T07:58:49.868Z' NOT NULL,
	`updated_at` text DEFAULT '2025-06-02T07:58:49.868Z' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_memos`("id", "contents", "user_id", "created_at", "updated_at") SELECT "id", "contents", "user_id", "created_at", "updated_at" FROM `memos`;--> statement-breakpoint
DROP TABLE `memos`;--> statement-breakpoint
ALTER TABLE `__new_memos` RENAME TO `memos`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP INDEX `users_uuid_unique`;--> statement-breakpoint
DROP INDEX "users_username_unique";--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-06-02T07:58:49.868Z';--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-06-02T07:58:49.868Z';--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `uuid`;