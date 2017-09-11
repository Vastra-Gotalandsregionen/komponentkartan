import { Component, Input, EventEmitter, Output, OnChanges, HostBinding } from '@angular/core';

@Component({
    selector: 'vgr-checkbox',
    moduleId: module.id,
    templateUrl: './checkbox.component.html'
})
export class CheckboxComponent {
    @HostBinding('class.checkbox') hasClass = true;
    @HostBinding('attr.role') checkBoxRole = 'checkbox';
    @HostBinding('attr.aria-labelledby') labelledBy = 'checkbox-label';
    @Input() disabled: boolean;
    @HostBinding('attr.aria-checked') @Input() checked: boolean;
    @Output() checkedChanged = new EventEmitter<boolean>();

    constructor() {
        this.disabled = false;
        this.checked = false;
    }
    onClick(): void {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.checkedChanged.emit(this.checked);
        }
    }

    onKeyDown(event: KeyboardEvent): void {
        if (event.keyCode === 13 || event.keyCode === 32) {
            this.onClick();
            event.preventDefault();
        }
    }
}
