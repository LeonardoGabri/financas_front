import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BancoListaComponent } from "../banco-lista.component";

const routes: Routes = [
  {
    path: '',
    component: BancoListaComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancoListaRoutingModule{

}
