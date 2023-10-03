import { Injectable } from '@angular/core';
import { Contato } from '../entities/Contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  public nome! : string;
  public email!: string;
  public telefone! : number;
  public genero! : number;
  public listaDeContatos : Contato[] = [];

  constructor() {
  }

  cadastrar(contato: Contato){
    this.listaDeContatos.push(contato);
  }

  obterTodos(){
    return this.listaDeContatos;
  }

  obterPorIndice(indice : number){
    return this.listaDeContatos[indice];
  }

  atualizar(indice: number, novo: Contato){
    this.listaDeContatos[indice] = novo;
   }
  deletar(indice: number){
    this.listaDeContatos.splice(indice, 1);
  }
}
