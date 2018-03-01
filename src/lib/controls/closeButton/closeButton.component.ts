import { Component, Input, EventEmitter, Output, HostBinding } from '@angular/core';

@Component({
    selector: 'vgr-close-button',
    moduleId: module.id,
    templateUrl: './closeButton.component.html'
})
export class CloseButtonComponent {
    @HostBinding('class.button') buttonClass = true;
    @Input() disabled = false;
    @Output() click = new EventEmitter();

    label = 'stäng';

    onClick(event: MouseEvent) {
        if (this.disabled) {
            event.stopPropagation();
        }
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
