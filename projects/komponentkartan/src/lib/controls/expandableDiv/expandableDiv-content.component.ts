import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'vgr-expandable-div-content',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})

export class ExpandableDivContentComponent {
    constructor() {
    }
}
