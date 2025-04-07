import { TTarefaAttr } from "@/src/model/tarefa";

// action types
export enum TarefaActionTypes {
    ADD_TAREFA = "ADD_Tarefa",
    ADD_TAREFA_CONCLUIDA = "ADD_Tarefa_Concluida",
    DELETE_TAREFA = "DELETE_Tarefa",
    ALTER_TAREFA = "ALTER_Tarefa",
    CONCLUDE_TAREFA = "CONCLUDE_Tarefa",
    DELETE_ALL_TAREFAS = "DELETE_ALL_TAREFAS",
}

type DeleteTarefaAction = {type:TarefaActionTypes.DELETE_TAREFA,payload:TTarefaAttr|TTarefaAttr[]}
type DeleteAllTarefaAction = {type:TarefaActionTypes.DELETE_ALL_TAREFAS}
type AddTarefaAction = {type:TarefaActionTypes.ADD_TAREFA,payload:TTarefaAttr|TTarefaAttr[]}
type AddTarefaConcluidaAction = {type:TarefaActionTypes.ADD_TAREFA_CONCLUIDA,payload:TTarefaAttr|TTarefaAttr[]}
type AlterTarefaAction = {type:TarefaActionTypes.ALTER_TAREFA,payload:TTarefaAttr|TTarefaAttr[]}
type ConcludeTarefaAction = {type:TarefaActionTypes.CONCLUDE_TAREFA,payload:TTarefaAttr|TTarefaAttr[]}

export type TTarefaActions = AddTarefaAction|DeleteTarefaAction|AlterTarefaAction|DeleteAllTarefaAction|AddTarefaConcluidaAction|ConcludeTarefaAction

// state types
export type TStateTarefa = {
    Tarefas: TTarefaAttr[]
    TarefasConcluidas: TTarefaAttr[]
}

// reducer dispatch
export type TTarefaDispatch = {
    state: TStateTarefa;
    dispatch: React.Dispatch<TTarefaActions>;
};
