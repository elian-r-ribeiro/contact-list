import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logar',
  templateUrl: './logar.page.html',
  styleUrls: ['./logar.page.scss'],
})
export class LogarPage implements OnInit {

  logar!: FormGroup;

  constructor(private router : Router, private builder : FormBuilder) {
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
      console.log('campos ok')
    }else{
      console.log('campos com erro')
    }
  }

  logarComGmail(){}

  irParaRegistrar(){
    this.router.navigate(['/registrar']);
  }

}
