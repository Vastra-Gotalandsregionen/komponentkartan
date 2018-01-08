import { Input, Component, HostBinding, ContentChild, ElementRef } from '@angular/core';

@Component({
    selector: 'vgr-panel-information',
    moduleId: module.id,
    template: `<ng-content></ng-content>`,
})
export class PanelInformationComponent {
    @HostBinding('class.information-panel__information') private panelInformationClass = true;

    constructor(private elementRef: ElementRef) { }
}

