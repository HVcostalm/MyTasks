import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const DATABASE_NAME = "mytasks";
export const TABLENAME_TAREFA = "tarefas";
export const TABLENAME_MUSICA = "musica";

export const tarefasTable = sqliteTable(TABLENAME_TAREFA, {
    idTarefa: integer().primaryKey({ autoIncrement: true }),
    titulo:text().notNull(),
    descricao:text(),
    status: integer().notNull(),
});

export const musicaTable = sqliteTable(TABLENAME_MUSICA, {
    id: integer().primaryKey({ autoIncrement: true }),
    somAtivado: integer().notNull() // 1 para true, 0 para false
  });