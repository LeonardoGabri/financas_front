import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';

import { GrupoListaComponent } from '../grupo-lista.component';
import { GrupoListaRoutingModule } from './grupo-lista.routing.module';

@NgModule({
  declarations: [GrupoListaComponent],
  imports: [CommonModule, PoModule, ReactiveFormsModule, GrupoListaRoutingModule]
})
export class GrupoListaModule{}
