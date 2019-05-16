import { Component, Input, ElementRef, HostListener, ContentChildren, QueryList, SimpleChanges, OnChanges, AfterContentInit, OnDestroy, Renderer } from '@angular/core';
import { MenuItemBase } from '../menu/menu-item-base';
import { SubmenuComponent } from '../menu/submenu.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vgr-header-menu',
  templateUrl: './headerMenu.component.html'
})

export class HeaderMenuComponent implements AfterContentInit, OnDestroy, OnChanges {
  private ngUnsubscribe = new Subject();

  @ContentChildren(MenuItemBase) menuItems: QueryList<MenuItemBase>;
  @Input() userName: string;
  @Input() initials: string;
  @Input() textColor: string;
  @Input() circleColor: string;
  internalInitials: string;
  hideMenu = true;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterContentInit() {
    const menuItemArray = this.menuItems.toArray();

    menuItemArray.forEach((menuItem, i) => {
      menuItem.home
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => this.menuItems.first.setFocus());

      menuItem.end
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => this.menuItems.last.setFocus(true));

      menuItem.arrowUp
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
          if (i === 0) {
            const lastMenuItem = this.menuItems.last;
            if (lastMenuItem instanceof SubmenuComponent) {
              if ((<SubmenuComponent>lastMenuItem).expanded) {
                (<SubmenuComponent>lastMenuItem).menuItems.last.setFocus();

                return;
              }
            }
            this.menuItems.last.setFocus();
            return;
          }
          this.menuItems.toArray()[i - 1].setFocus(true);
        });

      menuItem.arrowDown.pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
          if (i === this.menuItems.length - 1) {
            this.menuItems.first.setFocus();
            return;
          }
          this.menuItems.toArray()[i + 1].setFocus();
        });

      menuItem.escape
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
          this.elementRef.nativeElement.querySelector('.header__login-info-menu').focus();
          this.hideMenu = true;
        });

      menuItem.tab
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
          this.elementRef.nativeElement.querySelector('.header__login-info-menu').focus();
          this.hideMenu = true;
        });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  clickToggleHeaderMenu(event: Event) {
    this.toggleHeaderMenu(event);
  }

  keyToggleHeaderMenu(event: KeyboardEvent) {
    if (this.menuItems.length > 0 && event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      event.preventDefault();
      this.toggleHeaderMenu(event);
      setTimeout(() => {
        this.focusFirstMenuItem();
      }, 100);
    } else if (this.menuItems.length > 0 && event.key === 'Tab' && !this.hideMenu) {
      event.preventDefault();
      this.focusFirstMenuItem();
    } else if (event.key === 'Escape') {
      this.hideMenu = true;
    }
  }

  toggleHeaderMenu(event: MouseEvent | any) {
    this.hideMenu = !this.hideMenu;
    if (!this.hideMenu) {
      event.cancelBubble = true;
    }
  }

  focusFirstMenuItem() {
    this.menuItems.first.setFocus();
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(event: any) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hideMenu = true;
    }
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