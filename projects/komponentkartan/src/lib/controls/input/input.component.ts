import { Component, OnInit, Input, forwardRef, OnChanges, Optional, Host, SkipSelf, Output, EventEmitter, HostListener, HostBinding, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
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
  @HostBinding('class.vgr-input--disabled') @Input() disabledControl = false;
  @HostBinding('class.vgr-input--suffix') hasSuffix = false;
  @HostBinding('style.width') @Input() width = '270px';

  /** DEFAULT INPUT OPTIONS FORWARDED **/
  @Input() required = false;
  @Input() step = null;
  @Input() pattern = null;
  @Input() id: string;
  @Input() maxlength: number;
  @Input() minlength: number;
  @Input() min: number;
  @Input() max: number;
  @Input() placeholder = '';
  @Input() name = '';
  @Input() type: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' = 'text';
  @Input() value: any = '';

  /**  */
  @Input() formControlName: string;
  @Input() prefix: string = null;
  @Input() suffix: string = null;
  @Input() textAlign: string;
  @Input() errorMessage: any = 'Innehåller valideringsfel';

  @Output() blur = new EventEmitter<any>();
  // @Output() focus = new EventEmitter<any>();

  @ViewChild('inputElement', {static: false}) inputElement: ElementRef;

  control: AbstractControl;
  isDisabled = false;

  constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer, private el: ElementRef) { }

  ngOnInit() {
    console.log(this.id, ': id');
    if (!this.textAlign && this.suffix) {
      this.textAlign = 'right';
    }
    if (this.suffix) {
      this.hasSuffix = true;
    }
    if (this.formControlName) {
      this.control = this.controlContainer.control.get(this.formControlName);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.control && changes.disabledControl) {
      this.setDisabledState(changes.disabledControl.currentValue);
    }
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }
  }

  setDisabledState(isDisabled: boolean) {
    this.disabledControl = isDisabled;
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
  }

  onFocus(event) {
    this.hasFocus = true;
    // this.focus.emit(event);
  }

  public focus() {
    this.inputElement.nativeElement.focus();
  }

}
