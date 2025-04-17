import React, { useReducer, useEffect } from "react";
import { MusicaContext } from "./ctx";
import { reducerMusica } from "./rdcer";
import { EstadoMusica } from "./types";
import { DZSQLiteInsertMusica, DZSQLiteSelect, DZSQLiteUpdateMusica } from "../../db/drizzlesqlite";
import { musicaTable } from "../../db/schema";

const estadoInicial: EstadoMusica = {
  somAtivado: true, // default caso nada no banco
};

export const MusicaProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducerMusica, estadoInicial);

  useEffect(() => {
    (async () => {
      const config = await DZSQLiteSelect<{ id: number; somAtivado: number }>(musicaTable);
      if (config.length > 0) {
        dispatch({ type: "SET_SOM", payload: config[0].somAtivado === 1 });
      } else {
        await DZSQLiteInsertMusica(musicaTable, { somAtivado: 1 });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const config = await DZSQLiteSelect<{ id: number; somAtivado: number }>(musicaTable);
      if (config.length > 0) {
        await DZSQLiteUpdateMusica(config[0].id, { somAtivado: state.somAtivado ? 1 : 0 }, musicaTable, musicaTable.id
          );
      }
    })();
  }, [state.somAtivado]);

  return (
    <MusicaContext.Provider value={{ state, dispatch }}>
      {children}
    </MusicaContext.Provider>
  );
};
