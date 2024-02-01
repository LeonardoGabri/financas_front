import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'lista',
    loadChildren: () =>
      import('../lista/modulo/fornecedor-lista.module').then(
        (m) => m.FornecedorListaModule
      ),
  },
  {
    path: 'cadastro/novo',
    loadChildren: () =>
      import('../formulario/modulo/fornecedor-form.module').then(
        (m) => m.FornecedorFormModule
      ),
  },
  {
    path: 'cadastro/editar/:id',
    loadChildren: () =>
    import('../formulario/modulo/fornecedor-form.module').then(
      (m) => m.FornecedorFormModule
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
export class FornecedorRoutingModule{}
