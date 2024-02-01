import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrupoListaComponent } from '../grupo-lista.component';

const routes: Routes = [
  {
    path: '',
    component: GrupoListaComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoListaRoutingModule{}
