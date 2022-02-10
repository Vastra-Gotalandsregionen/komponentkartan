import { Component, Input, EventEmitter, Output, OnChanges, forwardRef, SkipSelf, Optional, Host, ElementRef, AfterViewInit, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer, AbstractControl } from '@angular/forms';
import { Guid } from '../../utils/guid';


@Component({
    selector: 'vgr-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxComponent),
        multi: true
    }]
})
export class CheckboxComponent implements ControlValueAccessor, OnChanges, AfterViewInit {

    get disabled() {
      if (this.groupDisabledOverride) {
        return true;
      } else {
        return this._disabled;
      }
    }
    @Input() set disabled(val: boolean) {
      this._disabled = val;
    };
    @Input() checked = false;
    @Input() label: string;
    @Input() formControlName?: string;
    @Input() transparent = false;
    @Input() required = false;
    @Input() showValidation = true;

    @Output() checkedChanged = new EventEmitter<any>();

    @ViewChild('checkbox', { read: ElementRef, static: false }) checkbox: ElementRef;

    public control: AbstractControl;
    public labelledbyid: string = Guid.newGuid();
    public element: any;
    groupDisabledOverride: boolean;
    validationErrorMessage = 'Obligatoriskt';
    elementId: string;
    _disabled: boolean = false;

    constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer, private elementRef: ElementRef) {
        this.elementId = Math.random().toString();
    }

    ngOnChanges(changes: SimpleChanges) {
      if (this.formControlName && this.controlContainer) {
          this.control = this.controlContainer.control.get(this.formControlName);
          this.setDisabledState(this.controlContainer.control.get(this.formControlName).disabled);
      }
    }

    getLabelFromId() {
        // return window.document.getElementById(this.idForLabel)
      let labels = document.getElementsByTagName('label');
      for( var i = 0; i < labels.length; i++ ) {
        if (labels[i].htmlFor == this.elementId)
              return labels[i];
      }
    }


    get errorActive() {
      const el = this.elementRef.nativeElement;

      if (el.closest('vgr-checkbox-group')) { // if checkbox is in a group, dont validate
           return false;
       }
      if (this.disabled) {
        return false;
      }

      if (this.showValidation) {
        if (this.required && !this.checked) {
          this.validationErrorMessage = 'Obligatoriskt'
          return true;
        } else if (this.control) {
          const classes = this.elementRef.nativeElement.classList;
          return classes.contains('ng-invalid');
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    ngAfterViewInit() {
      this.element = this.elementRef.nativeElement.querySelector(':not(.checkbox--disabled) .checkbox__image');
    }

    onClick(event: Event): void {
      if (!this.disabled) {
          this.checked = !this.checked;

          if (this.element) {
              this.element.focus();
          }

          if (this.control) {
            console.log('onchange is called on component and emit')
            this.onChange(this.checked);
          }

          this.checkedChanged.emit( {id: this.elementId, checked: this.checked, label: this.label});
          event.stopPropagation();
      }
    }

    onKeyDown(event: KeyboardEvent): void {
      if ([' ', 'Spacebar', 'Enter'].includes(event.key)) {
          this.onClick(event);
          event.preventDefault();
          event.stopPropagation();
      }
    }

    onLeave(event) {
      if ((event.relatedTarget !== null)) {
        return;
      }

      if (this.control) {
          this.control.markAsTouched();
          this.control.markAsDirty();
          if (this.control.updateOn === 'blur') {

            setTimeout(() => {
              this.control.setValue(this.checked);
            } );

          }
      }
    }

    writeValue(value: any): void {
      console.log('writevalue checkbox')
      this.checked = value;
    }

    registerOnChange(func: any): void {
      this.onChange = func;
    }

    registerOnTouched(func: any): void {
      this.onTouched = func;
    }

    onChange(input: any) { }

    onTouched() { }

    public focus() {
      this.checkbox.nativeElement.focus();
    }
}
