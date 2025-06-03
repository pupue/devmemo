DROP INDEX "users_username_unique";--> statement-breakpoint
ALTER TABLE `memos` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-06-03T00:11:34.315Z';--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
ALTER TABLE `memos` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-06-03T00:11:34.316Z';--> statement-breakpoint
ALTER TABLE `memos` ADD `title` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-06-03T00:11:34.315Z';--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-06-03T00:11:34.316Z';