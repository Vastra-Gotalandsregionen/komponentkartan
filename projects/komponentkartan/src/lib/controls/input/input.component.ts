import { Component, OnInit, Input, forwardRef, OnChanges, Optional, Host, SkipSelf, Output, EventEmitter, HostListener, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl, ControlContainer } from '@angular/forms';

@Component({
  selector: 'vgr-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]
})
export class InputComponent implements ControlValueAccessor, OnChanges, OnInit {

  @HostBinding('class.vgr-input--show-validation') @Input() showValidation = true;
  @HostBinding('class.vgr-input--focused') hasFocus = false;
  @HostBinding('class.vgr-input--readonly') @Input() readonly = false;
  @HostBinding('class.vgr-input--disabled') @Input() disabled: boolean;

  /** DEFAULT INPUT OPTIONS FORWARDED **/
  /*@Input() disabled = false;
  @Input() required = false;
  @Input() step = null;*/
  // @Input() pattern = null;
  @Input() id: string;
  @Input() maxlength: number;
  @Input() minlength: number;
  @Input() min: number;
  @Input() max: number;
  @Input() placeholder = '';
  @Input() name = '';
  @Input() type: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' = 'text';
  @Input() value: any = null;

  /**  */
  @Input() width = 270;
  @Input() formControlName: string;
  @Input() prefix: string = null;
  @Input() suffix: string = null;
  @Input() textAlign = null;
  @Input() errorMessage: any = 'Innehåller valideringsfel';

  @Output() blur = new EventEmitter<any>();
  @Output() focus = new EventEmitter<any>();

  control: AbstractControl;

  constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer, private el: ElementRef) { }

  ngOnInit() {
    if (!this.textAlign && this.suffix) {
      this.textAlign = 'right';
    }
  }

  ngOnChanges() {
    if (this.formControlName) {
      this.control = this.controlContainer.control.get(this.formControlName);
    }
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }
  }

  propagateChange = (_: any) => {};
  propagateTouch = (_: any) => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  onChange(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.propagateChange(this.value);
  }

  onTouched() { }

  onBlur(event) {
    this.onTouched();
    this.hasFocus = false;
    this.blur.emit(event);
  }

  onFocus(event) {
    this.hasFocus = true;
    this.focus.emit(event);
  }

}
