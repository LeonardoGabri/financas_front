import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ResponsavelFormComponent } from "../responsavel-form.component";

const routes: Routes = [
  {
    path: '',
    component: ResponsavelFormComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsavelFormRoutingModule{}
