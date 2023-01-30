CREATE TABLE `mail` (
	`subject` VARCHAR CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
	`body` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
	`received_at` DATE DEFAULT '',
	`from` VARCHAR CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT ''
);