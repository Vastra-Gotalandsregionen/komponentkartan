import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'vgr-selectablelist-header',
    template: '<ng-content select="vgr-selectablelist-header-column"></ng-content>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SelectablelistHeaderComponent {

  constructor() { }

}
