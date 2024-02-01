import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FornecedorFormComponent } from "../fornecedor-form.component";

const routes: Routes = [
  {
    path: '',
    component: FornecedorFormComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedorFormRoutingModule{}
