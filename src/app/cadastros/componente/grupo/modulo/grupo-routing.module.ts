import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'lista',
    loadChildren: () =>
      import('../lista/modulo/grupo-lista.module').then(
        (m) => m.GrupoListaModule
      ),
  },
  {
    path: 'cadastro/novo',
    loadChildren: () =>
      import('../formulario/modulo/grupo-form.module').then(
        (m) => m.GrupoFormModule
      ),
  },
  {
    path: 'cadastro/editar/:id',
    loadChildren: () =>
    import('../formulario/modulo/grupo-form.module').then(
      (m) => m.GrupoFormModule
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
export class GrupoRoutingModule{}
