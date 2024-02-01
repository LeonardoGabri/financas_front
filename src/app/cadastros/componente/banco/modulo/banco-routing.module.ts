import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'lista',
    loadChildren: () =>
      import('../lista/modulo/banco-lista.module').then(
        (m) => m.BancoListaModule
      ),
  },
  {
    path: 'cadastro/novo',
    loadChildren: () =>
      import('../formulario/modulo/banco-form.module').then(
        (m) => m.BancoFormModule
      ),
  },
  {
    path: 'cadastro/editar/:id',
    loadChildren: () =>
    import('../formulario/modulo/banco-form.module').then(
      (m) => m.BancoFormModule
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
export class BancoRoutingModule{}
