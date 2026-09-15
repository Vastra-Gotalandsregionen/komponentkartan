import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'vgr-title-value-heading',
    templateUrl: './titleValueHeading.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TitleValueHeadingComponent {
    @Input() for: string = null;
    @Input() @HostBinding('style.flex') width = 1;
    constructor() {}
}
