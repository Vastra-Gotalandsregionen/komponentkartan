import {
  Component,
  forwardRef,
  Host,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
  SkipSelf,
} from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'vgr-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextareaComponent),
    multi: true,
  }]

})
export class TextareaComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() width: string;
  @Input() height: string;
  @Input() placeholder: string;
  @Input() formControlName: string;

  @HostBinding('class.textarea-validation-error--active') get errorClass() {
    return this.control && this.control.invalid && !this.hasFocus;
  }
  @HostBinding('class.textarea-validation-error--editing') get editingClass() {
    return this.control && this.control.invalid && this.hasFocus;;
  }
  @HostBinding('class.textarea-validation-error--fixed') get fixedClass() {
    return false;
  }

  textareaDimension: any;
  control: AbstractControl;
  displayValue: any;
  hasFocus = false;

  constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer) {
    this.width = '100%';
    this.height = '120px';
    this.placeholder = '';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.formControlName) {
      console.log(this.controlContainer.control);
      this.control = this.controlContainer.control.get(this.formControlName);
    }
  }

  ngOnInit() {
    this.textareaDimension = {
      'width': this.width,
      'height': this.height
    };
  }

  writeValue(value: any): void {
    this.displayValue = value;
  }

  registerOnChange(func: any) {
    this.onChange = func;
  }

  registerOnTouched(func: any) {
    this.onTouched = func;
  }


  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  onChange(input: any) {
    if (this.control) {
      this.control.setValue(input);
    }
  }

  onTouched() { }

  onBlur(event: Event) {
    this.hasFocus = false;
  }

  onFocus(): void {
    this.hasFocus = true;
  }
}
