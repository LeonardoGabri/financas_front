import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PoModule } from "@po-ui/ng-components";
import { SubgrupoFormComponent } from "../subgrupo-form.component";
import { SubgrupoFormRoutingModule } from "./subgrupo-form-routing.module";


@NgModule({
  declarations: [SubgrupoFormComponent],
  imports: [CommonModule, PoModule, ReactiveFormsModule, FormsModule, SubgrupoFormRoutingModule]
})
export class SubgrupoFormModule{}
