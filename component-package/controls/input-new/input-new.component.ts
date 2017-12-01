import { Component, Input, HostBinding, OnInit, forwardRef, Host, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { DecimalPipe } from '@angular/common'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
  ismarkAsTouched: boolean = false;
  @Input() form: FormGroup;
  @Input() formControlName: string;

  @HostBinding('class.validated-input') hasClass = true;
  @Input() @HostBinding('class.readonly') readonly?: boolean;
  @Input() @HostBinding('class.input--small') small: boolean;
  @Input() @HostBinding('class.align-right') alignRight: boolean;


  @HostBinding('class.validation-error--active') get validationErrorActive() {
    // TODO
    return !this.control.valid && !this.control.touched && this.control.dirty;
  }
  @HostBinding('class.validation-error--editing') get validationErrorEditing() {
    // TODO
    return !this.control.valid && this.control.touched && this.control.dirty;
  }
  @HostBinding('class.validation-error--fixed') get validationErrorFixed() {
    // TODO
    return this.control.valid && this.control.untouched;
  }

  @Input() suffix: string;
  @Input() value: any;
  @Input() maxlength?: number;
  @Input() validationErrorMessages: {};
  validationErrorMessage: string;

  control: AbstractControl;

  constructor() {
    this.ismarkAsTouched = false;
  }

  //TODO använd validationErrorMessage istället 
  get ValidationMessages(): any {
    return {
      'required': 'Fält är obligatoriskt.',
      'minlength': 'Du måste ange minst 4 tecken.',
      'maxlength': 'Du kan inte ha mer än 10 tecken.'
    };
  }

  doValidate() {
    let messages = this.ValidationMessages;
    if (this.control && this.control.dirty && !this.control.valid) {
      for (let key of Object.keys(messages)) {
        let message = messages[key];

        for (const error in this.control.errors) {
          if (key === error) {
            this.validationErrorMessage = message;
          }
        }
      }
    }
  }


  ngOnInit() {
    this.control = this.form.controls[this.formControlName];
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onChange(input: any) {
    this.value = input;
  }

  onTouched() {
    console.log('I have been touched!');
  }


  onBlur(): void {
    if (this.readonly) {
      return;
    }
    this.control.markAsUntouched();
    this.control.markAsDirty();
    this.doValidate()
  }

  onFocus(): void {
    if (this.readonly) {
      return;
    }
    this.control.markAsTouched();
  }
}
