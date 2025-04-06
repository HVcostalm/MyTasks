PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tarefas` (
	`idTarefa` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`titulo` text NOT NULL,
	`descricao` text,
	`status` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_tarefas`("idTarefa", "titulo", "descricao", "status") SELECT "idTarefa", "titulo", "descricao", "status" FROM `tarefas`;--> statement-breakpoint
DROP TABLE `tarefas`;--> statement-breakpoint
ALTER TABLE `__new_tarefas` RENAME TO `tarefas`;--> statement-breakpoint
PRAGMA foreign_keys=ON;