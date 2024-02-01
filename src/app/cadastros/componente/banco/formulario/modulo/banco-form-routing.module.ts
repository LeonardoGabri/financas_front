import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BancoFormComponent } from "../banco-form.component";

const routes: Routes = [
  {
    path: '',
    component: BancoFormComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancoFormRoutingModule{}
