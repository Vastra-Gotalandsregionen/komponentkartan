
import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';


@Component({
    selector: 'vgr-title-value-layout',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./titleValue.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TitleValueLayoutComponent {

    @HostBinding('class.title-value-layout') TitleValueLayoutClass = true;
    constructor() { }

}
