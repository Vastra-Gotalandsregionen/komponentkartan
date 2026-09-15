import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'vgr-table-header',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})

export class TableHeaderComponent {
    constructor() {
    }
}
