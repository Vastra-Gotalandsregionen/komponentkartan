import { Component, Input, HostBinding, forwardRef, Host, EventEmitter, Output, OnInit, Optional, SkipSelf, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { DecimalPipe } from '@angular/common'
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer } from '@angular/forms';
import { concat } from 'rxjs/observable/concat';
import { ErrorHandler } from '../../services/errorhandler';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'vgr-input',
  moduleId: module.id,
  templateUrl: './input.component.html',

  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }, ErrorHandler]

})
export class InputComponent implements ControlValueAccessor, OnInit, OnChanges {

  @Input() formControlName?: string;

  @Input() isInvalid?: boolean;
  @Input() formatNumber: boolean;
  @Input() nrOfDecimals: number;
  @Input() suffix: string;
  @Input() value: any;
  @Input() maxlength?: number;
  @Input() validateoninit: boolean;

  @Input() errormessage?: any;

  @Input() @HostBinding('class.readonly') readonly?: boolean;
  @Input() @HostBinding('class.input--small') small: boolean;
  @Input() @HostBinding('class.align-right') alignRight: boolean;

  @Output() blur: EventEmitter<any>;
  @Output() focus: EventEmitter<any>;

  @HostBinding('class.validated-input') hasClass = true;
  @HostBinding('class.validation-error--active') get errorClass() {
    return (this.formControlName ? this.control.invalid : this.isInvalid) && !this.hasFocus && (this.touched || this.validateoninit);
  }
  @HostBinding('class.validation-error--editing') get editingClass() {
    return this.invalidOnFocus && this.hasFocus && (this.touched || this.validateoninit);
  }
  @HostBinding('class.validation-error--fixed') get fixedClass() {
    return this.invalidOnFocus && this.touched && !(this.formControlName ? this.control.invalid : this.isInvalid) && !this.hasFocus;
  }

  hasFocus = false;
  touched = false;
  invalidOnFocus = false;

  swedishDecimalPipe: DecimalPipe;
  displayValue: string;
  currentErrorMesage: string;
  selectedErrorMessage: string;
  control: AbstractControl;

  private maxNumberOfDecimals = 2;

  constructor(private errorHandler: ErrorHandler, @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer) {
    this.blur = new EventEmitter<any>();
    this.focus = new EventEmitter<any>();
    this.nrOfDecimals = 2;

  }

  ngOnChanges(changes: SimpleChanges) {
    this.control = this.controlContainer.control.get(this.formControlName);

    if (changes.small) {
      this.currentErrorMesage = this.checkErrorMessage();
    }
  }

  ngOnInit() {
    this.swedishDecimalPipe = new DecimalPipe('sv-se');
    this.doValidate();
  }

  doValidate() {
    this.currentErrorMesage = this.checkErrorMessage();

    this.control.valueChanges
      .subscribe(data => {
        this.selectedErrorMessage = this.errorHandler.getErrorMessageReactiveForms(this.errormessage, this.control, this.small);
      });
  }

  checkErrorMessage(): string {
    if (typeof (this.errormessage) === 'object') {
      return this.errorHandler.getErrorMessageReactiveForms(this.errormessage, this.control, this.small);
    }
    else
      return this.errormessage;
  }
  writeValue(value: any) {
    if (value !== undefined) {
      this.value = value;

      if (this.formatNumber && !(this.formControlName ? this.control.invalid : this.isInvalid)) {
        this.displayValue = this.convertNumberToString(this.value);
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

    this.currentErrorMesage = this.selectedErrorMessage;
  }

  onFocus(): void {
    if (this.readonly) {
      return;
    }

    this.displayValue = this.value;

    this.invalidOnFocus = (this.formControlName ? this.control.invalid : this.isInvalid) && (this.touched || this.validateoninit);
    this.hasFocus = true;
    this.focus.emit(event);
  }

  private convertStringToNumber(value: string): number {
    if (value) {
      const normalized = value.toString().trim().replace(/\s/g, '').replace(',', '.').replace('−', '-');
      const floatVal = this.roundNumber(parseFloat(normalized));
      return floatVal;
    }
    return NaN;
  }

  private roundNumber(number: number) {
    if (isNaN(number)) {
      return number;
    }

    const factor = Math.pow(10, this.nrOfDecimals);
    const tempNumber = number * factor;
    const roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  };

  private convertNumberToString(value: number): string {
    if (!isNaN(this.value)) {
      return this.swedishDecimalPipe.transform(this.value);
    }
    return null;
  }
}
