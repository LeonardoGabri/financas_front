import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'lista',
    loadChildren: () =>
      import('../lista/modulo/responsavel-lista.module').then(
        (m) => m.ResponsavelListaModule
      ),
  },
  {
    path: 'cadastro/novo',
    loadChildren: () =>
      import('../formulario/modulo/responsavel-form.module').then(
        (m) => m.ResponsavelFormModule
      ),
  },
  {
    path: 'cadastro/editar/:id',
    loadChildren: () =>
    import('../formulario/modulo/responsavel-form.module').then(
      (m) => m.ResponsavelFormModule
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
export class ResponsavelRoutingModule{}
