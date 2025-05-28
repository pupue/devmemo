CREATE TABLE `memos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text,
	`contents` text,
	`user_id` integer,
	`created_at` text DEFAULT '2025-05-28T02:09:02.176Z' NOT NULL,
	`updated_at` text DEFAULT '2025-05-28T02:09:02.177Z' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`created_at` text DEFAULT '2025-05-28T02:09:02.176Z' NOT NULL,
	`updated_at` text DEFAULT '2025-05-28T02:09:02.177Z' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_uuid_unique` ON `users` (`uuid`);