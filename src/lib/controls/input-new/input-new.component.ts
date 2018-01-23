import { Component, Input, HostBinding, forwardRef, Host, EventEmitter, AfterViewChecked, Output, OnInit, Optional, SkipSelf, SimpleChanges, OnChanges } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer } from '@angular/forms';
import { concat } from 'rxjs/observable/concat';
import { ErrorHandler } from '../../services/errorhandler';

@Component({
  selector: 'vgr-input-new',
  moduleId: module.id,
  templateUrl: './input-new.component.html',

  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputNewComponent),
    multi: true,
  }]

})
export class InputNewComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() showValidation?: boolean;
  @Input() formControlName?: string;
  @Input() formatNumber?: boolean;
  @Input() nrOfDecimals?: number;
  @Input() suffix?: string;
  @Input() value?: any;
  @Input() maxlength?: number;
  @Input() errorMessage?: any;

  @Input() @HostBinding('class.readonly') readonly?: boolean;
  @Input() @HostBinding('class.input--small') small: boolean;
  @Input() @HostBinding('class.align-right') alignRight: boolean;

  @Output() blur: EventEmitter<any>;
  @Output() focus: EventEmitter<any>;

  @HostBinding('class.validated-input') hasClass = true;
  @HostBinding('class.validation-error--active') get errorClass() {
    return this.showValidation && this.control.invalid && !this.hasFocus;
  }
  @HostBinding('class.validation-error--editing') get editingClass() {
    return this.showValidation && this.control.invalid && this.hasFocus;
  }
  @HostBinding('class.validation-error--fixed') get fixedClass() {
    return this.showValidation && this.invalidOnFocus && this.control.valid && !this.hasFocus;
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
    }
  }

  setDisplayValue() {
    if (this.formatNumber && this.control.valid) {
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

  onBlur(event: Event) {
    if (this.readonly) {
      return;
    }

    this.onTouched();

    // TODO: Nedan villkor funkar inte då validering görs på submit.
    // Dår är controllen inte valid men vi vill ändå formatera om det är ett nummer
    if (this.formatNumber && this.control.valid) {
      this.value = this.convertStringToNumber(this.displayValue);
      this.displayValue = this.convertNumberToString(this.value);
    } else {
      this.value = this.displayValue;
    }

    this.onChange(this.value);
    this.hasFocus = false;
    this.blur.emit(event);
  }

  onFocus(): void {
    if (this.readonly) {
      return;
    }
    this.invalidOnFocus = this.control.invalid && this.control.touched;
    if (this.displayValue) {
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
