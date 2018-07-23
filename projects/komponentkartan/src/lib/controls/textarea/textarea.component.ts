import {
  Component,
  forwardRef,
  ElementRef,
  Host,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Optional,
  AfterViewInit,
  SimpleChanges,
  SkipSelf,
  EventEmitter,
  ChangeDetectorRef,
  Output
} from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'vgr-textarea',
  templateUrl: './textarea.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextareaComponent),
    multi: true,
  }]

})
export class TextareaComponent implements AfterViewInit, OnChanges, ControlValueAccessor {

  @Input() showValidation = true;
  @Input() width: string;
  @Input() height: string;
  @Input() placeholder: string;
  @Input() formControlName: string;
  @Input() maxlength: number;
  @Input() value: string;

  @Input() @HostBinding('class.readonly') readonly?: boolean;

  @HostBinding('class.textarea-validation-error--active') get errorClass() {
    return this.showValidation && this.control && this.control.invalid && !this.hasFocus;
  }
  @HostBinding('class.textarea-validation-error--editing') get editingClass() {
    return this.showValidation && this.control && this.control.invalid && this.hasFocus;
  }

  @Output() blur: EventEmitter<any>;
  @Output() focus: EventEmitter<any>;

  scrollHeight: string;
  control: AbstractControl;
  hasFocus = false;
  cancel: boolean;

  validationErrorMessage = 'Obligatoriskt';

  constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer, private elementRef: ElementRef, private cdRef: ChangeDetectorRef) {
    this.width = '100%';
    this.height = '120px';
    this.placeholder = '';

    this.blur = new EventEmitter<any>();
    this.focus = new EventEmitter<any>();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.formControlName) {
      this.control = this.controlContainer.control.get(this.formControlName);
      this.control.statusChanges.subscribe((status) => {
      });
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.scrollHeight = this.elementRef.nativeElement.querySelector('.textarea-input').scrollHeight + 'px';
      this.cdRef.detectChanges();
    }, 25);

  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(func: any) {
    this.onChange = func;
  }

  registerOnTouched(func: any) {
    this.onTouched = func;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  onChange(input: any) {
    if (this.control) {
      this.control.setValue(input);
    }
  }

  onTouched(input: any) {
    if (this.control) {
      this.control.setValue(input);
    }
  }

  onBlur(event: Event) {
    event.cancelBubble = true;
    this.hasFocus = false;
    this.blur.emit(event);
    if (this.control) {
      this.control.markAsTouched();
      this.control.markAsDirty();
    }

    this.onTouched(this.value);
    this.scrollHeight = this.elementRef.nativeElement.querySelector('.textarea-input').scrollHeight + 'px';
  }

  onFocus(event: Event): void {
    this.hasFocus = true;
    this.focus.emit(event);
  }
}
