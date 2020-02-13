import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'vgr-list-item-header',
    template: `<ng-content></ng-content>`
})

export class ListItemHeaderComponent {
    @HostBinding('class.list-item__header') listItemHeader = true;

    constructor() { }
}
