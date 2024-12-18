import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'vgr-table-row',
    template: `<ng-content select="vgr-table-row-column"></ng-content>`,
    standalone: false
})

export class TableRowComponent {
    @HostBinding('class.table-row') tableRowClass = true;

    constructor() {
    }
}
