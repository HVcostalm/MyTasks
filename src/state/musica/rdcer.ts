import { EstadoMusica, AcaoMusica } from "./types";

export function reducerMusica(state: EstadoMusica, action: AcaoMusica): EstadoMusica {
  switch (action.type) {
    case "TOGGLE_SOM":
      return { ...state, somAtivado: !state.somAtivado };
    case "SET_SOM":
      return { ...state, somAtivado: action.payload };
    default:
      return state;
  }
}
