import { Component, HostBinding, ContentChild, ElementRef } from '@angular/core';

@Component({
    selector: 'vgr-panel-footer',
    moduleId: module.id,
    template: `<ng-content></ng-content>`,
})
export class PanelFooterComponent {
    @HostBinding('class.information-panel__footer') private panelHeaderClass = true;

    constructor(private elementRef: ElementRef) { }
}

