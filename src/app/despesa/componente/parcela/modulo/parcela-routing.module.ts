import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'lista',
    loadChildren: () =>
      import('../lista/modulo/parcela-lista.module').then(
        (m) => m.ParcelaListaModule
      ),
  },
  {
    path: 'cadastro/novo',
    loadChildren: () =>
      import('../formulario/modulo/parcela-form.module').then(
        (m) => m.ParcelaFormModule
      ),
  },
  {
    path: 'cadastro/editar/:id',
    loadChildren: () =>
    import('../formulario/modulo/parcela-form.module').then(
      (m) => m.ParcelaFormModule
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
export class ParcelaRoutingModule{}
