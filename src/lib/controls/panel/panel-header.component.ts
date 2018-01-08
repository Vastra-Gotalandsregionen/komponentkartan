import { Input, Component, HostBinding, ContentChild, ElementRef } from '@angular/core';

@Component({
    selector: 'vgr-panel-header',
    moduleId: module.id,
    templateUrl: './panel-header.component.html',
})
export class PanelHeaderComponent {
    @HostBinding('class.information-panel__header') private panelHeaderClass = true;

    @Input() title: string;
    @Input() timestamp: string;

    constructor(private elementRef: ElementRef) { }
}

