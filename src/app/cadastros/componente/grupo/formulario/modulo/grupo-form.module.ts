import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';

import { GrupoFormRoutingModule } from './grupo-form-routing.module';
import { GrupoFormComponent } from '../grupo-form.component';

@NgModule({
  declarations: [GrupoFormComponent],
  imports: [CommonModule, PoModule, ReactiveFormsModule, FormsModule, GrupoFormRoutingModule]
})
export class GrupoFormModule{}
