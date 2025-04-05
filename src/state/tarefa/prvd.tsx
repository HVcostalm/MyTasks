import { PropsWithChildren, useReducer } from "react";
import { TarefaContext } from "./ctx";
import { initialState, reducer } from "./rdcer";

export function TarefaProvider({ children }: PropsWithChildren) {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <TarefaContext.Provider value={{ state, dispatch }}>
            {children}
        </TarefaContext.Provider>
    )
}