import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'vgr-table-row',
    moduleId: module.id,
    template: `<ng-content select="vgr-table-row-column"></ng-content>`
})

export class TableRowComponent {
    @HostBinding('class.table-row') private tableRowClass = true;

    constructor() {
    }
}
