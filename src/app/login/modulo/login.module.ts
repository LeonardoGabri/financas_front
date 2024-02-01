import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';

import { LoginComponent } from '../login.component';
import { LoginRoutingModule } from './login-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, HttpClientModule, PoModule, ReactiveFormsModule, LoginRoutingModule]
})
export class LoginModule{}
