import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { PoModule } from "@po-ui/ng-components";
import { SubgrupoListaComponent } from "../subgrupo-lista.component";
import { SubgrupoListaRoutingModule } from "./subgrupo-lista.routing.module";


@NgModule({
  declarations: [SubgrupoListaComponent],
  imports: [CommonModule, PoModule, ReactiveFormsModule, SubgrupoListaRoutingModule]
})
export class SubgrupoListaModule{}
