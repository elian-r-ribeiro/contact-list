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
  imagem! : any;

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

  uploadFile(imagem : any){
    this.imagem = imagem.files;
  }

  editar(){
    if(this.nome && this.email && this.telefone){
      if(this.nome.length >= 3){
        if(this.validarEmail(this.email)){
          if(this.telefone.toString().length >= 9){
            let novo : Contato = new Contato(this.nome, this.telefone);
          
            if(this.email){
              novo.email = this.email;
            }
            novo.genero = this.genero;
            novo.id = this.contato.id;
            if(this.imagem){
              this.firebase.uploadImage(this.imagem, novo)?.then(() => {this.router.navigate(["/home"]);})
            }else{novo.downloadURL = this.contato.downloadURL;
              this.firebase.editar(novo, this.contato.id).then(() => this.router.navigate(["/home"]))
              .catch((error) => {console.log(error); this.firebase.presentAlert("Erro", "Erro ao atualizar o contato!")});}
          }
          else{
            this.firebase.presentAlert("Erro ao cadastrar!", "N° de telefone incorreto");
          }
        }
        else{
          this.presentAlert("Erro ao cadastrar!", "Email incorreto");
        }
      }
      else{
        this.presentAlert("Erro ao cadastrar!", "Nome muito curto");
      }
    }else{
        this.presentAlert("Erro ao cadastrar!", "Todos os campos são obrigatórios");
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
