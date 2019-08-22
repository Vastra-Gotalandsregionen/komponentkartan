import { DecimalPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Host,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  SkipSelf,
} from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'vgr-input',
  templateUrl: './input.component.html',

  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true,
  }]

})
export class InputComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() showValidation = true;
  @Input() formControlName: string;
  @Input() formatNumber?: boolean;
  @Input() nrOfDecimals?: number;
  @Input() suffix?: string;
  @Input() placeholder?: string;
  @Input() value?: any;
  @Input() maxlength?: number;
  @Input() errorMessage = {};
  @Input() readonly?: boolean;
  @Input() small: boolean;
  @Input() alignRight: boolean;

  @Output() blur: EventEmitter<any>;
  @Output() focus: EventEmitter<any>;
  @Output() valueChanged: EventEmitter<any>;

  get errorClass() {
    return this.showValidation && this.control && this.control.invalid && !this.hasFocus;
  }
  get editingClass() {
    return this.showValidation && this.control && this.control.invalid && this.hasFocus;
  }
  get fixedClass() {
    return this.showValidation && this.invalidOnFocus && this.control && this.control.valid && !this.hasFocus;
  }

  control: AbstractControl;
  invalidOnFocus = false;
  hasFocus = false;
  swedishDecimalPipe: DecimalPipe;
  displayValue: string;
  currentErrorMessage: string;
  selectedErrorMessage: string;

  constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer) {
    this.blur = new EventEmitter<any>();
    this.focus = new EventEmitter<any>();
    this.valueChanged = new EventEmitter<any>();
    this.nrOfDecimals = 2;
    this.swedishDecimalPipe = new DecimalPipe('sv-SE');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.formControlName) {
      this.control = this.controlContainer.control.get(this.formControlName);
    } else {
      this.setDisplayValue();
    }
  }

  ngOnInit() {
    this.setDisplayValue();
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.value = value;
      this.setDisplayValue();

      if (value && this.formatNumber && (value.toString().split('.')[1] || []).length !== this.nrOfDecimals) {
        this.formatDisplayNumber();
        this.control.setValue(this.value);
      }
    }
  }

  setDisplayValue() {
    if (this.formatNumber && this.control && this.control.valid) {
      this.displayValue = this.convertNumberToString(this.value);
    } else {
      this.displayValue = this.value;
    }
  }

  registerOnChange(func: (_: any) => void) {
    this.onChange = func;
  }

  registerOnTouched(func: any) {
    this.onTouched = func;
  }

  onChange(value: any) {
    this.valueChanged.emit(value);
  }

  onTouched() { }

  onBlur(event: Event) {
    if (this.readonly) {
      return;
    }

    this.onTouched();
    this.formatDisplayNumber();

    this.hasFocus = false;
    this.blur.emit(event);
  }

  formatDisplayNumber() {
    const number = this.displayValue !== undefined && this.displayValue.replace(/,/g, '.').replace(/ /g, '').replace(/−/g, '-');

    if (this.formatNumber && this.isNumber(number)) {
      this.value = this.convertStringToNumber(number);
      this.displayValue = this.convertNumberToString(this.value);
    } else {
      this.value = this.displayValue;
    }
    if (this.control && this.control.updateOn === 'blur') {
      this.control.setValue(this.value);
    }
  }


  isNumber(value: any): boolean {
    // const pattern = /^[-−]?(\d{1,3}(\s\d{3})*|\d+)(,\d+)?$/; //TODO: (if we only will allow swedish format ?)
    const pattern = /^[-,−]?(\d{1,3}([,.\s]\d{3})*|\d+)([.,]\d+)?$/;
    return pattern.test(value);
  }

  onFocus(): void {
    if (this.readonly) {
      return;
    }
    this.invalidOnFocus = this.control && this.control.invalid && this.showValidation;
    if (this.isNumber(this.displayValue)) {
      this.displayValue = this.displayValue.toString().replace(/\s/g, '').replace(/−/g, '-');
    }
    this.hasFocus = true;

    this.focus.emit(event);
  }

  private convertStringToNumber(value: string): number {
    const normalized = value.toString().trim().replace(/\s/g, '').replace(/,/g, '.').replace(/−/g, '-');
    const floatVal = this.roundNumber(parseFloat(normalized));
    return floatVal;
  }

  private roundNumber(value: number) {
    if (isNaN(value)) {
      return value;
    }

    const factor = Math.pow(10, this.nrOfDecimals);
    const tempNumber = value * factor;
    const roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  }

  private convertNumberToString(value: number): string {
    if (!isNaN(this.value)) {
      return this.swedishDecimalPipe.transform(this.value, `1.${this.nrOfDecimals}-${this.nrOfDecimals}`);
    }
    return null;
  }
}
