import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParcelaListaComponent } from '../parcela-lista.component';

const routes: Routes = [
  {
    path: '',
    component: ParcelaListaComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParcelaListaRoutingModule{}
