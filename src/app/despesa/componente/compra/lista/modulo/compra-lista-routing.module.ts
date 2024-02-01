import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CompraListaComponent } from "../compra-lista.component";

const routes: Routes = [
  {
    path: '',
    component: CompraListaComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompraListaRoutingModule{}
