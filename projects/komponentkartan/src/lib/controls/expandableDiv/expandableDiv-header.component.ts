import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'vgr-expandable-div-header',
    moduleId: module.id,
    template: `<ng-content></ng-content>`
})

export class ExpandableDivHeaderComponent {
    constructor() {
    }
}
