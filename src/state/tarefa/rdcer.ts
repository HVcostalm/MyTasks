import { TarefaActionTypes, TStateTarefa, TTarefaActions } from "./types";

export const initialState:TStateTarefa = {
    Tarefas: [],
    TarefasConcluidas: [],
}

export function reducer(state: TStateTarefa, action: TTarefaActions):TStateTarefa {

    switch (action.type) {
        case TarefaActionTypes.ADD_TAREFA:
            if (Array.isArray(action.payload)){
                return {...state,Tarefas: [...action.payload] };
            }else{
                return {...state,Tarefas: [...state.Tarefas,action.payload] };
            }
        case TarefaActionTypes.ADD_TAREFA_CONCLUIDA:
            if (Array.isArray(action.payload)) {
                return { ...state, TarefasConcluidas: [...action.payload] };
            } else {
                return { ...state, TarefasConcluidas: [...state.TarefasConcluidas, action.payload] };
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
                Tarefas: [],
                TarefasConcluidas: []
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
        
        case TarefaActionTypes.CONCLUDE_TAREFA:
            const payloadArray = Array.isArray(action.payload) ? action.payload : [action.payload];

            const novasConcluidas = payloadArray.filter(t => t.status === 2);
            const novasPendentes = payloadArray.filter(t => t.status !== 2);

            const tarefasAtualizadas = state.Tarefas.map(tarefa => {
                const modificada = payloadArray.find(t => t.idTarefa === tarefa.idTarefa);
                return modificada ? modificada : tarefa;
            }).filter(t => t.status !== 2);

            const concluidasAtualizadas = [
                ...state.TarefasConcluidas.filter(
                    t => !novasConcluidas.some(nt => nt.idTarefa === t.idTarefa)
                ),
                ...novasConcluidas
            ];

            return {
                ...state,
                Tarefas: [...tarefasAtualizadas, ...novasPendentes],
                TarefasConcluidas: concluidasAtualizadas,
            };

        default:
            return state;
    }
}