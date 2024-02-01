import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SubgrupoListaComponent } from "../subgrupo-lista.component";


const routes: Routes = [
  {
    path: '',
    component: SubgrupoListaComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubgrupoListaRoutingModule{}
