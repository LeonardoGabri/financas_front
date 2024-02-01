import { NgModule } from "@angular/core";
import { CadastroComponent } from "../cadastro.component";
import { CommonModule } from "@angular/common";
import { PoModule } from "@po-ui/ng-components";
import { CadastroRoutingModule } from "./cadastro-routing.module";

@NgModule({
  declarations: [CadastroComponent],
  imports: [CommonModule, PoModule, CadastroRoutingModule],
  providers: []
})
export class CadastroModule{}
