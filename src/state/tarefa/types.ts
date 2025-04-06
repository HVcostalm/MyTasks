import { TTarefaAttr } from "@/src/model/tarefa";

// action types
export enum TarefaActionTypes {
    ADD_TAREFA = "ADD_Tarefa",
    DELETE_TAREFA = "DELETE_Tarefa",
    ALTER_TAREFA = "ALTER_Tarefa",
    DELETE_ALL_TAREFAS = "DELETE_ALL_TAREFAS",
}

type DeleteTarefaAction = {type:TarefaActionTypes.DELETE_TAREFA,payload:TTarefaAttr|TTarefaAttr[]}
type DeleteAllTarefaAction = {type:TarefaActionTypes.DELETE_ALL_TAREFAS}
type AddTarefaAction = {type:TarefaActionTypes.ADD_TAREFA,payload:TTarefaAttr|TTarefaAttr[]}
type AlterTarefaAction = {type:TarefaActionTypes.ALTER_TAREFA,payload:TTarefaAttr|TTarefaAttr[]}

export type TTarefaActions = AddTarefaAction|DeleteTarefaAction|AlterTarefaAction|DeleteAllTarefaAction

// state types
export type TStateTarefa = {
    Tarefas: TTarefaAttr[]
}

// reducer dispatch
export type TTarefaDispatch = {
    state: TStateTarefa;
    dispatch: React.Dispatch<TTarefaActions>;
};
