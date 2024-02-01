import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GrupoFormComponent } from '../grupo-form.component';

const routes: Routes = [
  {
    path: '',
    component: GrupoFormComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoFormRoutingModule{}
