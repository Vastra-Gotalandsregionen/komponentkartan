import { AfterContentInit, Component, ContentChildren, ElementRef, EventEmitter, Host, HostBinding, Input, OnChanges, OnInit, Optional, Output, QueryList, SimpleChanges, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';
import { CheckboxComponent } from './checkbox.component';

@Component({
  selector: 'vgr-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss']
})
export class CheckboxGroupComponent implements ControlValueAccessor, AfterContentInit, OnChanges {
  _disabled: boolean;
  @Input() showValidation = true;

  @Input() @HostBinding('class.disabled') set disabled(val) {
    this._disabled = val;
    if (val !== undefined) {
      this.setGroupDisabledOverride(val);
    }
  }
  @Input() @HostBinding('class.vertical') vertical = false;
  @Input() formControlName?: string;
  @Input() required = false;

  @Output() selectedChanged: EventEmitter<CheckboxComponent> = new EventEmitter<CheckboxComponent>();
  @ContentChildren(CheckboxComponent) items: QueryList<CheckboxComponent>;

  ngUnsubscribeItems = new Subject();

  validationErrorMessage = 'Obligatoriskt';
  elementId: string;
  value: string[] | number[];


  public control: AbstractControl;

  constructor(@Host() @SkipSelf() @Optional() private controlContainer: ControlContainer, private elementRef: ElementRef) {
    this.elementId = Math.random().toString();
  }

  ngAfterContentInit(): void {
    this.setGroupDisabledOverride(this._disabled)
  }

  ngOnChanges(): void {
    console.log('ngOnChanges', this.formControlName)
    if (this.formControlName && this.controlContainer) {
      this.control = this.controlContainer.control.get(this.formControlName)
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
    if (this.disabled) {
      return false;
    }

    if (this.showValidation ) {
      if (this.required && !this.items.some(x => x.checked)) {
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

  setGroupDisabledOverride(groupDisabledState: boolean) {
    this.items?.forEach(item => {
      item.groupDisabledOverride = groupDisabledState;
    });
  }

  onTouched() {}

  onChange(input: CheckboxComponent) {}

  onLeave() {
    this.onTouched();
  }

  writeValue(obj: any): void {
    console.log('WriteValue', obj);
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
