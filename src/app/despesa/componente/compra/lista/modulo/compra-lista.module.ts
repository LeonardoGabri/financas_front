import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { CompraListaRoutingModule } from './compra-lista-routing.module';
import { CompraListaComponent } from '../compra-lista.component';
import { FiltroCompraComponent } from '../filtro/filtro-compra.component';

@NgModule({
  declarations: [CompraListaComponent, FiltroCompraComponent],
  imports: [CommonModule, PoModule, ReactiveFormsModule, CompraListaRoutingModule]
})
export class CompraListaModule{}
