import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'vgr-list-item-header',
    moduleId: module.id,
    template: `<ng-content></ng-content>`
})

export class ListItemHeaderComponent {
    @HostBinding('class.list-item__header') listItemHeader = true;
    constructor() {
    }
}
