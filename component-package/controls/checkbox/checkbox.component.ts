import { Component, Input, EventEmitter, Output, OnChanges } from "@angular/core";

@Component({
    selector: "vgr-checkbox",
    moduleId: module.id,
    templateUrl: "./checkbox.component.html",
    host: { 'class': 'checkbox' }
})
export class CheckboxComponent {
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