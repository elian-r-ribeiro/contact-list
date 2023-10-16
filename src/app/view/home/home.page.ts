import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contato } from 'src/app/model/entities/Contato';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public listaDeContatos : Contato[] = [];

  constructor(private router : Router, private firebase: FirebaseService) {
    this.firebase.buscarTodos().subscribe(res => {this.listaDeContatos = res.map(contato => {return{id : contato.payload.doc.id, ...contato.payload.doc.data() as any} as Contato})});
  }

  irParaCadastrar(){
    this.router.navigate(["/cadastrar"]);
  }

  editar(contato : Contato){
    this.router.navigateByUrl("/detalhar", {state : {contato : contato}});
  }
}
