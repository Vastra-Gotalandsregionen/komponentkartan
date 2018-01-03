import { Component, AfterViewInit, Input, ElementRef, ViewChild } from '@angular/core'

import { IHeaderMenu, IHeaderMenuGroup, IHeaderMenuItem } from '../../models/headerMenu.model'
import { HeaderMenuComponent } from '../headerMenu/headerMenu.component'

@Component({
    selector: 'vgr-header',
    moduleId: module.id,
    templateUrl: './header.component.html'
})

export class HeaderComponent {
    systemColor: string;
    @Input() headerMenu: IHeaderMenu;
    @Input() userName: string;

    @ViewChild(HeaderMenuComponent) headerMenuComponent: HeaderMenuComponent;

    constructor(private elementRef: ElementRef) {
        this.systemColor = 'neutral';

    }

    toggleHeaderMenu(event: Event): void {
        this.headerMenuComponent.toggleHeaderMenu(event);
    }

    keyDown(event: KeyboardEvent): void {
        if (event.keyCode === 13 || event.keyCode === 32) {
            this.headerMenuComponent.toggleHeaderMenu(event);
        }
    }
}
