import { Input, Component, HostBinding, ContentChild, ElementRef } from '@angular/core';

@Component({
    selector: 'vgr-panel',
    moduleId: module.id,
    templateUrl: './panel.component.html',
})
export class PanelComponent {
    @HostBinding('class.information-panel') private panelClass = true;
    @HostBinding('class.one-third') private widthClass = true;
    @HostBinding('class.theme-green') private themeClass = true;

    constructor(private elementRef: ElementRef) { }
}

