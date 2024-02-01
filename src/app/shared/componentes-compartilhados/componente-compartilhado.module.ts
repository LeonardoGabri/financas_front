import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PoModule } from "@po-ui/ng-components";
import { DataHoraComponent } from "./data-hora/data-hora.component";
import { ValidateDateGreaterDirective } from "../diretiva/valid-date-greater.directive";

@NgModule({
  declarations: [DataHoraComponent, ValidateDateGreaterDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PoModule,
    FormsModule,
  ],
  exports: [DataHoraComponent, ValidateDateGreaterDirective]
})
export class ComponenteCompartilhadoModule{}
