import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm } from "@angular/forms";
import * as moment from "moment";
import { DateStringService } from "../../helper/date-string.service";

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DataHoraComponent),
  multi: true
}

const invalidDateMessage = 'Data inválida'
const isoDateFormat = 'YYYY-MM-DD'

@Component({
  selector: 'app-data-hora',
  templateUrl: './data-hora.component.html',
  providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
export class DataHoraComponent implements AfterViewInit, ControlValueAccessor{
  @ViewChild('f') f!: NgForm;

  @Input() optionalDataHora: boolean = false

  @Input()
  label!: string;
  @Input()
  dayInterval!: number;

  @Input() isReadOnly = 'false';
  @Input() max!: string;
  @Input() min!: string;
  @Input() isDisabled = 'false';
  @Input() isRequired = 'false';
  @Input() timeMask = '99:99';
  @Input() cleanDate = 'false';
  @Input() formatDate = 'dd/mm/yyyy';
  @Input() formatTime = 'HH:mm';
  @Input() startTimeDay = 'false'; // current, start, end ou false
  @Input() fillInvalidTime = 'false';

  @Output() formDateTime = new EventEmitter();
  @Output() dateChange = new EventEmitter();

  public isRequiredFullDate = 'false';

  get minDate() {
    return this.dateValidateMinMax.minDate;
  }
  @Input() set minDate(v: string | undefined | null) {
    if (this.dateValidateMinMax.minDate != v) {
      this.dateValidateMinMax.minDate = v && moment(v).isValid() ? v : '';

      if (this.dayInterval && this.dateValidateMinMax.minDate) {
        this.setMaxDateInterval(this.dateValidateMinMax.minDate);
      } else {
        this.dateValidateDayInterval.maxDate = '';
      }

      this.f?.form.get('time')?.updateValueAndValidity();
    }
  }

  get maxDate() {
    return this.dateValidateMinMax.maxDate;
  }
  @Input() set maxDate(v: string | undefined | null) {
    if (this.dateValidateMinMax.maxDate != v) {
      this.dateValidateMinMax.maxDate = v && moment(v).isValid() ? v : '';

      if (this.dayInterval && this.dateValidateMinMax.maxDate) {
        this.setMinDateInterval(this.dateValidateMinMax.maxDate);
      } else {
        this.dateValidateDayInterval.minDate = '';
      }

      this.f?.form.get('time')?.updateValueAndValidity();
    }
  }

  get date() {
    return this.innerDate;
  }
  set date(v) {
    if (this.innerDate != v) {
      this.innerDate = v;
      this.setStartTimeDay();
      this.updateValues();
    }
  }

  get time() {
    return this.innerTime;
  }
  set time(v) {
    if (this.innerTime != v) {
      this.innerTime = v;
      this.updateValues();
    }
  }

  private statusForm = undefined;
  private innerDate!: string;
  private innerTime!: string;
  valueShow!: Date | string;

  dateValidateMinMax = { minDate: '', maxDate: '' };
  dateValidateDayInterval = { minDate: '', maxDate: '' };
  timePattern = '^(2[0-3]|[01][0-9]):?([0-5][0-9])$';
  textRequired: string = '';
  msgDataIsGreater!: string;

  constructor(private dateStringService: DateStringService) {}

  ngAfterViewInit() {
    this.msgDataIsGreater = `Período máximo de ${this.dayInterval} dias`;

    this.f.statusChanges?.subscribe((status) => {
      if (this.statusForm != status) {
        this.statusForm = status;
        this.formDateTime.emit(this.f);
      }
    });
  }

  updateValues() {
    this.valueShow = this.loadValue();
    this.valueShow = this.validadeDataTime(this.valueShow);
    this.onChangeCb(this.valueShow);
    this.dateChange.emit(this.valueShow);
    this.verifyRequiredFullDate();
  }

  onChangeCb: (_: any) => void = () => {};
  onTouchedCb: (_: any) => void = () => {};

  writeValue(v: Date | string | undefined): void {
    if (!v) {
      v = '';
    }
    this.valueShow = v;
    this.loadfieldValues(v);
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  validadeDataTime(dataTime: Date | string) {
    if (!this.date && !this.time) {
      return '';
    }

    if (!this.date || !this.time || !moment(dataTime).isValid()) {
      return invalidDateMessage;
    }

    return dataTime;
  }

  loadfieldValues(v: Date | string) {
    if (v) {
      const momentDate = moment(v);
      this.date = momentDate.format(isoDateFormat);
      this.time = momentDate.format(this.formatTime);
    } else {
      this.date = '';
      this.time = '';
    }
  }

  loadValue() {
    const momentDate = this.dateStringService.createDateTimeWithString(
      isoDateFormat,
      this.formatTime,
      this.date,
      this.time
    );

    return momentDate && momentDate.format();
  }

  setStartTimeDay() {
    if (!this.time && this.date) {
      switch (this.startTimeDay) {
        case 'current':
          this.time = moment().format(this.formatTime);
          break;
        case 'start':
          this.time = moment().startOf('day').format(this.formatTime);
          break;
        case 'end':
          this.time = moment().endOf('day').format(this.formatTime);
          break;
        default:
          break;
      }

      this.innerTime = this.time;
    }
  }

  setMaxDateInterval(data: string) {
    this.dateValidateDayInterval.maxDate = moment(data)
      .startOf('day')
      .add(this.dayInterval, 'days')
      .format();
  }

  setMinDateInterval(data: string) {
    this.dateValidateDayInterval.minDate = moment(data)
      .endOf('day')
      .subtract(this.dayInterval, 'days')
      .format();
  }

  timeChange() {
    if (this.fillInvalidTime != 'true') {
      return;
    }

    if (
      this.f?.form.get('time')?.invalid ||
      (this.f?.form.get('date')?.value && !this.f?.form.get('time')?.value)
    ) {
      this.time = '';
      this.setStartTimeDay();
    }
  }

  verifyRequiredFullDate() {
    if ((this.time != null && this.time != '') || this.date != null) {
      this.isRequiredFullDate = 'true';
      return;
    }

    this.isRequiredFullDate = 'false';
  }
}
