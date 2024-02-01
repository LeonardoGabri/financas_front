import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'lista',
    loadChildren: () =>
      import('../lista/modulo/subgrupo-lista.module').then(
        (m) => m.SubgrupoListaModule
      ),
  },
  {
    path: 'cadastro/novo',
    loadChildren: () =>
      import('../formulario/modulo/subgrupo-form.module').then(
        (m) => m.SubgrupoFormModule
      ),
  },
  {
    path: 'cadastro/editar/:id',
    loadChildren: () =>
    import('../formulario/modulo/subgrupo-form.module').then(
      (m) => m.SubgrupoFormModule
      ),
  },
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubgrupoRoutingModule{}
