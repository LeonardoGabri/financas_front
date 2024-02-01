import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ResponsavelListaComponent } from "../responsavel-lista.component";

const routes: Routes = [
  {
    path: '',
    component: ResponsavelListaComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsavelListaRoutingModule{}
