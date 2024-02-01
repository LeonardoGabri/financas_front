import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SubgrupoFormComponent } from "../subgrupo-form.component";


const routes: Routes = [
  {
    path: '',
    component: SubgrupoFormComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubgrupoFormRoutingModule{}
