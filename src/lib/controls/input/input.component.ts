import { DecimalPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Host,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  SkipSelf,
} from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  @Input() showValidation = true;
  @Input() formControlName: string;
  @Input() formatNumber?: boolean;
  @Input() nrOfDecimals?: number;
  @Input() suffix?: string;
  @Input() placeholder?: string;
  @Input() value?: any;
  @Input() maxlength?: number;
  @Input() errorMessage = {};

  @Input() @HostBinding('class.readonly') readonly?: boolean;
  @Input() @HostBinding('class.input--small') small: boolean;
  @Input() @HostBinding('class.align-right') alignRight: boolean;

  @Output() blur: EventEmitter<any>;
  @Output() focus: EventEmitter<any>;

  @HostBinding('class.validated-input') hasClass = true;
  @HostBinding('class.validation-error--active') get errorClass() {
    return this.showValidation && this.control && this.control.invalid && !this.hasFocus;
  }
  @HostBinding('class.validation-error--editing') get editingClass() {
    return this.showValidation && this.control && this.control.invalid && this.hasFocus;
  }
  @HostBinding('class.validation-error--fixed') get fixedClass() {
    return this.showValidation && this.invalidOnFocus && this.control && this.control.valid && !this.hasFocus;
  }

  invalidOnFocus = false;
  hasFocus = false;
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

  registerOnChange(func: any) {
    this.onChange = func;
  }

  registerOnTouched(func: any) {
    this.onTouched = func;
  }

  onChange(input: any) {
    this.value = input;
    if (this.control) {
      this.control.setValue(this.value);
    }
  }

  onTouched() { }

  onBlur(event: Event) {
    if (this.readonly) {
      return;
    }

    this.onTouched();
    this.formatDisplayNumber();

    this.onChange(this.value);
    this.hasFocus = false;
    this.blur.emit(event);

  }

  formatDisplayNumber() {
    if (this.formatNumber && this.isNumber(this.displayValue)) {
      this.value = this.convertStringToNumber(this.displayValue);
      this.displayValue = this.convertNumberToString(this.value);
    } else {
      this.value = this.displayValue;
    }
    if (this.control && this.control.updateOn === 'blur') {
      this.control.setValue(this.value);
    }
  }


  isNumber(value: any): boolean {
    const pattern = '^[-,−]{0,1}(\\d{1,3}([,\\s.]\\d{3})*|\\d+)([.,]\\d+)?$';
    const regexp = new RegExp(pattern);
    return regexp.test(value);
  }

  onFocus(): void {
    if (this.readonly) {
      return;
    }
    this.invalidOnFocus = this.control && this.control.invalid && this.showValidation;
    if (this.isNumber(this.displayValue)) {
      this.displayValue = this.displayValue.toString().replace(/\s/g, '');
    }
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
