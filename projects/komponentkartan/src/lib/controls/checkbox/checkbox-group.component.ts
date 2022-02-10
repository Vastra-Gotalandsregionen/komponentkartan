import { AfterContentInit, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Host, HostBinding, Input, OnChanges, OnDestroy, OnInit, Optional, Output, QueryList, SimpleChanges, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CheckboxComponent } from './checkbox.component';

@Component({
  selector: 'vgr-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxGroupComponent),
    multi: true
  }]
})
export class CheckboxGroupComponent implements ControlValueAccessor, AfterContentInit, OnChanges, OnDestroy {
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
  _value: string[] = [];


  public control: AbstractControl;

  constructor(@Host() @SkipSelf() @Optional() private controlContainer: ControlContainer, private elementRef: ElementRef) {
    this.elementId = Math.random().toString();


  }

  ngAfterContentInit(): void {
    this.setGroupDisabledOverride(this._disabled);

    const values = this.items.filter(item => item.checked).map(i => i.label);
    console.log('sätt första värdena: ', values)
    this.onChange( values);

    // Subscribe on changes
    this.items.forEach(item => {
      item.checkedChanged.pipe(takeUntil(this.ngUnsubscribeItems)).subscribe(($event) => {
        const values = this.items.filter(item => item.checked).map(i => i.label);
        this.onChange( values);

      });
    });
  };




  ngOnDestroy() {
    this.ngUnsubscribeItems.next();
    this.ngUnsubscribeItems.complete();
  }

  ngOnChanges(): void {
    if (this.formControlName && this.controlContainer) {
      this.control = this.controlContainer.control.get(this.formControlName)
    }
  }


  keyDown(event: KeyboardEvent): void {
    if ([' ', 'Spacebar', 'Enter'].includes(event.key)) {
      // this.onClick(event);
      event.preventDefault();
      event.stopPropagation();
    }
  }



  getLabelFromId() {
    // return window.document.getElementById(this.idForLabel)
    let labels = document.getElementsByTagName('label');
    for (var i = 0; i < labels.length; i++) {
      if (labels[i].htmlFor == this.elementId)
        return labels[i];
    }
  }


  get errorActive() {
    if (this.disabled) {
      return false;
    }

    if (this.showValidation) {
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

  onChange(value: any) {
    this._value = value;
  }
  onTouch:  (value) => void;

  onLeave(event) {

    if ((event.relatedTarget !== null)) {
      return;
    }
    if (this.control) {
      this.control.markAsTouched();
      this.control.markAsDirty();
      console.log('OnLeave: ', this.control.updateOn)
      if (this.control.updateOn === 'blur') {

        const values = this.items.filter(item => item.checked).map(i => i.label);


        this.control.setValue(values);
      }

    }
  }

  writeValue(event: any): void {
      if (event.length === 0) {
        return;
      }

      if (event) {
        setTimeout(() => {
          event.forEach( checkboxValue => {
            this.items.filter(item => item.label === checkboxValue).map(checked => checked.checked = true);
          })
        }, 10);

        this._value = event;
      } else { // formcontrol.reset
        this._value = [];
        this.items.forEach(element => {
          element.checked = false;
        });
      }
  }

  registerOnChange(fn: any): void {
     this.onChange = (value: any) => {
      this._value = value;
      fn(value);
    };
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
