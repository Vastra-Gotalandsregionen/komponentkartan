import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'vgr-title-value-heading',
    templateUrl: './titleValueHeading.component.html'
})
export class TitleValueHeadingComponent {
    @Input() @HostBinding('style.flex') width = 1;
    constructor() {}
}
