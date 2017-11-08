import { Component, Input, EventEmitter, Output, OnChanges, HostBinding } from '@angular/core'

@Component({
    selector: 'vgr-button',
    moduleId: module.id,
    templateUrl: './button.component.html'
})
export class ButtonComponent implements OnChanges {
    @HostBinding('class.button') buttonClass = true;
    @Input() disabled: boolean;
    @Input() secondary: boolean;
    lastDisabledStatus: boolean;
    reenabled: boolean;
    @Output() click = new EventEmitter<string>();

    onMouseDown(event: any): void {
        event.cancelBubble = true;
        if (!this.disabled) {
            this.click.emit();
        }
    }

    onClick(event: any) {
        event.cancelBubble = true;
    }

    ngOnChanges() {
        this.reenabled = this.lastDisabledStatus === true && this.disabled === false;
        this.lastDisabledStatus = this.disabled;
    }

    keyPressed(event: KeyboardEvent): void {
        if (event.keyCode === 13 || event.keyCode === 32) {
            this.onMouseDown(event);
        }
    }
}
