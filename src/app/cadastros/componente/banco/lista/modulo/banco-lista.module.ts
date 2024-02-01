import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { PoModule } from "@po-ui/ng-components";
import { BancoListaRoutingModule } from "./banco-lista-routing.module";
import { BancoListaComponent } from "../banco-lista.component";

@NgModule({
  declarations: [BancoListaComponent],
  imports: [CommonModule, PoModule, ReactiveFormsModule, BancoListaRoutingModule]
})
export class BancoListaModule{}
