import { Input, Component, DoCheck, ElementRef, HostBinding, AfterViewInit, Renderer, forwardRef, HostListener, ContentChildren, QueryList, AfterContentInit, AnimationTransitionEvent, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuItemBase } from './menu-item-base';
import { trigger, style, transition, animate, group, state, query } from '@angular/animations';
import { MenuItemComponent } from '../..';

@Component({
    selector: 'vgr-submenu',
    templateUrl: './submenu.component.html',
    providers: [{ provide: MenuItemBase, useExisting: forwardRef(() => SubmenuComponent) }],
    animations: [
        trigger('toggleSubMenu', [
            state('void', style({
                height: '0'
            })),
            state('collapsed', style({
                height: '0'
            })),
            state('expanded', style({
                height: '*'
            })),
            transition('* => expanded', [animate('600ms  ease-in')]),
            transition('expanded => collapsed', [animate('600ms ease-out')])
        ])
    ]
})

export class SubmenuComponent extends MenuItemBase implements AfterContentInit, OnInit {
    @Input() text: string;
    @Input() expanded = false;
    private _showExpanded: boolean;
    state: string;
    @HostBinding('attr.aria-haspopup') hasAriaPopup = true;
    @HostBinding('attr.role') role = 'menuitem';

    @ContentChildren(MenuItemBase) menuItems: QueryList<MenuItemBase>;
    @HostBinding('class.submenu') hasClass = true;
    @HostBinding('class.submenu--child-selected') private childSelected: boolean;

    @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {

        if (event.keyCode === 9) { // Tab
            return;
        }

        if (event.keyCode === 13 || event.keyCode === 32) { // Enter, Space
            this.showExpanded = !this.showExpanded;
            // SetFocus after the animation is completed.
            setTimeout(() => {
                if (this.showExpanded) {
                    this.menuItems.toArray()[1].setFocus();
                } else {
                    this.setFocus();
                }
            }, 650);
        }
        if (event.keyCode === 36) { // Home
            this.home.emit();
        }
        if (event.keyCode === 35) { // End
            this.end.emit();
        }
        if (event.keyCode === 40) { // Arrow Down
            if (this.expanded) {
                this.menuItems.toArray()[1].setFocus();
            } else {
                this.arrowDown.emit();
            }
        }
        if (event.keyCode === 38) { // Arrow Up
            this.arrowUp.emit();
        }
        if (event.keyCode === 27) { // Escape
            this.showExpanded = false;
        }

        event.cancelBubble = true;
        event.preventDefault();
    }

    get showExpanded() {
        return this._showExpanded;
    }

    set showExpanded(show: boolean) {
        if (show) {
            this._showExpanded = true;
            this.expanded = true;
            this.state = 'expanded';
        } else {
            this.state = 'collapsed';
        }
    }

    constructor(private router: Router, elementRef: ElementRef, renderer: Renderer) {
        super(elementRef, renderer);
    }

    animationDone(event: AnimationTransitionEvent) {
        if (event.fromState === 'expanded' && event.toState === 'collapsed') {

            this._showExpanded = false;
            this.expanded = false;
        }
    }
    setFocus(handle: boolean = false) {
        if (handle && this.expanded) {
            this.menuItems.last.setFocus();
        } else {
            super.setFocus();
        }
    }

    ngOnInit() {
        this._showExpanded = this.expanded;

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.setChildSelected(event);
            }
        });

        this.childSelected = !!this.elementRef.nativeElement.querySelector('.menu__item--selected');
    }

    ngAfterContentInit() {
        const menuItemArray = this.menuItems.toArray();
        menuItemArray.splice(0, 1);
        menuItemArray.forEach((x, i) => {
            x.home.subscribe(() => {
                this.home.emit();
            });
            x.end.subscribe(() => {
                this.end.emit();
            });
            x.arrowUp.subscribe(() => {
                if (i === 0) {
                    this.setFocus();
                    return;
                }
                menuItemArray[i - 1].setFocus();
            });
            x.arrowDown.subscribe(() => {
                if (i === menuItemArray.length - 1) {
                    this.arrowDown.emit();
                    return;
                }
                menuItemArray[i + 1].setFocus();
            });
            x.escape.subscribe(() => {
                this.setFocus();
                this.showExpanded = false;
            });
        });
    }

    private setChildSelected(event: NavigationEnd) {
        const itemArray = this.menuItems.toArray();
        itemArray.splice(0, 1);
        const menuItemArray = <MenuItemComponent[]>itemArray;
        const matches = menuItemArray.filter(m => m.link === event.url);

        if (matches.length === 1) {
            this.showExpanded = true;
            // SetFocus after the animation is completed.
            setTimeout(() => {
                this.childSelected = this.childSelected = !!this.elementRef.nativeElement.querySelector('.menu__item--selected');
                matches[0].setFocus();
            }, 650);
        } else {
            this.childSelected = false;
        }
    }
}
