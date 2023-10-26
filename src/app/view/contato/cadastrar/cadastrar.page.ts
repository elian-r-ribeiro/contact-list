import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Alert } from 'src/app/common/alert';
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

  constructor(private alertController: AlertController, private firebase : FirebaseService ,private router : Router, private alert : Alert) { }

  ngOnInit() {
  }

  cadastrar(){
    if(this.nome && this.email && this.telefone){
      if(this.nome.length >= 3){
        if(this.validarEmail(this.email)){
          if(this.telefone.toString().length >= 9){
            let novo : Contato = new Contato(this.nome, this.telefone);
          
            if(this.email){
              novo.email = this.email;
            }
            novo.genero = this.genero;
            if(this.imagem){
              this.firebase.uploadImage(this.imagem, novo)?.then(() =>{this.router.navigate(["/home"])})
            }else{
            this.firebase.cadastrar(novo).then(() => this.router.navigate(["/home"])).catch((error) => {console.log(error); this.alert.presentAlert("Erro", "Erro ao salvar o contato!")});
            }
          }
          else{
            this.alert.presentAlert("Erro ao cadastrar!", "N° de telefone incorreto");
          }
        }
        else{
          this.alert.presentAlert("Erro ao cadastrar!", "Email incorreto");
        }
      }
      else{
        this.alert.presentAlert("Erro ao cadastrar!", "Nome muito curto");
      }
    }else{
        this.alert.presentAlert("Erro ao cadastrar!", "Todos os campos são obrigatórios");
      }
  }
  validarEmail(email: string): boolean{
    const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padrao.test(email);
  }

  uploadFile(imagem : any){
    this.imagem = imagem.files;
  }

}
