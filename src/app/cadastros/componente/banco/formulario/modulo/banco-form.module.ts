import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PoModule } from "@po-ui/ng-components";
import { BancoFormComponent } from "../banco-form.component";
import { BancoFormRoutingModule } from "./banco-form-routing.module";

@NgModule({
  declarations: [BancoFormComponent],
  imports: [CommonModule, PoModule, ReactiveFormsModule, FormsModule, BancoFormRoutingModule]
})
export class BancoFormModule{}
