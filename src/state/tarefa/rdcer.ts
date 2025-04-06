import { TarefaActionTypes, TStateTarefa, TTarefaActions } from "./types";

export const initialState:TStateTarefa = {
    Tarefas: [],
}

export function reducer(state: TStateTarefa, action: TTarefaActions):TStateTarefa {

    switch (action.type) {
        case TarefaActionTypes.ADD_TAREFA:
            if (Array.isArray(action.payload)){
                return {...state,Tarefas: [...action.payload] };
            }else{
                return {...state,Tarefas: [...state.Tarefas,action.payload] };
            }
        case TarefaActionTypes.DELETE_TAREFA:
            return {
                ...state,
                Tarefas: state.Tarefas.filter(tarefa =>
                    Array.isArray(action.payload)
                        ? !action.payload.some(t => t.idTarefa === tarefa.idTarefa)
                        : tarefa.idTarefa !== action.payload.idTarefa
                ),
            };
        
        case TarefaActionTypes.DELETE_ALL_TAREFAS:
            return {
                ...state,
                Tarefas: []
            }

        case TarefaActionTypes.ALTER_TAREFA:
            return {
                ...state,
                Tarefas: state.Tarefas.map(tarefa =>
                    Array.isArray(action.payload)
                        ? action.payload.find(t => t.idTarefa === tarefa.idTarefa) || tarefa
                        : tarefa.idTarefa === action.payload.idTarefa ? action.payload : tarefa
                ),
            };

        default:
            return state;
    }
}