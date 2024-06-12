CREATE TABLE `admin` (
	`id` varchar(36) NOT NULL DEFAULT (uuid()),
	`name` varchar(10),
	`email` varchar(20) NOT NULL,
	`password` varchar(30) NOT NULL,
	CONSTRAINT `admin_id` PRIMARY KEY(`id`),
	CONSTRAINT `admin_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL DEFAULT (uuid()),
	`name` varchar(10),
	`email` varchar(20) NOT NULL,
	`password` varchar(30) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `weapon_type` (
	`id` varchar(36) NOT NULL DEFAULT (uuid()),
	`name` text,
	CONSTRAINT `weapon_type_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `weapon` (
	`id` varchar(36) NOT NULL DEFAULT (uuid()),
	`name` varchar(30) NOT NULL,
	`image` text NOT NULL,
	`quantity` int NOT NULL,
	`maintainable` boolean DEFAULT true,
	`created_date` timestamp DEFAULT (now()),
	`owner` varchar(36) DEFAULT (uuid()),
	CONSTRAINT `weapon_id` PRIMARY KEY(`id`)
);
