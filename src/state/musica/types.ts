export type EstadoMusica = {
    somAtivado: boolean;
  };
  
  export type AcaoMusica =
    | { type: "TOGGLE_SOM" }
    | { type: "SET_SOM"; payload: boolean };
  