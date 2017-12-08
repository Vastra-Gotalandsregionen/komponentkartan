import { Component, Input, HostBinding, forwardRef, Host, EventEmitter, Output, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { DecimalPipe } from '@angular/common'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { concat } from 'rxjs/observable/concat';

@Component({
  selector: 'vgr-input',
  moduleId: module.id,
  templateUrl: './input.component.html',

  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]

})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() isInvalid: boolean;
  @Input() formatNumber: boolean;

  @Input() @HostBinding('class.readonly') readonly?: boolean;
  @Input() @HostBinding('class.input--small') small: boolean;
  @Input() @HostBinding('class.align-right') alignRight: boolean;

  @Input() suffix: string;
  @Input() value: any;
  @Input() maxlength?: number;
  @Input() validateoninit: boolean;
  @Input() errormessage: string;

  @Output() blur: EventEmitter<any>;
  @Output() focus: EventEmitter<any>;

  @HostBinding('class.validated-input') hasClass = true;
  @HostBinding('class.validation-error--active') get errorClass() {
    return this.isInvalid && !this.hasFocus && (this.touched || this.validateoninit);
  }
  @HostBinding('class.validation-error--editing') get editingClass() {
    return this.invalidOnFocus && this.hasFocus && (this.touched || this.validateoninit);
  }
  @HostBinding('class.validation-error--fixed') get fixedClass() {
    return this.invalidOnFocus && this.touched && !this.isInvalid && !this.hasFocus;
  }

  control: AbstractControl;
  hasFocus = false;
  touched = false;
  invalidOnFocus = false;

  swedishDecimalPipe: DecimalPipe;
  decimalPipeConfiguration: string;
  displayValue: string;
  currentErrorMesage: string;

  private maxNumberOfDecimals = 2;

  constructor() {
    this.blur = new EventEmitter<any>();
    this.focus = new EventEmitter<any>();
  }

  ngOnInit() {
    this.currentErrorMesage = this.errormessage;
    this.swedishDecimalPipe = new DecimalPipe('sv-se')
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.value = value;
      this.displayValue = value;

      if (this.formatNumber && !this.isInvalid) {
        this.displayValue = this.formatNumberValue(this.value);
      } else {
        this.displayValue = this.value;
      }
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

  onBlur(): void {
    this.value = this.displayValue;
    this.onChange(this.value);

    if (this.readonly) {
      return;
    }

    if (this.formatNumber && !this.isInvalid) {
      this.displayValue = this.formatNumberValue(this.displayValue);
    }

    this.touched = true;
    this.hasFocus = false;
    this.blur.emit(event);
    this.currentErrorMesage = this.errormessage;

    console.log('oblur value ', this.value);
    console.log('oblur displayvalue ', this.displayValue);
  }

  onFocus(): void {
    console.log('focus value ', this.value);
    console.log('focus displayvalue ', this.displayValue);
    if (this.readonly) {
      return;
    }

    this.displayValue = this.value;

    this.invalidOnFocus = this.isInvalid && (this.touched || this.validateoninit);
    this.hasFocus = true;
    this.focus.emit(event);
  }

  private formatNumberValue(value: string): any {
    return this.validateNumber(value) ? this.swedishDecimalPipe.transform(value, '1.2-2') : value;
  }

  private validateNumber(value: string): boolean {
    const regexp = new RegExp('^[-,−]{0,1}(\\d{1,3}([,\\s.]\\d{3})*|\\d+)([.,]\\d+)?$');
    return regexp.test(value);
  }

  // convertNumberToString(value: number): string {
  //   if (!isNaN(this.value)) {
  //     return this.swedishDecimalPipe.transform(this.value, this.decimalPipeConfiguration);
  //   }
  //   return null;
  // }

  private convertStringToNumber(value: string): number {
    if (value) {
      const normalized = value.toString().trim().replace(/\s/g, '').replace(',', '.').replace('−', '-');
      const floatVal = this.roundNumber(parseFloat(normalized));
      return floatVal;
    }
    return NaN;
  }

  private roundNumber(number: number, numberOfDecimals = this.maxNumberOfDecimals) {
    if (isNaN(number)) {
      return number;
    }

    const factor = Math.pow(10, numberOfDecimals);
    const tempNumber = number * factor;
    const roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  };


}
