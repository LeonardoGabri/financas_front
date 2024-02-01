import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ParcelaFormComponent } from "../parcela-form.component";

const routes: Routes = [
  {
    path: '',
    component: ParcelaFormComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParcelaFormRoutingModule{}
