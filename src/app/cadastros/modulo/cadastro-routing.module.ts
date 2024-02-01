import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroComponent } from '../cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: CadastroComponent,
    children: [
      {
        path: 'banco',
        loadChildren: () => import("../componente/banco/modulo/banco.module").then((m) => m.BancoModule)
      },
      {
        path: 'responsavel',
        loadChildren: () => import("../componente/responsavel/modulo/responsavel.module").then((m) => m.ResponsavelModule)
      },
      {
        path: 'fornecedor',
        loadChildren: () => import("../componente/fornecedor/modulo/fornecedor.module").then((m) => m.FornecedorModule)
      },
      {
        path: 'grupo',
        loadChildren: () => import("../componente/grupo/modulo/grupo.module").then((m) => m.GrupoModule)
      },
      {
        path: 'subgrupo',
        loadChildren: () => import("../componente/subgrupo/modulo/subgrupo.module").then((m) => m.SubgrupoModule)
      },
      {path: '', redirectTo: 'banco', pathMatch: 'full'}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule {}
