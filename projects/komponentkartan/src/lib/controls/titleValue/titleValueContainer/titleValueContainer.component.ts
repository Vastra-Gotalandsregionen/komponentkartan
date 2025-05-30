import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'vgr-title-value-container',
    templateUrl: './titleValueContainer.component.html',
    standalone: false
})
export class TitleValueContainerComponent {
    @Input() @HostBinding('style.flex') width = 1;
    constructor() {}
}
