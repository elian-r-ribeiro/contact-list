import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/common/alert';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  cadastro!: FormGroup;

  constructor(private router : Router, private builder : FormBuilder, private alert : Alert) {
    this.cadastro = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl(''),
      confSenha: new FormControl('')
    });
   }

   ngOnInit() {
    this.cadastro = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confSenha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get errorControl(){
    return this.cadastro.controls;
  }

  submitForm(){
    if(this.cadastro.valid){
      this.alert.presentAlert("Ok!", "Todos os campos válidos!");
    }else{
      this.alert.presentAlert("Erro!", "Há campos inválidos!");
    }
  }
}
