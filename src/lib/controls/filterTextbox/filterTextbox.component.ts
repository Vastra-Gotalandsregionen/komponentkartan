import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'vgr-filter-textbox',
    moduleId: module.id,
    templateUrl: './filterTextbox.component.html'
})
export class FilterTextboxComponent {
    private _value: string;
    @Output() valueChanged = new EventEmitter<string>();
    @Input() get value() {
        return this._value;
    }
    set value(newValue: string) {
        this._value = newValue;
        this.valueChanged.emit(newValue);
    }
    clear() {
        this._value = '';
        this.valueChanged.emit('');
    }
}
