import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'vgr-title-value-container',
    templateUrl: './titleValueContainer.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TitleValueContainerComponent {
    @Input() @HostBinding('style.flex') width = 1;
    constructor() {}
}
