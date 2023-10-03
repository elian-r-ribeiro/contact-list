import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Contato } from '../entities/Contato';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH : string = 'contatos';

  constructor(private firestore : AngularFirestore) { }

  buscarTodos(){
    return this.firestore.collection(this.PATH).snapshotChanges();
  }

  cadastrar(contato: Contato){
    return this.firestore.collection(this.PATH).add({nome : contato.nome, email : contato.email, telefone : contato.telefone, genero : contato.genero});
  }

  editar(contato : Contato, id : string){
    return this.firestore.collection(this.PATH).doc(id).update({nome : contato.nome, email : contato.email, telefone : contato.telefone, genero : contato.genero});
  }

  excluir(id : string){
    return this.firestore.collection(this.PATH).doc(id).delete();
  }
}
