import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'vgr-table-row',
    template: `<ng-content select="vgr-table-row-column"></ng-content>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})

export class TableRowComponent {
    @HostBinding('class.table-row') tableRowClass = true;

    constructor() {
    }
}
