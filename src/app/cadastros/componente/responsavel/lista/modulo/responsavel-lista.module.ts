import { NgModule } from "@angular/core";
import { ResponsavelListaComponent } from "../responsavel-lista.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { PoModule } from "@po-ui/ng-components";
import { ResponsavelListaRoutingModule } from "./responsavel-lista.routing.module";

@NgModule({
  declarations: [ResponsavelListaComponent],
  imports: [CommonModule, PoModule, ReactiveFormsModule, ResponsavelListaRoutingModule]
})
export class ResponsavelListaModule{}
