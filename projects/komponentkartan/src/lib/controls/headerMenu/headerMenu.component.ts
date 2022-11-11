import { Component, Input, ElementRef, HostListener, ContentChildren, QueryList, SimpleChanges, OnChanges, AfterContentInit, OnDestroy, Renderer2, ViewChild, ContentChild } from '@angular/core';
import { MenuItemBaseDirective } from '../menu/menu-item-base';
import { SubmenuComponent } from '../menu/submenu.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MenuItemComponent } from '../menu/menu-item.component';

@Component({
  selector: 'vgr-header-menu',
  templateUrl: './headerMenu.component.html',
  styleUrls: ['./headerMenu.component.scss']
})

export class HeaderMenuComponent implements AfterContentInit, OnDestroy, OnChanges {
  private ngUnsubscribe: any = new Subject();

  @ContentChildren(MenuItemBaseDirective) menuItems: QueryList<MenuItemBaseDirective>;
  @Input() userName: string;
  @Input() initials: string;
  @Input() textColor: string;
  @Input() circleColor: string;
  internalInitials: string;
  hideMenu = true;

  constructor(private elementRef: ElementRef) {
  }

  // @HostListener('document:click', ['$event'])
  // onDocumentClick(event: any) {

  //   const target = event.target || event.srcElement || event.currentTarget;

  //   if ((this.elementRef.nativeElement && !this.elementRef.nativeElement.contains(target)) && this.expanded) {
  //     this.onChange(null);
  //     this.collapse(false);
  //   }
  // }

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
          this.hideMenu = true;
        });

      menuItem.enter
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        console.log('hello')
        this.closeMenuOnClick(event, this.menuItems.map(x => x as MenuItemComponent))
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

  closeMenuOnClick(event, menuItems: MenuItemComponent[]) {
    console.log(event)
    if (!( event instanceof KeyboardEvent) && ( event.key === 'Spacebar' || event.key === 'Enter')) {
      return
    }

    const focusedNode = event.target as HTMLElement;
        menuItems.forEach((menuitem) => {
          if (menuitem instanceof SubmenuComponent) {
            let subMenuItem : SubmenuComponent = menuitem;
            let menuClicked = subMenuItem.menuItems.filter((x) => x.text === focusedNode.innerText)[0];
            if (menuClicked) {
              this.hideMenu = true;
            }
          } else if (menuitem.text === focusedNode.innerText) {
              if (!(menuitem instanceof SubmenuComponent)) {
                this.hideMenu = true;
              } else {
                this.hideMenu = false;
              }
            }
        })





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
      event.stopPropagation();
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

  @HostListener('document:keydown', ['$event'])
  onDocumentKeyPressed(event: any) {
    console.log('header-menu: ', event)
    if (event.key === 'Spacebar' || event.key === 'Enter') {
      console.log('key pressed on ', event)
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.hideMenu = true;
      }
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
