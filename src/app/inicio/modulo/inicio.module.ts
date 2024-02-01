import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PoModule } from "@po-ui/ng-components";
import { InicioComponent } from "../inicio.component";
import { InicioRoutingModule } from "./inicio-routing.module";

@NgModule({
  declarations: [InicioComponent],
  imports: [CommonModule, PoModule, InicioRoutingModule]
})
export class InicioModule{}
