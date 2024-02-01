import { NgModule } from "@angular/core";
import { FornecedorListaComponent } from "../fornecedor-lista.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: FornecedorListaComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedorListaRoutingModule{}
