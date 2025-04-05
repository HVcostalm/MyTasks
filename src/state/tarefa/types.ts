import { TTarefaAttr } from "@/src/model/tarefa";

// action types
export enum TarefaActionTypes {
    ADD_TAREFA = "ADD_Tarefa",
    DELETE_TAREFA = "DELETE_Tarefa",
    ALTER_TAREFA = "ALTER_Tarefa",
}

type DeleteTarefaAction = {type:TarefaActionTypes.DELETE_TAREFA,payload:TTarefaAttr|TTarefaAttr[]}
type AddTarefaAction = {type:TarefaActionTypes.ADD_TAREFA,payload:TTarefaAttr|TTarefaAttr[]}
type AlterTarefaAction = {type:TarefaActionTypes.ALTER_TAREFA,payload:TTarefaAttr|TTarefaAttr[]}

export type TTarefaActions = AddTarefaAction|DeleteTarefaAction|AlterTarefaAction

// state types
export type TStateTarefa = {
    Tarefas: TTarefaAttr[]
}

// reducer dispatch
export type TTarefaDispatch = {
    state: TStateTarefa;
    dispatch: React.Dispatch<TTarefaActions>;
};
