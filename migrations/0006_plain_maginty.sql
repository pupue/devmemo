DROP INDEX "users_username_unique";--> statement-breakpoint
ALTER TABLE `memos` ALTER COLUMN "title" TO "title" text DEFAULT '';--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
ALTER TABLE `memos` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-06-03T01:09:08.183Z';--> statement-breakpoint
ALTER TABLE `memos` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-06-03T01:09:08.184Z';--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-06-03T01:09:08.183Z';--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-06-03T01:09:08.184Z';