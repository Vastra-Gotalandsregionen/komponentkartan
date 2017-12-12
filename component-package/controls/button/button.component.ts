import { Component, Input, EventEmitter, Output, OnChanges, HostBinding } from '@angular/core'

@Component({
    selector: 'vgr-button',
    moduleId: module.id,
    templateUrl: './button.component.html'
})
export class ButtonComponent implements OnChanges {
    @HostBinding('class.button') buttonClass = true;
    @Input() disabled = false;
    @Input() secondary: boolean;
    lastDisabledStatus: boolean;
    reenabled: boolean;
    @Output() click = new EventEmitter();

    constructor() {

    }
    onClick(event: MouseEvent) {
        if (this.disabled) {
            event.stopPropagation();
        }
    }

    ngOnChanges() {
        this.reenabled = this.lastDisabledStatus === true && this.disabled === false;
        this.lastDisabledStatus = this.disabled;
    }

    keyPressed(event: KeyboardEvent): void {
        if (this.disabled) {
            return;
        }

        if (event.keyCode === 32) {
            event.preventDefault();
            this.click.emit();
        } else if (event.keyCode === 13) {
            this.click.emit();
        }
    }
}
