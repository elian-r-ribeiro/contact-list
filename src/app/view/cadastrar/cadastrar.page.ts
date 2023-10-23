import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from 'src/app/model/entities/Contato';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  public nome! : string;
  public email!: string;
  public telefone! : number;
  public genero! : number;
  public imagem : any;

  constructor(private alertController: AlertController, private firebase : FirebaseService ,private router : Router) { }

  ngOnInit() {
  }

  cadastrar(){
    if(this.nome && this.email && this.telefone && this.genero){
      if(this.nome.length >=3){
        if(this.telefone.toString().length >= 8){
          if(this.validarEmail(this.email)){
            let novo : Contato = new Contato(this.nome, this.email, this.telefone, this.genero);
            if(this.imagem){
              this.firebase.uploadImage(this.imagem, novo)
              ?.then(() => {this.router.navigate(["/home"])});
            }else{
              this.firebase.cadastrar(novo).then(() => this.router.navigate(["/home"])).catch((error) => {console.log(error); this.presentAlert('Erro!', 'Algo inesperado aconteceu!')})
            }
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
  
  validarEmail(email: string): boolean{
    const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padrao.test(email);
  }

  async presentAlert(subHeader : string, message : string) {
    const alert = await this.alertController.create({
      header: 'Agenda de contatos',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  uploadFile(imagem : any){
    this.imagem = imagem.files;
  }

}
