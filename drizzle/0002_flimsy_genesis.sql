CREATE TABLE `inventory` (
	`inventory_id` varchar(36) NOT NULL DEFAULT (uuid()),
	`user_id` varchar(36) NOT NULL,
	`weapon_id` varchar(36) NOT NULL,
	`quantity` int NOT NULL,
	CONSTRAINT `inventory_inventory_id` PRIMARY KEY(`inventory_id`)
);
--> statement-breakpoint
ALTER TABLE `weapon` DROP FOREIGN KEY `weapon_owner_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `admin` MODIFY COLUMN `email` varchar(30) NOT NULL;--> statement-breakpoint
ALTER TABLE `weapon_type` ADD `created_date` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `weapon` ADD `description` text NOT NULL;--> statement-breakpoint
ALTER TABLE `weapon` ADD `weapon` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_weapon_id_weapon_id_fk` FOREIGN KEY (`weapon_id`) REFERENCES `weapon`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `weapon` ADD CONSTRAINT `weapon_weapon_weapon_type_id_fk` FOREIGN KEY (`weapon`) REFERENCES `weapon_type`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `weapon` DROP COLUMN `owner`;