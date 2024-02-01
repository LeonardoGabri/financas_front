import { NgModule } from '@angular/core';
import { FornecedorListaComponent } from '../fornecedor-lista.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { FornecedorListaRoutingModule } from './fornecedor-lista-routing.module';

@NgModule({
  declarations: [FornecedorListaComponent],
  imports: [CommonModule, PoModule, ReactiveFormsModule, FornecedorListaRoutingModule]
})
export class FornecedorListaModule{}
