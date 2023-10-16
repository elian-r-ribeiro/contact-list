import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from 'src/app/model/entities/Contato';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  indice! : number;
  nome! : string;
  telefone! : number;
  email! : string;
  genero! : number;
  contato! : Contato;
  edicao: boolean = true;

  constructor(private alertController: AlertController, private firebase : FirebaseService, private router: Router) {

   }

  ngOnInit() {
    this.contato = history.state.contato;
    this.nome = this.contato.nome;
    this.telefone = this.contato.telefone;
    this.email = this.contato.email;
    this.genero = this.contato.genero;
  }

  habilitar(){
    if(this.edicao){
      this.edicao = false;
    }else{
      this.edicao = true;
    }
  }

  editar(){
    if(this.nome && this.email && this.telefone && this.genero){
      if(this.nome.length >=3){
        if(this.telefone.toString().length >= 8){
          if(this.validarEmail(this.email)){
            let novo : Contato = new Contato(this.nome, this.email, this.telefone, this.genero);
            this.firebase.editar(novo, this.contato.id).then(()=> this.router.navigate(["/home"])).catch((error) => {console.log(error); this.presentAlert("Error!", "Erro ao atualizar o contato!")});
          }else{
            this.presentAlert("Erro ao cadastrar!", "O email digitado não é válido!")
          }
        }else{
          this.presentAlert("Erro ao cadastrar!", "O número precisa ter pelo menos oito caracteres!");
        }
      }else{
        this.presentAlert("Erro ao cadastrar!", "O nome precisa ter pelo menos três caracteres!");
      }
    }else{
      this.presentAlert("Erro ao cadastrar!", "Todos os campos são obrigatórios!");
    }
  }

  excluir(){
    this.presentConfirmAlert("ATENÇÃO!", "Deseja realmente excluir o contato?")
  }

  excluirContato(){
    this.firebase.excluir(this.contato.id).then(() => {this.router.navigate(["/home"])}).catch((error) => {console.log(error); this.presentAlert("Error!", "Erro ao atualizar o contato!")});
    this.router.navigate(["/home"]);
  }
  
  validarEmail(email: string): boolean{
    const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padrao.test(email);
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
  await alert.present();
  }

  async presentConfirmAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader: subHeader,
      message: message,
      buttons: [
        {text: 'Cancelar'},
        {text: 'Confirmar', role: 'confirmar', handler: (acao)=>{this.excluirContato()}}
      ],
    });
  await alert.present();
  }
}
