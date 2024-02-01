import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PoModule } from "@po-ui/ng-components";
import { FornecedorFormComponent } from "../fornecedor-form.component";
import { FornecedorFormRoutingModule } from "./fornecedor-form-routing.module";

@NgModule({
  declarations: [FornecedorFormComponent],
  imports: [CommonModule, PoModule, ReactiveFormsModule, FormsModule, FornecedorFormRoutingModule]
})
export class FornecedorFormModule{}
