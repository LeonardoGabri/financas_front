import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'lista',
    loadChildren: () =>
      import('../lista/modulo/compra-lista.module').then(
        (m) => m.CompraListaModule
      ),
  },
  {
    path: 'cadastro/novo',
    loadChildren: () =>
      import('../formulario/modulo/compra-form.module').then(
        (m) => m.CompraFormModule
      ),
  },
  {
    path: 'cadastro/visualizar/:id',
    loadChildren: () =>
    import('../formulario/modulo/compra-form.module').then(
      (m) => m.CompraFormModule
      ),
  },
  {
    path: 'cadastro/editar/:id',
    loadChildren: () =>
    import('../formulario/modulo/compra-form.module').then(
      (m) => m.CompraFormModule
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
export class CompraRoutingModule{}
