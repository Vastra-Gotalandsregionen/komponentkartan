import { Component, HostBinding, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'vgr-list-item-header',
    moduleId: module.id,
    template: `<ng-content></ng-content>`

    //tabindex="0" (keydown)="toggleExpand($event)"
})

export class ListItemHeaderComponent {
    @HostBinding('class.list-item__header') listItemHeader = true;
    @HostBinding("tabIndex") tabIndex = 0;

    @Output() expandedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    @HostListener('keydown', ['$event'])
    toggleExpand(event: KeyboardEvent) {
        if (event.keyCode === 13 || event.keyCode === 32) {

            this.expandedChanged.emit(true);
        }
    }

    constructor() {
    }
}
