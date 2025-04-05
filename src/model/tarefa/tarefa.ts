import { Status } from "../status";

export interface TTarefaAttr {
    idTarefa:number,
    titulo:string,
    descricao:string,
    status:Status,
}

const emptyProduto:TTarefaAttr = {idTarefa:0,titulo:"",descricao:"",status: Status.Pendente}

export class Tarefa implements TTarefaAttr {
    
    private _data: TTarefaAttr = emptyProduto;

    constructor(status:Status=Status.Pendente,titulo?:string,descricao?:string){
        this._data.titulo = titulo?titulo:""
        this._data.descricao = descricao?descricao:""
        this._data.status = status
    }

    get idTarefa() {return this._data.idTarefa}
    set idTarefa(id:number) {this._data.idTarefa = id}
    
    get titulo() {return this._data.titulo}
    set titulo(title:string) {this._data.titulo = title}

    get descricao() {return this._data.descricao}
    set descricao(description:string) {this._data.descricao = description}
    
    get status() {return this._data.status}
    set status(status:Status) {this._data.status = status}

    get data():TTarefaAttr { return this._data }
    get datacpy():TTarefaAttr { return {...this._data} }
}