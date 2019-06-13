import { Input, Component, HostBinding, AfterContentInit, ContentChildren, QueryList, OnDestroy } from '@angular/core';
import { MenuItemBase } from './menu-item-base';
import { SubmenuComponent } from './submenu.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'vgr-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent implements AfterContentInit, OnDestroy {
    private ngUnsubscribe = new Subject();

    @Input() title: string;
    @HostBinding('class.menu') hasClass = true;
    @ContentChildren(MenuItemBase) menuItems: QueryList<MenuItemBase>;
    @HostBinding('attr.role') role = 'menu';
    @HostBinding('attr.aria-orientation') orientation = 'vertical';

    get smallerFont(): boolean {
        return this.title && this.title.length > 9;
    }

    constructor() { }

    ngAfterContentInit() {
        this.addSubscriptions();
        this.menuItems.changes.pipe(takeUntil(this.ngUnsubscribe)).subscribe((change) => {
            this.ngUnsubscribe.next();
            this.ngUnsubscribe.complete();
            this.addSubscriptions();
        });

    }

    addSubscriptions() {
        this.menuItems.forEach((x, i) => {
            x.home
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe(() => this.menuItems.first.setFocus());

            x.end
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe(() => this.menuItems.last.setFocus(true));

            x.arrowUp
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


            x.arrowDown
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe(() => {
                    if (i === this.menuItems.length - 1) {
                        this.menuItems.first.setFocus();
                        return;
                    }
                    this.menuItems.toArray()[i + 1].setFocus();
                });

            x.escape
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe(() => {
                    this.menuItems.toArray()[i].showExpanded = false;
                    this.menuItems.toArray()[i].setFocus();
                });
        });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}