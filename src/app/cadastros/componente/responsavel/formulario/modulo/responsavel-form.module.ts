import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PoModule } from "@po-ui/ng-components";
import { ResponsavelFormComponent } from "../responsavel-form.component";
import { ResponsavelFormRoutingModule } from "./responsavel-form-routing.module";

@NgModule({
  declarations: [ResponsavelFormComponent],
  imports: [CommonModule, PoModule, ReactiveFormsModule, FormsModule, ResponsavelFormRoutingModule]
})
export class ResponsavelFormModule{}
