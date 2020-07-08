import { Input, Component, HostBinding, ContentChild, ElementRef } from '@angular/core';

@Component({
    selector: 'vgr-panel-container',
    template: `<ng-content select="vgr-panel"></ng-content>`,
    styleUrls: ['./panel.component.scss']
})
export class PanelContainerComponent {
    @HostBinding('class.panel-container') panelContainerClass = true;

    constructor(private elementRef: ElementRef) { }
}


