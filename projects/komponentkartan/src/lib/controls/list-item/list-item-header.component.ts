import { Component, HostBinding, AfterViewInit } from '@angular/core';

@Component({
    selector: 'vgr-list-item-header',
    template: `<ng-content></ng-content>`
})

export class ListItemHeaderComponent implements AfterViewInit {
    @HostBinding('class.list-item__header') listItemHeader = true;

    constructor() { }
    ngAfterViewInit() {
        console.warn('vgr-list-item-header soon to be deprecated');
    }
}
