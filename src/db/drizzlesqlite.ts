import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm"; 
import { SQLiteTable } from "drizzle-orm/sqlite-core";
import { DATABASE_NAME, tarefasTable } from "./schema";
import { openDatabaseSync } from "expo-sqlite";
import {  TTarefaAttr } from "../model/tarefa";
import { SQL } from "drizzle-orm";

const DZSQLiteConnect = (dbname: string) => {
    const db = openDatabaseSync(dbname);
    const conn = drizzle(db);
    return conn;
}

async function DZSQLiteInsert<T extends {}>(
    table: SQLiteTable,
    data: T,
    dbname: string = DATABASE_NAME
  ): Promise<number> {
    const conn = DZSQLiteConnect(dbname);
  
    // Remove campos com valor 0, como idTarefa
    const sanitizedData = { ...data };
    delete (sanitizedData as any).idTarefa;
  
    const result = await conn.insert(table).values(sanitizedData).returning();
    const inserted = result[0] as any;
    return inserted.idTarefa;
  }
  


async function DZSQLiteSelect<T extends {}>(
    table: SQLiteTable,
    whereClause?: SQL,
    dbname: string = DATABASE_NAME
): Promise<T[]> {
    const conn = DZSQLiteConnect(dbname);

    const query = whereClause
        ? conn.select().from(table).where(whereClause)
        : conn.select().from(table);

    const result = await query;
    return result as T[];
}


async function DZSQLiteUpdate<T extends { idTarefa: number }>(
    id: number, 
    newData: Partial<TTarefaAttr>, 
    dbname: string = DATABASE_NAME
) {
    const conn = await DZSQLiteConnect(dbname);
    await conn.update(tarefasTable).set(newData).where(eq(tarefasTable.idTarefa, id));

}

async function DZSQLiteDelete(
    id: number, 
    dbname: string = DATABASE_NAME
) {
    const conn = DZSQLiteConnect(dbname);
    await conn.delete(tarefasTable).where(eq(tarefasTable.idTarefa, id)); 
}

async function DZSQLiteDeleteAll(dbname: string = DATABASE_NAME) {
    const conn = DZSQLiteConnect(dbname);
    await conn.delete(tarefasTable);
}

export { DZSQLiteInsert, DZSQLiteSelect, DZSQLiteUpdate, DZSQLiteDelete, DZSQLiteDeleteAll };
