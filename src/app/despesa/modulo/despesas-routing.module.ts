import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DespesaComponent } from "../despesas.component";

const routes: Routes = [
  {
    path: '',
    component: DespesaComponent,
    children: [
      {
        path: 'compra',
        loadChildren: () => import("../componente/compra/modulo/compra.module").then((m) => m.CompraModule)
      },
      {
        path: 'parcela',
        loadChildren: () => import("../componente/parcela/modulo/parcela.module").then((m) => m.ParcelaModule)
      },
      {path: '', redirectTo: 'compra', pathMatch: 'full'}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespesaRoutingModule{}
