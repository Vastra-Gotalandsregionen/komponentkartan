import { Component, Input, EventEmitter, Output, OnChanges, HostBinding } from '@angular/core';

@Component({
    selector: 'vgr-checkbox',
    moduleId: module.id,
    templateUrl: './checkbox.component.html'
})
export class CheckboxComponent {
    @HostBinding('class.checkbox') hasClass = true;
    @Input() disabled: boolean;
    @Input() checked: boolean;
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
