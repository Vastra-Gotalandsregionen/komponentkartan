import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'vgr-grid-content',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class GridContentComponent {

  constructor() { }

}
