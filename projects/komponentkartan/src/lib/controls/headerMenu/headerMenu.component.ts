import { Component, Input, ElementRef, HostListener, ContentChildren, QueryList, Output, SimpleChanges, OnChanges } from '@angular/core';
import { IHeaderMenu, IHeaderMenuItem } from '../../models/headerMenu.model';
import { MenuItemBase } from '../menu/menu-item-base';

@Component({
  selector: 'vgr-header-menu',
  templateUrl: './headerMenu.component.html'
})

export class HeaderMenuComponent implements OnChanges {
  @ContentChildren(MenuItemBase) menuItems: QueryList<MenuItemBase>;
  @Input() menu: IHeaderMenu;
  @Input() navigationToggled: boolean;
  @Input() userName: string;
  @Input() initials: string;
  @Input() textColor: string;
  @Input() circleColor: string;
  internalInitials: string;

  selectedItem: IHeaderMenuItem;
  hideMenu = true;



  constructor(private elementRef: ElementRef) {
  }
  clickToggleHeaderMenu(event: Event) {
    this.hideMenu = !this.hideMenu;
  }
  keyToggleHeaderMenu(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      this.hideMenu = !this.hideMenu;
      // this.headerMenuComponent.toggleHeaderMenu(event);
    }
  }
  toggleHeaderMenu(event: MouseEvent | any) {
    this.hideMenu = !this.hideMenu;
    if (!this.hideMenu) {
      event.cancelBubble = true;
    }
  }

  toggleSubMenu(item: IHeaderMenuItem) {
    item.expanded = !item.expanded;

    event.cancelBubble = true;
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(event: any) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hideMenu = true;
    }
  }

  onMouseEnter(item: IHeaderMenuItem) {
    this.menu.menuItems.forEach(x => x.marked = false);

    item.marked = true;
  }

  onMouseLeave(item: IHeaderMenuItem) {
    item.marked = false;
    if (this.selectedItem) {
      this.selectedItem.marked = true;
    }
  }


  selectItem(item: IHeaderMenuItem) {
    if (!item) {
      return;
    }

    this.menu.menuItems.forEach(x => x.selected = false);

    item.selected = true;
    item.marked = true;
    this.selectedItem = item;


  }


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


