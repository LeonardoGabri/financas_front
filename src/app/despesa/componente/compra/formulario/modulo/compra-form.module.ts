import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PoModule } from "@po-ui/ng-components";
import { CompraFormRoutingModule } from "./compra-form-routing.module";
import { CompraFormComponent } from "../compra-form.component";
import { ResponsavelCompraComponent } from "../modal/responsavel-compra.component";

@NgModule({
  declarations: [CompraFormComponent, ResponsavelCompraComponent],
  imports: [CommonModule, PoModule, ReactiveFormsModule, FormsModule, CompraFormRoutingModule]
})
export class CompraFormModule{}
