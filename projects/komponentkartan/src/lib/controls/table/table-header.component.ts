import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'vgr-table-header',
    template: `<ng-content></ng-content>`
})

export class TableHeaderComponent {
    constructor() {
    }
}
