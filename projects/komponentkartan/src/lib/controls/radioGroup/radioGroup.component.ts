import { Component, Input, EventEmitter, Output, HostBinding, forwardRef, ElementRef, OnChanges, AfterViewInit, SkipSelf, Optional, Host, Renderer2, ViewChild } from '@angular/core';
import { SelectableItem } from '../../models/selectableItem.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer, AbstractControl } from '@angular/forms';
import { Guid } from '../../utils/guid';

@Component({
  selector: 'vgr-radio-group',
  templateUrl: './radioGroup.component.html',
  styleUrls: ['./radioGroup.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioGroupComponent),
    multi: true
  }]
})


export class RadioGroupComponent implements ControlValueAccessor, OnChanges, AfterViewInit {
  @HostBinding('class.radio-group') hasClass = true;
  @HostBinding('attr.role') role = 'radiogroup';
  @Input() @HostBinding('class.disabled') disabled: boolean;
  @Input() @HostBinding('class.vertical') vertical = false;
  @Input() formControlName?: string;
  @Input() set options(items: SelectableItem<any>[]) {
    const _items = JSON.parse(JSON.stringify(items));

    let newItem: RadioGroupItem<any>;
    _items.forEach(item => {
      newItem = item as RadioGroupItem<any>;
      newItem.ariaid = Guid.newGuid();
      this.radiogroupItems.push(newItem);
    });
  }

  @Output() selectedChanged: EventEmitter<any> = new EventEmitter<any>();
  public radiogroupItems: RadioGroupItem<any>[] = [];
  public control: AbstractControl;
  public elements: any;
  public selectedOption: RadioGroupItem<any>;

  get noSelectionFlag(): boolean {
    return this.radiogroupItems.every((x) => (x.selected === false || x.selected === undefined));
  }

  constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer, private elementRef: ElementRef, private renderer: Renderer2) {
    console.warn('Komponenten <vgr-radio-group> är utfasad och skall ersättas med <vgr-radiobutton-group>')
  }

  ngOnChanges() {
    if (this.radiogroupItems && this.radiogroupItems.length > 0) {
      const preSelectedOption = this.radiogroupItems.find(x => x.selected);
      if (preSelectedOption) {
        this.selectOption(preSelectedOption);
      }
    }
    if (this.formControlName && this.controlContainer) {
      this.control = this.controlContainer.control.get(this.formControlName);
    }
  }

  ngAfterViewInit() {
    this.elements = this.elementRef.nativeElement.querySelectorAll('.radio-button__icon');
  }

  public focus() {
    this.elements[0].focus();
  }

  optionClicked(option: RadioGroupItem<any>) {
    if (this.disabled || option.disabled) {
      const position = this.radiogroupItems.indexOf(option);
      if (this.elements[position]) {
        this.elements[position].focus();
        return;
      }
    }

    if (!option.selected) {
      this.selectOption(option);
    }

    if (this.renderer) {
      const position = this.radiogroupItems.indexOf(option);
      if (this.elements[position]) {
        this.elements[position].focus();
      }
    }
  }

  keyDown(event: KeyboardEvent, option: RadioGroupItem<any>): void {

    if (['Enter', 'Spacebar', ' '].includes(event.key)) {
      this.optionClicked(option);
      event.preventDefault();
      event.stopPropagation();
    }

    if (['ArrowRight', 'Right', 'ArrowDown', 'Down'].includes(event.key)) {
      this.setFocus(option, 'forward');
      event.preventDefault();
    }

    if (['ArrowLeft', 'Left', 'ArrowUp', 'Up'].includes(event.key)) {
      this.setFocus(option, 'back');
      event.preventDefault();
    }
  }

  setFocus(option: RadioGroupItem<any>, direction?: string) {
    const position = this.radiogroupItems.indexOf(option);
    const nextItem = this.radiogroupItems[position + 1];
    const previousItem = this.radiogroupItems[position - 1];

    const enabledOptions = this.radiogroupItems;
    if (direction === 'forward') {
      if (position + 1 === enabledOptions.length) {
        if (this.elements[0]) {
          this.elements[0].focus();
        }
        this.optionClicked(enabledOptions[0]);
      } else {
        if (this.elements[position + 1]) {

          this.elements[position + 1].focus();
        }
        this.optionClicked(nextItem);
      }
    } else if (direction === 'back') {
      if (position === 0) {
        if (this.elements[this.radiogroupItems.length - 1]) {
          this.elements[this.radiogroupItems.length - 1].focus();
        }
        this.optionClicked(this.radiogroupItems[enabledOptions.length - 1]);
      } else {
        if (this.elements[position - 1]) {
          this.elements[position - 1].focus();
        }
        this.optionClicked(previousItem);
      }
    }
  }

  checkTabFocus(index: number) {
    // return !this.radiogroupItems[index].disabled && (this.radiogroupItems[index].selected || (index === 0 && this.noSelectionFlag));
    return this.radiogroupItems[index].selected || (index === 0 && this.noSelectionFlag);
  }

  writeValue(option: any): void {
    if (option) {
      const preSelectedOption = this.radiogroupItems.find(x => x.value === option);
      if (preSelectedOption) {
        this.selectOption(preSelectedOption, false);
      }
    } else {
      this.radiogroupItems.forEach(o => {
        o.selected = false;
      });
    }
  }

  registerOnChange(func: any): void {
    this.onChange = func;
  }

  registerOnTouched(func: any): void {
    this.onTouched = func;
  }

  onChange(input: SelectableItem<any>) {
  }

  onTouched() { }

  onLeave() {
    if (this.control) {
      this.control.markAsTouched();
      this.control.markAsDirty();
      if (this.control.updateOn === 'blur' && this.selectedOption && this.selectedOption.value) {
        this.control.setValue(this.selectedOption.value);
      }
    }
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  private selectOption(option: RadioGroupItem<any>, event: boolean = true) {
    this.selectedOption = option;
    this.radiogroupItems.forEach(o => {
      o.selected = (o === option);
    });
    option.selected = true;

    this.selectedChanged.emit(option.value);
    if (event) {
      this.onChange(option.value);
    }
  }
}

export interface RadioGroupItem<TValue> extends SelectableItem<TValue> {
  ariaid?: string;
}
