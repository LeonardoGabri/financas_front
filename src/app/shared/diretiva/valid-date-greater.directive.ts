import { Directive, Input, ChangeDetectorRef } from "@angular/core";
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import * as moment from "moment";

@Directive({
  selector: '[appValidateDateGreater]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ValidateDateGreaterDirective,
      multi: true,
    },
  ],
})
export class ValidateDateGreaterDirective implements AsyncValidator {
  @Input('appValidateDateGreater')
  date!: {
    minDate: Date | string;
    maxDate: Date | string;
  };

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  validate(control: AbstractControl): Promise<ValidationErrors | null> {
    if (!this.date.minDate && !this.date.maxDate) {
      return Promise.resolve(null);
    }
    return new Promise<ValidationErrors | null>((resolve) => {
      this.changeDetectorRef.detectChanges();

      const error = this.date.minDate
        ? moment(control.parent?.value.valueShow).isBefore(this.date.minDate)
        : moment(this.date.maxDate).isBefore(control.parent?.value.valueShow);

      this.date && control.value && control.parent?.value.valueShow && error
        ? resolve({
            dateIsGreater: error,
          })
        : resolve(null);
    });
  }
}
