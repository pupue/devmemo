ALTER TABLE `memos` RENAME COLUMN "user_id" TO "user_uuid";--> statement-breakpoint
DROP INDEX "users_uuid_unique";--> statement-breakpoint
ALTER TABLE `memos` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-05-28T02:19:03.284Z';--> statement-breakpoint
CREATE UNIQUE INDEX `users_uuid_unique` ON `users` (`uuid`);--> statement-breakpoint
ALTER TABLE `memos` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-05-28T02:19:03.284Z';--> statement-breakpoint
ALTER TABLE `memos` ALTER COLUMN "user_uuid" TO "user_uuid" integer REFERENCES users(uuid) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-05-28T02:19:03.284Z';--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-05-28T02:19:03.284Z';