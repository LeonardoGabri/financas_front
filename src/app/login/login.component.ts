import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PoNotificationService } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';

import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formulario!: FormGroup
  desabilitaBotaoLogar = true

  storeAuth$ = new Subscription

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private poNotification: PoNotificationService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.criarFormulario();

    this.formulario.statusChanges.subscribe((status) =>{
      if(status == 'INVALID') {
        this.desabilitaBotaoLogar = true
      }else{
        this.desabilitaBotaoLogar = false
      }
    })
  }

  criarFormulario(novoFormulario?: any){
    this.formulario = this.formBuilder.group({
      login: [novoFormulario?.login],
      password: [novoFormulario?.password]
    })
  }

  logar(){
    this.authService.onLogin(this.formulario.getRawValue()).subscribe({
      next: (response: any) => {
        if(response){
          localStorage.setItem('token', response.token)
          this.router.navigate(['/cadastros'])
        }else{
          this.poNotification.error("Erro na geração do Token")
        }
      },
      error: ({error}) => {
        this.poNotification.error("Login e/ou Senha incorretos")
        console.error(error);
      }
    });
  }
}
