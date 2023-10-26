import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/common/alert';

@Component({
  selector: 'app-logar',
  templateUrl: './logar.page.html',
  styleUrls: ['./logar.page.scss'],
})
export class LogarPage implements OnInit {

  logar!: FormGroup;

  constructor(private router : Router, private builder : FormBuilder, private alert : Alert) {
    this.logar = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl('')
    });
   }

  ngOnInit() {
    this.logar = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get errorControl(){
    return this.logar.controls;
  }

  submitForm(){
    if(this.logar.valid){
      this.alert.presentAlert("Ok!", "Todos os campos válidos!");
    }else{
      this.alert.presentAlert("Erro!", "Há campos inválidos!");
    }
  }

  logarComGmail(){}

  irParaRegistrar(){
    this.router.navigate(['/registrar']);
  }

}
