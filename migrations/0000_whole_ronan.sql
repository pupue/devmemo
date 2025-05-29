CREATE TABLE `memos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text,
	`contents` text,
	`user_uuid` text,
	`created_at` text DEFAULT '2025-05-29T07:03:02.486Z' NOT NULL,
	`updated_at` text DEFAULT '2025-05-29T07:03:02.487Z' NOT NULL,
	FOREIGN KEY (`user_uuid`) REFERENCES `users`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`username` text NOT NULL,
	`created_at` text DEFAULT '2025-05-29T07:03:02.486Z' NOT NULL,
	`updated_at` text DEFAULT '2025-05-29T07:03:02.487Z' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_uuid_unique` ON `users` (`uuid`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);