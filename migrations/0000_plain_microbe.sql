CREATE TABLE `memos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text DEFAULT '' NOT NULL,
	`contents` text,
	`user_id` integer,
	`created_at` text DEFAULT '2025-06-03T01:38:27.575Z' NOT NULL,
	`updated_at` text DEFAULT '2025-06-03T01:38:27.575Z' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`created_at` text DEFAULT '2025-06-03T01:38:27.575Z' NOT NULL,
	`updated_at` text DEFAULT '2025-06-03T01:38:27.575Z' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);