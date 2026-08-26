import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'vgr-grid-header-toolbar',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class GridHeaderToolbarComponent {

}
