ALTER TABLE `admin` MODIFY COLUMN `password` varchar(200) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `password` varchar(200) NOT NULL;