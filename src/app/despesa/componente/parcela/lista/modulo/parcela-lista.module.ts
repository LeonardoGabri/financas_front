import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ParcelaListaComponent } from '../parcela-lista.component';
import { ParcelaListaRoutingModule } from './parcela-lista-routing.module';
import { PoModule } from '@po-ui/ng-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatterRealPipe } from 'src/app/shared/pipe/formatter-moeda-real.pipe';
import { FiltroParcelaComponent } from '../filtro/filtro-parcela.component';

@NgModule({
  declarations: [ParcelaListaComponent, FiltroParcelaComponent, FormatterRealPipe],
  imports: [CommonModule, PoModule, ReactiveFormsModule, FormsModule, ParcelaListaRoutingModule],
})
export class ParcelaListaModule{}
