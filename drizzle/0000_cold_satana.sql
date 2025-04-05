CREATE TABLE `tarefas` (
	`idTarefa` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`titulo` text NOT NULL,
	`descricao` text,
	`status` integer
);
