import { AfterContentInit, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Host, HostBinding, Input, OnChanges, OnDestroy, Optional, Output, QueryList, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { __values } from 'tslib';
import { RadiobuttonItemComponent } from './radiobutton-item.component';

@Component({
  selector: 'vgr-radiobutton-group',
  templateUrl: './radiobutton-group.component.html',
  styleUrls: ['./radiobutton-group.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: RadiobuttonGroupComponent,
    multi: true
  }]
})
export class RadiobuttonGroupComponent implements ControlValueAccessor, AfterContentInit, OnChanges, OnDestroy {
  _disabled: boolean;
  _value: string | number;

  @Input() showValidation = true;

  @Input() set value(val: string | number) {
    this._value = val;
  };
  get value() {
    return this._value;
  }





  @Input() @HostBinding('class.disabled') set disabled(val) {
    this._disabled = val;
    if (val !== undefined) {
      this.setGroupDisabledOverride(val);
    }
  }
  @Input() @HostBinding('class.vertical') vertical = false;
  @Input() formControlName?: string;
  @Input() required = false;

  @Output() selectedChanged: EventEmitter<RadiobuttonItemComponent> = new EventEmitter<RadiobuttonItemComponent>();
  @ContentChildren(RadiobuttonItemComponent) items: QueryList<RadiobuttonItemComponent>;

  ngUnsubscribeItems = new Subject();

  internalDisabled: boolean;
  validationErrorMessage = 'Obligatoriskt';
  elementId: string;
  
  public control: AbstractControl;
  constructor(@Host() @SkipSelf() @Optional() private controlContainer: ControlContainer, private elementRef: ElementRef) {
    this.elementId = Math.random().toString();
  }


  ngAfterContentInit() {
    if (this.items.length === 0) {
      return;
    }
    this.items.forEach(item => {
      item.itemSelected.pipe(
        takeUntil(this.ngUnsubscribeItems)
      ).subscribe(() => {
        this.unSelectItems(item);
      });
    });

    if (!this.items.some(x => x.selected) && this._value === undefined) {
      this.unSelectItems();
    }
    this.setGroupDisabledOverride(this._disabled);
    setTimeout(() => {
      this.setPreselectedValue();
    }, 100); 
  }



 setFirstOptionAsFocusable() {
    if(!this.items.some(x => x.selected)) {
      this.items.filter(x => !x.disabled)[0].isTabEnabled = true;
    }
 }

  ngOnChanges() {
    if (this.formControlName && this.controlContainer) {
      this.control = this.controlContainer.control.get(this.formControlName);
    }
  }

  get errorActive() {
    if (this.disabled) {
      return false;
    }

    if (this.showValidation ) {
      if (this.required && !this.items.some(x => x.selected)) {
        this.validationErrorMessage = 'Obligatoriskt'
        return true;
      } else if (this.items.filter(x => x.selected === true).length > 1) {
        this.validationErrorMessage = 'Mer än ett val är aktivt'
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


  ngOnDestroy() {
    this.ngUnsubscribeItems.next();
    this.ngUnsubscribeItems.complete();
  }

  unSelectItems(itemToExclude?: RadiobuttonItemComponent) {
    this.items.forEach(item => {
      if (item !== itemToExclude || !itemToExclude) {
        item.selected = false;
      }
    });



    if (itemToExclude) {
      this.value = itemToExclude.value;
    } else {
      // Om ingen är vald, möjliggör att man kan tabba in till första enablade elementet
      this.setFirstOptionAsFocusable();
      this.value = null;
    }

    this.selectedChanged.emit(itemToExclude);
    this.onChange(itemToExclude);
  }

  disabledItems() {
    this.items.forEach(item => {
      // if (this.disabled) {
        item.disabled = true;
      // }
    });
  }

  setGroupDisabledOverride(groupDisabledState: boolean) {
    this.items?.forEach(item => {
        item.groupDisabledOverride = groupDisabledState;
    });
  }

  setPreselectedValue() {
    if (this.value) {
      this.items?.forEach(item => {
        if(item.value === this.value) {
          item.selected = true;
          this.unSelectItems(item);

        }
      });
    }
  }

  keyDown(event: KeyboardEvent): void {
    const selectedItem = this.items.filter(item => item.hasFocus())[0];
    if (['Enter', 'Spacebar', ' '].includes(event.key)) {
      const positionArray = this.items.toArray();
      const position = positionArray.indexOf(selectedItem)
      this.items.get(position).itemClicked();
      event.preventDefault();
      event.stopPropagation();
    }


    if (['ArrowRight', 'Right', 'ArrowDown', 'Down'].includes(event.key)) {
      this.setFocus(selectedItem, 'forward');
      event.preventDefault();
    }

    if (['ArrowLeft', 'Left', 'ArrowUp', 'Up'].includes(event.key)) {
      this.setFocus(selectedItem, 'back');
      event.preventDefault();
    }
  }

  setSelectedValue(value: string | number) {
    const selectedItem = this.items.filter(x => x.value === value)[0];
    if (selectedItem) {
      selectedItem.selected = true;
      this.unSelectItems(selectedItem);
    } else {
      this.unSelectItems();
    }
 }

  setFocus(option: any, direction?: string) {
    let positionArray = this.items.toArray();
    let position = positionArray.indexOf(option);

    const enabledOptions = this.items;
    if (direction === 'forward') {
      if (position + 1 === enabledOptions.length) {
        if (this.items.get(0)) {
          this.items.get(0).focus();
        }
      } else {
        if (this.items.get(position + 1)) {

          this.items.get(position + 1).focus();
        }
      }
    } else if (direction === 'back') {
      if (position === 0) {
        if (this.items.get(this.items.length - 1)) {
          this.items.get(this.items.length - 1).focus();
        }
      } else {
        if (this.items.get(position - 1)) {
          this.items.get(position - 1).focus();
        }
      }
    }
  }
  onTouched() {}
  onChange(input: RadiobuttonItemComponent) {}

  onLeave() {

    this.onTouched();
  }

  writeValue(value: string | number): void {
    if (value) {
      this.value = value;
    }

    if (this.items) {
      this.setSelectedValue(value);
    }
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


  getLabelFromId() {
    // return window.document.getElementById(this.idForLabel)
    let labels = document.getElementsByTagName('label');
    for( var i = 0; i < labels.length; i++ ) {
      if (labels[i].htmlFor == this.elementId)
           return labels[i];
   }
  }
}
