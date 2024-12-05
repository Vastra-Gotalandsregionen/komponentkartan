import { Component, OnInit, Input, forwardRef, OnChanges, Optional, Host, SkipSelf, Output, EventEmitter, HostBinding, ViewChild, ElementRef, SimpleChanges, Renderer2, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl, ControlContainer } from '@angular/forms';
import { Guid } from '../../utils/guid';

@Component({
    selector: 'vgr-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    providers: [{
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }],
    standalone: false
})
export class InputComponent implements ControlValueAccessor, OnChanges, OnInit, AfterViewInit {

  @Input() showValidation = true;
  @Input() readonly = false;
  @HostBinding('class.vgr-input--disabled') @Input() disabledControl = false;
  @HostBinding('class.vgr-input--suffix') hasSuffix = false;
  @HostBinding('style.width') @Input() width = '270px';

  /** DEFAULT INPUT OPTIONS FORWARDED **/
  @Input() required = false;
  @Input() step = null;
  @Input() pattern = null;
  @Input() labelId: string;
  @Input() maxlength: number;
  @Input() minlength: number;
  @Input() min: number;
  @Input() max: number;
  @Input() placeholder = '';
  @Input() name = '';
  @Input() type: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' = 'text';
  @Input() value: any = '';
  @Input() aria: any;

  /**  */
  @Input() formControlName: string;
  @Input() prefix: string = null;
  @Input() suffix: string = null;
  @Input() textAlign: string;
  @Input() errorMessage: any = 'Innehåller valideringsfel';
// eslint-disable-next-line @angular-eslint/no-output-native
  @Output() blur = new EventEmitter<any>();

  @ViewChild('inputElement', {static: false}) inputElement: ElementRef;

  control: AbstractControl = null;
  hasFocus = false;
  elementId: string;
  mouseDown: boolean;

  constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer, private el: ElementRef, public renderer: Renderer2, private cdr: ChangeDetectorRef) {
    this.elementId = Guid.newGuid();

  }

  ngOnInit() {

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

  ngAfterViewInit() {
    if (this.aria) {
      for (const key in this.aria) {
        if (Object.prototype.hasOwnProperty.call(this.aria, key)) {
          const value = this.aria[key];
          this.renderer.setAttribute(this.inputElement.nativeElement, 'aria-' + key, value);
        }
      }
    }
  }




  ngOnChanges(changes: SimpleChanges) {

    if (this.control && changes.disabledControl) {
      this.setDisabledState(changes.disabledControl.currentValue);
    }

    this.cdr.detectChanges();
    // lets change focus back to input after going from disabled to enabled
    if (this.el.nativeElement.offsetParent && this.el.nativeElement.offsetParent.className.includes('search-result-wrapper')) {
      if (changes.disabledControl && changes.disabledControl.previousValue === true) {
        this.focus();
      }
    }


  }

  writeValue(value: any): void {
    this.value = value;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabledControl = isDisabled;
  }


  get errorActive() {
    if (this.disabledControl || this.readonly) {
      return false;
    }
    const classes = this.el.nativeElement.classList;
    return this.showValidation && classes.contains('ng-invalid');
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

  onBlur(event) {
    this.propagateTouch(this.value);
    this.hasFocus = false;
    this.blur.emit(event);
  }

  onClickFocus(event) {
    this.mouseDown = true;
    this.hasFocus = false;
  }

  onFocus(event) {
    if (this.mouseDown) {
      //reset mouseDown event (it will be set again on click)
      this.mouseDown = false;
      return;
    }

      this.hasFocus = true
      //reset mouseDown event (it will be set again on click)
      this.mouseDown = false;
  }

  public focus() {
    this.inputElement.nativeElement.focus();
  }

  getLabelFromId() {
    let labels = document.getElementsByTagName('label');
    for( var i = 0; i < labels.length; i++ ) {
      if (labels[i].htmlFor == this.labelId)
           return labels[i];
   }
  }

}
