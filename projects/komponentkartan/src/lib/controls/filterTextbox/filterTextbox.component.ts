import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'vgr-filter-textbox',
  templateUrl: './filterTextbox.component.html'
})
export class FilterTextboxComponent {
  @Input() get value() {
    return this._value;
  }
  set value(newValue: string) {
    this._value = newValue;
    this.valueChanged.emit(newValue);
  }

  @Output() valueChanged = new EventEmitter<string>();

  @ViewChild('filterTextbox') filterTextbox: ElementRef;

  hasFocus: boolean;
  private _value: string;

  clear() {
    this._value = '';
    this.valueChanged.emit('');
  }

  focus() {
    this.filterTextbox.nativeElement.focus();
  }
}
