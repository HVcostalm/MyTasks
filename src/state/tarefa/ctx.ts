import { useContext, createContext } from 'react';
import { TTarefaDispatch } from './types';
import { initialState } from './rdcer';

export const TarefaContext = createContext<TTarefaDispatch|null>(null);

export function useContextTarefa() {
    
    const value = useContext(TarefaContext);
    const nullDispatch:TTarefaDispatch = {state:initialState,dispatch:()=>{}};

    if (process.env.NODE_ENV !== 'production') {
      if (!value) {
        throw new Error('useSession must be wrapped in a <SessionProvider />');
      }
    }
    
    return value?value:nullDispatch;
}