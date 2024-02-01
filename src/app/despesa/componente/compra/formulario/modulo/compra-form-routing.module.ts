import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CompraFormComponent } from "../compra-form.component";

const routes: Routes = [
  {
    path: '',
    component: CompraFormComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompraFormRoutingModule{}
