import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from 'src/app/model/entities/Contato';
import { ContatoService } from 'src/app/model/services/contato.service';

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

  constructor(private alertController: AlertController, private contatoService : ContatoService, private router : Router) { }

  ngOnInit() {
  }

  cadastrar(){
    if(this.nome && this.telefone && this.genero){
      if(this.nome.length >=3){
        if(this.telefone.toString().length >= 8){
          let novo : Contato = new Contato(this.nome, this.telefone);
          if(this.email){
            novo.email = this.email;
          }
          novo.genero = this.genero;
          this.contatoService.cadastrar(novo);
          this.router.navigate(["/home"])
        }else{
          this.presentAlert("Erro ao cadastrar!", "O número precisa ter pelo menos oito caracteres!");
        }
      }else{
        this.presentAlert("Erro ao cadastrar!", "O nome precisa ter pelo menos três caracteres!");
      }
    }else{
      this.presentAlert("Erro ao cadastrar!", "Todos os campos são obrigatórios!");
    }
    this.nome = "";
    this.email = "";
    this.telefone = NaN;
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

}
