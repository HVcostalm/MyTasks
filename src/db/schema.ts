import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const DATABASE_NAME = "mytasks";
export const TABLENAME_TAREFA = "tarefas";

export const tarefasTable = sqliteTable(TABLENAME_TAREFA, {
    idTarefa: integer().primaryKey({ autoIncrement: true }),
    titulo:text().notNull(),
    descricao:text(),
    status: integer().notNull(),
});