import { AfterContentInit, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Host, HostBinding, Input, OnChanges, OnInit, Optional, Output, QueryList, SimpleChanges, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
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
  _value: string[] = [];


  public control: AbstractControl;

  constructor(@Host() @SkipSelf() @Optional() private controlContainer: ControlContainer, private elementRef: ElementRef) {
    this.elementId = Math.random().toString();
  }


  ngAfterContentInit(): void {
    this.setGroupDisabledOverride(this._disabled)
    this.items.forEach(item => {
      if (item.checked) {
        this._value.push(item.label)
        if (this.formControlName && this.controlContainer) {
          this.onChange(this._value);
        }
      }
      item.checkedChanged.subscribe(($event) => {
        if ($event.checked) {
          this._value.push($event.label)
        } else {
          const index = this._value.indexOf($event.label);
          if (index >= 0) {
            this._value.splice(index, 1);
          }
        }

        if (this.formControlName && this.controlContainer) {
          this.onChange(this._value);
        }
      })
    })
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

  public onChange: (value) => void;
  onTouch:  (value) => void;

  onLeave() {
    console.log('onLeave')
    //this.onTouched();
  }

  writeValue(event: any): void {
    if (event.checked) {
      this._value.push(event.label)
    } else {
      const index = this._value.indexOf(event.label);
      if (index >= 0) {
        this._value.splice(index, 1);
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
