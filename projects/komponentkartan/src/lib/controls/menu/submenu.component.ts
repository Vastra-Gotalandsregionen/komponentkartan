import { Input, Component, ElementRef, HostBinding, forwardRef, HostListener, ContentChildren, QueryList, AfterContentInit, OnInit, Renderer, ViewChild, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuItemBase } from './menu-item-base';
import { trigger, style, transition, animate, state } from '@angular/animations';
import { MenuItemComponent } from '../..';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

export class SubmenuComponent extends MenuItemBase implements AfterContentInit, OnInit, OnDestroy {
    @Input() text: string;
    private _showExpanded: boolean;
    private ngUnsubscribe = new Subject();
    state: string;

    @HostBinding('attr.aria-haspopup') hasAriaPopup = 'menu';
    @HostBinding('attr.role') role = 'menuitem';
    @HostBinding('attr.aria-expanded') expanded = false;

    @ContentChildren(MenuItemBase) menuItems: QueryList<MenuItemBase>;
    @HostBinding('class.submenu') hasClass = true;
    @HostBinding('class.submenu--child-selected') childSelected: boolean;
    @ViewChild('menuitem') menuitem: ElementRef;

    @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {

        if (event.key === 'Tab') { // Tab
            this.tab.emit();
        }

        if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
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
        if (event.key === 'Home') {
            this.home.emit();
        }
        if (event.key === 'End') {
            this.end.emit();
        }
        if (event.key === 'ArrowDown' || event.key === 'Down') {
            if (this.expanded) {
                this.menuItems.toArray()[1].setFocus();
            } else {
                this.arrowDown.emit();
            }
        }
        if (event.key === 'ArrowUp' || event.key === 'Up') {
            this.arrowUp.emit();
        }
        if (event.key === 'Escape' || event.key === 'Esc') {
            this.escape.emit();
        }
        if ([' ', 'Spacebar', 'Enter', 'Home', 'End', 'ArrowDown', 'Down', 'ArrowUp', 'Up', 'Escape', 'Esc', ].indexOf(event.key) > -1) {
            event.stopPropagation();
            event.preventDefault();
        }
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

    constructor(private router: Router, private elementRef: ElementRef, private renderer: Renderer) {
        super();
    }

    animationDone(event: any) {
        if (event.fromState === 'expanded' && event.toState === 'collapsed') {

            this._showExpanded = false;
            this.expanded = false;
        }
    }
    setFocus(handle: boolean = false) {
        if (handle && this.expanded) {
            this.menuItems.last.setFocus();
        } else {
            this.renderer.invokeElementMethod(this.menuitem.nativeElement, 'focus');
        }
    }

    ngOnInit() {
        this._showExpanded = this.expanded;

        this.router.events
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    this.setChildSelected(event);
                }
            });

        this.childSelected = !!this.elementRef.nativeElement.querySelector('.menu__item--selected');
    }

    ngAfterContentInit() {
        this.addSubscriptions();
        this.menuItems.changes.pipe(takeUntil(this.ngUnsubscribe)).subscribe((change) => {
            this.ngUnsubscribe.next();
            this.ngUnsubscribe.complete();
            this.addSubscriptions();
        });
    }

    addSubscriptions() {
        const menuItemArray = this.menuItems.toArray();
        menuItemArray.splice(0, 1);
        menuItemArray.forEach((x, i) => {
            x.home
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe(() => {
                    this.home.emit();
                });
            x.end
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe(() => {
                    this.end.emit();
                });
            x.arrowUp
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe(() => {
                    if (i === 0) {
                        this.setFocus();
                        return;
                    }
                    menuItemArray[i - 1].setFocus();
                });
            x.arrowDown
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe(() => {
                    if (i === menuItemArray.length - 1) {
                        this.arrowDown.emit();
                        return;
                    }
                    menuItemArray[i + 1].setFocus();
                });
            x.escape
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe(() => {
                    this.escape.emit();
                });
            x.tab
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe((event) => {
                    this.tab.emit(event);
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

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
