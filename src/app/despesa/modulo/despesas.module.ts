import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PoModule } from "@po-ui/ng-components";
import { DespesaComponent } from "../despesas.component";
import { DespesaRoutingModule } from "./despesas-routing.module";

@NgModule({
  declarations: [DespesaComponent],
  imports: [CommonModule, PoModule, DespesaRoutingModule],
  providers: []
})
export class DespesaModule{}
