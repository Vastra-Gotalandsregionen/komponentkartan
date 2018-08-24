import { Component, Input, ViewChild } from '@angular/core';
import { IHeaderMenu } from '../../models/headerMenu.model';
import { HeaderMenuComponent } from '../headerMenu/headerMenu.component';

@Component({
  selector: 'vgr-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  @Input() headerMenu: IHeaderMenu;
  @Input() userName: string;
  @Input() initials: string;
  @Input() systemText: string;
  @Input() textColor: string;
  @Input() circleColor: string;
  @Input() hideSwosh = false;
  @Input() logoClass: string;
  defaultInitials: string;
  @ViewChild(HeaderMenuComponent) headerMenuComponent: HeaderMenuComponent;

  setInitials(): string {
    if (!this.initials) {
      const names = this.userName.split(' ');
      if (names.length > 1) {
        this.initials = names[0].substring(0, 1) + names[names.length - 1].substring(0, 1);
      } else {
        this.initials = names[0].substring(0, 1);
      }
    }

    return this.initials;
  }

  clickToggleHeaderMenu(event: Event) {
    this.headerMenuComponent.toggleHeaderMenu(event);
  }

  keyToggleHeaderMenu(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      this.headerMenuComponent.toggleHeaderMenu(event);
    }
  }
}
