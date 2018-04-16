import { Input, Component, HostBinding, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { MenuItemComponent } from './menu-item.component';
import { MenuItemBase } from './menu-item-base';
import { SubmenuComponent } from './submenu.component';


@Component({
    selector: 'vgr-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent implements AfterContentInit {

    @Input() title: string;
    @HostBinding('class.menu') hasClass = true;
    @ContentChildren(MenuItemBase) menuItems: QueryList<MenuItemBase>;
    @HostBinding('attr.role') role = 'menu';

    get smallerFont(): boolean {
        return this.title && this.title.length > 9;
    }

    constructor() { }

    ngAfterContentInit() {
        this.menuItems.forEach((x, i) => {
            x.home.subscribe(() => this.menuItems.first.setFocus());
            x.end.subscribe(() => this.menuItems.last.setFocus(true));

            x.arrowUp.subscribe(() => {
                if (i === 0) {
                    return;
                }
                this.menuItems.toArray()[i - 1].setFocus(true);
            });
            x.arrowDown.subscribe(() => {
                if (i === this.menuItems.length - 1) {
                    this.menuItems.first.setFocus();
                    return;
                }
                this.menuItems.toArray()[i + 1].setFocus();
            });
        });
    }
}
