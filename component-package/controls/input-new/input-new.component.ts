import { Component, Input, HostBinding, OnInit, forwardRef, Host } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common'
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl } from '@angular/forms';
import { concat } from 'rxjs/observable/concat';

@Component({
  selector: 'vgr-input-new',
  moduleId: module.id,
  templateUrl: './input-new.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputNewComponent),
    multi: true
  }]

})
export class InputNewComponent implements ControlValueAccessor {
  @Input() control: AbstractControl;
  // private control: AbstractControl;

  @HostBinding('class.validated-input') hasClass = true;
  @Input() @HostBinding('class.readonly') readonly?: boolean;
  @Input() @HostBinding('class.input--small') small: boolean;
  @Input() @HostBinding('class.align-right') alignRight: boolean;

  // @Input() control: FormControl;
  @HostBinding('class.validation-error--active') get validationErrorActive() {
    // TODO
    return false;
    // return this.model.control.touched && this.model.control.invalid && this.model.control.dirty;
  }
  @HostBinding('class.validation-error--editing') get validationErrorEditing() {
    // TODO
    return false;
    // return this.control.touched;
  }
  @HostBinding('class.validation-error--fixed') get validationErrorFixed() {
    // TODO
    return false;
  }

  @Input() suffix: string;
  @Input() value: any;
  @Input() maxlength?: number;

  get validationErrorMessage(): string {
    return 'Fältet är ifyllt felaktigt';
  }

  doValidate: boolean;
  // model: any;

  constructor() {
    console.log('control', this.control);
  }


  writeValue(value: any) {
    if (value !== undefined) {
      this.value = value;
      console.log('VALUE', value);
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
    console.log(fn);
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
    console.log('registerOnTouched', fn);
  }

  onChange(input: any) {
    this.value = input;
    console.log('onChange', input);
  }

  onTouched() {
    console.log('this has been touched');
    // console.log('blur-touched', this.control.touched);
    // console.log('blur-untouched', this.control.untouched);
  }

  onBlur(): void {
    if (this.readonly) {
      return;
    }
    this.control.markAsUntouched();
  }

  onFocus(): void {
    if (this.readonly) {
      return;
    }
    this.control.markAsTouched();
  }
}

