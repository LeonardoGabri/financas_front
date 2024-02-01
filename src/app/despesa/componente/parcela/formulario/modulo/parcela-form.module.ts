import { NgModule } from "@angular/core";
import { ParcelaFormComponent } from "../parcela-form.component";
import { CommonModule } from "@angular/common";
import { PoModule } from "@po-ui/ng-components";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ParcelaFormRoutingModule } from "./parcela-form-routing.module";

@NgModule({
  declarations: [ParcelaFormComponent],
  imports: [CommonModule, PoModule, ReactiveFormsModule, FormsModule, ParcelaFormRoutingModule]
})
export class ParcelaFormModule{}
