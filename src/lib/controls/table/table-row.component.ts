import { Component } from '@angular/core';

@Component({
    selector: 'vgr-table-row',
    moduleId: module.id,
    template: `<ng-content select="vgr-table-row-column"></ng-content>`
})

export class TableRowComponent {
    constructor() {
    }
}
