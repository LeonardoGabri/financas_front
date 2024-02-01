import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () =>
      import('../app/inicio/modulo/inicio.module').then((m) => m.InicioModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../app/login/modulo/login.module').then((m) => m.LoginModule),
    pathMatch: 'full'
  },
  {
    path: 'cadastros',
    loadChildren: () =>
    import('./cadastros/modulo/cadastro.module').then((m) => m.CadastroModule)
  },
  {
    path: 'despesas',
    loadChildren: () =>
    import('./despesa/modulo/despesas.module').then((m) => m.DespesaModule)
  },
  {path: '', pathMatch: 'full', redirectTo: 'login' },
  {path: '**', redirectTo: 'login' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
