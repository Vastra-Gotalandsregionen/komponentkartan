import { Component } from '@angular/core';

@Component({
    selector: 'vgr-expandable-div-content',
    template: `<ng-content></ng-content>`
})

export class ExpandableDivContentComponent {
    constructor() {
    }
}
