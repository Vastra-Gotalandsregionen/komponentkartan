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
    @HostBinding('attr.role') role = 'menu';
    @ContentChildren(MenuItemBase, { descendants: true }) menuItems: QueryList<MenuItemBase>;

    get smallerFont(): boolean {
        return this.title && this.title.length > 9;
    }

    constructor() { }

    ngAfterContentInit() {
        const menuItemArray = this.menuItems.toArray();
        console.log(menuItemArray);
        let currentMenuItem;
        let numberOfSubmenuItems: number = 0;
        menuItemArray.forEach((x, i) => {
            x.goToFirst.subscribe(() => menuItemArray[0].setFocus());

            x.goUp.subscribe(() => {
                if (i === 0) {
                    return;
                }
                menuItemArray[i - 1].setFocus();
            });

            x.goDown.subscribe(() => {

                //if on last menuitem, set focus on first
                if (i === menuItemArray.length - 1) {
                    i = 0;
                    menuItemArray[i].setFocus();
                }

                //om nästa är en menu-item
                currentMenuItem = menuItemArray[i];
                let myRef = currentMenuItem.elementRef;

                if (currentMenuItem instanceof SubmenuComponent) {
                    if (!(<SubmenuComponent>currentMenuItem).expanded) {
                        numberOfSubmenuItems = myRef.nativeElement.getElementsByTagName('vgr-menu-item').length;

                        //if index gets higher than shown items, set focus on first
                        if (i + 1 + numberOfSubmenuItems > menuItemArray.length - 1) {
                            i = 0;
                            menuItemArray[i].setFocus();
                            return;
                        }
                        menuItemArray[i + 1 + numberOfSubmenuItems].setFocus();

                        return;
                    }
                }

                menuItemArray[i + 1].setFocus();
            });
        });
    }
}
