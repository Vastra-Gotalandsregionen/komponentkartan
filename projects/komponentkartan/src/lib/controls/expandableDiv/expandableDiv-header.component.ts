import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'vgr-expandable-div-header',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})

export class ExpandableDivHeaderComponent {
    constructor() {
    }
}
