import { Input, Component, HostBinding, ContentChild, ElementRef } from '@angular/core';

@Component({
    selector: 'vgr-panel-container',
    moduleId: module.id,
    template: `<ng-content select="vgr-panel"></ng-content>`,
})
export class PanelContainerComponent {
    @HostBinding('class.panel-container') private panelContainerClass = true;

    constructor(private elementRef: ElementRef) { }
}


