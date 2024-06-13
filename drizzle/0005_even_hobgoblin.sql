ALTER TABLE `users` MODIFY COLUMN `name` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `weapon` MODIFY COLUMN `maintainable` boolean DEFAULT false;