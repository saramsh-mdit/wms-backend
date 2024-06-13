ALTER TABLE `weapon` CHANGE `weapon` `weapon_type` varchar(36); --> statement-breakpoint
ALTER TABLE `weapon` DROP FOREIGN KEY `weapon_weapon_weapon_type_id_fk`;
--> statement-breakpoint
ALTER TABLE `admin` MODIFY COLUMN `name` varchar(20);--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `name` varchar(20);--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` varchar(30) NOT NULL;--> statement-breakpoint
ALTER TABLE `weapon` ADD CONSTRAINT `weapon_weapon_type_weapon_type_id_fk` FOREIGN KEY (`weapon_type`) REFERENCES `weapon_type`(`id`) ON DELETE no action ON UPDATE no action;