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
      let c1 : Contato = new Contato("Elian R. Ribeiro", 99999999991);
      c1.email = 'exemplo1@gmail.com'
      let c2 : Contato = new Contato("Pedro H. Kaspchark", 99999999992);
      c2.email = 'exemplo2@gmail.com'
      let c3 : Contato = new Contato("João P. Drabeski", 99999999993);
      c3.email = 'exemplo3@gmail.com'
      let c4 : Contato = new Contato("Ricardo M. Valus", 99999999994);
      c4.email = 'exemplo4@gmail.com'
      this.listaDeContatos.push(c1);
      this.listaDeContatos.push(c2);
      this.listaDeContatos.push(c3);
      this.listaDeContatos.push(c4);
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
