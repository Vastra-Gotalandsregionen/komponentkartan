import { Component, Input, EventEmitter, Output, HostBinding } from '@angular/core';

export abstract class ButtonBaseComponent {
    @HostBinding('class.button') buttonClass = true;
    @Input() disabled = false;
    @Output() click = new EventEmitter();

    constructor() { }
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

    onClick(event: any): void {
        if (this.disabled) {
            event.stopPropagation();
        }
    }

}
