import { Component, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { IHeaderMenu } from '../../models/headerMenu.model';
import { HeaderMenuComponent } from '../headerMenu/headerMenu.component';

@Component({
  selector: 'vgr-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnChanges {
  @Input() headerMenu: IHeaderMenu;
  @Input() userName: string;
  @Input() initials: string;
  @Input() systemText: string;
  @Input() textColor: string;
  @Input() circleColor: string;
  @Input() hideSwosh = false;
  @Input() logoClass: string;
  @ViewChild(HeaderMenuComponent) headerMenuComponent: HeaderMenuComponent;
  internalInitials: string;
  hideMenu = true;

  ngOnChanges(changes: SimpleChanges) {
    const initialsChange = changes['initials'];
    const userNameChange = changes['userName'];

    if (initialsChange) {
      if (initialsChange.previousValue && !initialsChange.currentValue) {
        this.internalInitials = this.getInitialsFromUserName();
      } else {
        this.internalInitials = initialsChange.currentValue;
      }
      return;
    }

    if (userNameChange && !this.initials) {
      this.internalInitials = this.getInitialsFromUserName();
    }
  }
  clickToggleHeaderMenu(event: Event) {
    if (!this.headerMenuComponent) {
      return;
    }

    this.headerMenuComponent.toggleHeaderMenu(event);
  }

  keyToggleHeaderMenu(event: KeyboardEvent) {
    if (!this.headerMenuComponent) {
      return;
    }

    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      this.headerMenuComponent.toggleHeaderMenu(event);
    }
  }

  private getInitialsFromUserName(): string {
    if (!this.userName) {
      return '';
    }

    const names = this.userName.split(' ');
    if (names.length > 1) {
      return names[0].substring(0, 1) + names[names.length - 1].substring(0, 1);
    } else {
      return names[0].substring(0, 1);
    }
  }
}
