import { Component, Input, ViewChild } from '@angular/core';
import { IHeaderMenu } from '../../models/headerMenu.model';
import { HeaderMenuComponent } from '../headerMenu/headerMenu.component';

@Component({
    selector: 'vgr-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {
    systemColor: string;
    @Input() headerMenu: IHeaderMenu;
    @Input() userName: string;
    @Input() initials: string;
    @Input() systemText: string;
    @Input() textColor: string;
    @Input() circleColor: string;

    @ViewChild(HeaderMenuComponent) headerMenuComponent: HeaderMenuComponent;

    constructor() {
        this.systemColor = 'neutral';
    }

    setInitials(): string {
        if (this.initials) {
            return this.initials;
        } else {
            return this.initials = this.getInitials(this.userName);
        }
    }

    getInitials(username: string) {
        const name = username.split(' ');
        let initials = name[0].substring(0, 1).toUpperCase();

        if (name.length > 1) {
            initials += name[name.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
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
