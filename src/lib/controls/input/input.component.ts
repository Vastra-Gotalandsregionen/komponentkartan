import { Component, Input, HostBinding, forwardRef, Host, EventEmitter, AfterViewChecked, Output, OnInit, Optional, SkipSelf, SimpleChanges, OnChanges } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer } from '@angular/forms';
import { concat } from 'rxjs/observable/concat';
import { ErrorHandler } from '../../services/errorhandler';

@Component({
  selector: 'vgr-input',
  moduleId: module.id,
  templateUrl: './input.component.html',

  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true,
  }]

})
export class InputComponent implements ControlValueAccessor, OnInit, OnChanges {

  @Input() formControlName?: string;

  @Input() isInvalid?: boolean;
  @Input() formatNumber?: boolean;
  @Input() nrOfDecimals?: number;
  @Input() suffix?: string;
  @Input() value?: any;
  @Input() maxlength?: number;
  @Input() validateOnInit?: boolean;
  @Input() errorMessage?: any;

  @Input() @HostBinding('class.readonly') readonly?: boolean;
  @Input() @HostBinding('class.input--small') small: boolean;
  @Input() @HostBinding('class.align-right') alignRight: boolean;

  @Output() blur: EventEmitter<any>;
  @Output() focus: EventEmitter<any>;
  @Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();

  @HostBinding('class.validated-input') hasClass = true;
  @HostBinding('class.validation-error--active') get errorClass() {
    return (this.formControlName ? this.control.invalid : this.isInvalid) && !this.hasFocus && (this.touched || this.validateOnInit);
  }
  @HostBinding('class.validation-error--editing') get editingClass() {
    return this.invalidOnFocus && this.hasFocus && (this.touched || this.validateOnInit);
  }
  @HostBinding('class.validation-error--fixed') get fixedClass() {
    return this.invalidOnFocus && this.touched && (this.formControlName ? this.control.valid : !this.isInvalid) && !this.hasFocus;
  }

  hasFocus = false;
  touched = false;
  invalidOnFocus = false;

  swedishDecimalPipe: DecimalPipe;
  displayValue: string;
  currentErrorMessage: string;
  selectedErrorMessage: string;
  control: AbstractControl;

  constructor(private errorHandler: ErrorHandler, @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer) {
    this.blur = new EventEmitter<any>();
    this.focus = new EventEmitter<any>();
    this.nrOfDecimals = 2;
    this.swedishDecimalPipe = new DecimalPipe('sv-SE');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.formControlName) {
      this.control = this.controlContainer.control.get(this.formControlName);
    }
  }

  ngOnInit() {
    this.setDisplayValue();
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.value = value;

      this.setDisplayValue();
    }
  }

  setDisplayValue() {
    if (this.formatNumber && !(this.formControlName ? this.control.invalid : this.isInvalid)) {
      this.displayValue = this.convertNumberToString(this.value);
    } else {
      this.displayValue = this.value;
    }
  }

  registerOnChange(func: any) {
    this.onChange = func;
  }

  registerOnTouched(func: any) {
    this.onTouched = func;
  }

  onChange(input: any) {
    this.value = input;
  }

  onTouched() { }

  onBlur() {
    if (this.readonly) {
      return;
    }

    if (this.formatNumber && !(this.formControlName ? this.control.invalid : this.isInvalid)) {
      this.value = this.convertStringToNumber(this.displayValue);
      this.displayValue = this.convertNumberToString(this.value);
    } else {
      this.value = this.displayValue;
    }

    this.onChange(this.value);
    this.touched = true;
    this.hasFocus = false;
    this.blur.emit(event);
  }

  onFocus(): void {
    if (this.readonly) {
      return;
    }

    this.displayValue = this.formatNumber ? this.convertNumberToString(this.value) : this.value;

    this.invalidOnFocus = (this.formControlName ? this.control.invalid : this.isInvalid) && (this.touched || this.validateOnInit);
    this.hasFocus = true;
    this.focus.emit(event);
  }

  private convertStringToNumber(value: string): number {
    const normalized = value.toString().trim().replace(/\s/g, '').replace(',', '.').replace('−', '-');
    const floatVal = this.roundNumber(parseFloat(normalized));
    return floatVal;
  }

  private roundNumber(number: number) {
    if (isNaN(number)) {
      return number;
    }

    const factor = Math.pow(10, this.nrOfDecimals);
    const tempNumber = number * factor;
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
