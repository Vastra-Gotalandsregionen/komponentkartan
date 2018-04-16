import { Input, Component, DoCheck, ElementRef, HostBinding, AfterViewInit, Renderer, forwardRef, HostListener, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuItemBase } from './menu-item-base';


@Component({
    selector: 'vgr-submenu',
    templateUrl: './submenu.component.html',
    providers: [{ provide: MenuItemBase, useExisting: forwardRef(() => SubmenuComponent) }]
})
export class SubmenuComponent extends MenuItemBase implements AfterViewInit, AfterContentInit {

    @Input() text: string;
    @Input() expanded: boolean;
    @HostBinding('attr.aria-haspopup') hasAriaPopup = true;

    @ContentChildren(MenuItemBase) menuItems: QueryList<MenuItemBase>;
    @HostBinding('class.submenu') hasClass = true;
    @HostBinding('class.submenu--expanded') get expandedClass() {
        return this.expanded;
    }
    @HostBinding('class.submenu--child-selected') private childSelected: boolean;

    @HostListener('keyup', ['$event']) onKeyUp(event: KeyboardEvent) {
        if (event.keyCode === 13 || event.keyCode === 32) { // enter & space - navigera
            this.expanded = !this.expanded;
            if (this.expanded) {
                this.menuItems.toArray()[1].setFocus();
            }
            event.cancelBubble = true;
            event.preventDefault();
        }

        if (event.keyCode === 40) { // Arrow Down
            if (this.expanded) {
                this.menuItems.toArray()[1].setFocus();
            } else {
                this.goDown.emit();
            }
            event.cancelBubble = true;
            event.preventDefault();
        }

        if (event.keyCode === 38) { // Arrow Up
            this.goUp.emit();
            event.cancelBubble = true;
            event.preventDefault();
        }
    }

    constructor(private router: Router, elementRef: ElementRef, renderer: Renderer) {
        super(elementRef, renderer);
    }

    setFocus(movingUp: boolean = false) {
        if (movingUp && this.expanded) {
            this.menuItems.last.setFocus();
        } else {
            super.setFocus();
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.setChildSelected();

        }, 10);

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                setTimeout(() => {
                    this.setChildSelected();
                }, 100);
            }
        });
    }

    ngAfterContentInit() {
        const menuItemArray = this.menuItems.toArray();
        menuItemArray.splice(0, 1);
        menuItemArray.forEach((x, i) => {
            x.goToFirst.subscribe(() => menuItemArray[0].setFocus());

            x.goUp.subscribe(() => {
                if (i === 0) {
                    this.setFocus();
                    return;
                }

                menuItemArray[i - 1].setFocus();
            });

            x.goDown.subscribe(() => {
                if (i === menuItemArray.length - 1) {
                    this.goDown.emit();
                    return;
                }

                menuItemArray[i + 1].setFocus();

            });
        });
    }

    private setChildSelected() {
        this.childSelected = !!this.elementRef.nativeElement.querySelector('.menu__item--selected');
        if (this.childSelected) {
            this.expanded = true;
        }
    }


}
