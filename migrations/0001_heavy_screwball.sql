DROP INDEX "users_username_unique";--> statement-breakpoint
ALTER TABLE `memos` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
ALTER TABLE `memos` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));