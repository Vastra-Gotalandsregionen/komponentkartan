import { Component, Input, EventEmitter, Output, OnChanges, HostBinding, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'vgr-checkbox',
    moduleId: module.id,
    templateUrl: './checkbox.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxComponent),
        multi: true
    }]
})
export class CheckboxComponent implements ControlValueAccessor {
    @Input() disabled: boolean;
    @Input() checked: boolean;
    @Output() checkedChanged = new EventEmitter<boolean>();
    @Input() label: string;

    constructor() {
        this.disabled = false;
        this.checked = false;
    }
    onClick(): void {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onChange(this.checked);
            this.checkedChanged.emit(this.checked);
        }
    }

    onKeyDown(event: KeyboardEvent): void {
        if (event.keyCode === 13 || event.keyCode === 32) {
            this.onClick();
            event.preventDefault();
            event.cancelBubble = true;
        }
    }

    writeValue(value: any): void {
        this.checked = value;
    }

    registerOnChange(func: any): void {
        this.onChange = func;
    }

    registerOnTouched(func: any): void {
        this.onTouched = func;
    }

    onChange(input: any) {
    }

    onTouched() { }
}
