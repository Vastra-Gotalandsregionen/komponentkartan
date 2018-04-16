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
        const menuItemArray = this.menuItems.toArray();
        menuItemArray.forEach((x, i) => {
            x.goToFirst.subscribe(() => menuItemArray[0].setFocus());

            x.goUp.subscribe(() => {
                if (i === 0) {
                    return;
                }

                menuItemArray[i - 1].setFocus(true);
            });

            x.goDown.subscribe(() => {
                if (i === menuItemArray.length - 1) {
                    i = 0;
                    menuItemArray[i].setFocus();
                    return;
                }

                menuItemArray[i + 1].setFocus();

            });
        });
    }
}
