import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'vgr-filter-textbox',
  templateUrl: './filterTextbox.component.html'
})
export class FilterTextboxComponent implements OnInit {
  @Input() get value() {
    return this._value;
  }
  set value(newValue: string) {
    this._value = newValue;
    this.valueChanged.emit(newValue);
  }

  @Output() valueChanged = new EventEmitter<string>();

  @ViewChild('filterTextbox', { static: true }) filterTextbox: ElementRef;

  hasFocus: boolean;
  private _value: string;

  ngOnInit(){
    console.warn('vgr-filter-textbox is deprecated and soon to be removed. Please consider using <vgr-input type="search"> instead.');

  }

  clear() {
    this._value = '';
    this.valueChanged.emit('');
  }

  focus() {
    this.filterTextbox.nativeElement.focus();
  }
}
