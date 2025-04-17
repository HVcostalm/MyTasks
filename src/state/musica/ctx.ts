import { createContext } from "react";
import { EstadoMusica, AcaoMusica } from "./types";

export const MusicaContext = createContext<{
  state: EstadoMusica;
  dispatch: React.Dispatch<AcaoMusica>;
} | null>(null);
