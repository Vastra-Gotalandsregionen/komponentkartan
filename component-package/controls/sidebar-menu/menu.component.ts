import { Component, Input, Output, OnChanges, EventEmitter, AfterViewInit } from '@angular/core'
import { IMenu, IMenuGroup, IMenuItem } from '../../models/menu.model';
import { BrowserDetector } from '../../services/browserDetector';

@Component({
    selector: 'vgr-menu',
    moduleId: module.id,
    templateUrl: './menu.component.html',
})

export class MenuComponent implements OnChanges, AfterViewInit {
    @Input() menu: IMenu;
    @Input() isSingleMenu: boolean;
    @Output() onToggleExpand = new EventEmitter();
    @Output() onInitialized = new EventEmitter();
    menuItems: IMenuItem[];
    selectedMenuItem: IMenuItem;
    isInactive: boolean;

    constructor(private browserDetector: BrowserDetector) {
        this.menuItems = [];
    }

    ngAfterViewInit() {
        this.onInitialized.emit();
    }

    ngOnChanges() {
        if (this.menu) {
            if (!this.menuItemsInitialized()) {
                this.intializeMenuItems();
                this.setVisibleItems();
            }
        }
    }

    toggleExpand() {
        if (this.isSingleMenu) {
            return;
        }

        if (this.menuItems.length > 3) {
            this.menu.expanded = !this.menu.expanded;
            if (this.menu.expanded && this.selectedMenuItem && this.selectedMenuItem.child) {
                const parentItem = this.getParentItem(this.selectedMenuItem);
                if (parentItem && !parentItem.expanded) {
                    this.expandMenuItem(parentItem);
                }
            }

            this.setVisibleItems();
            this.onToggleExpand.emit();
        }
    }

    setActiveMenuItem(menuItem: IMenuItem): void {
        if (menuItem.isVirtualFavourite) {
            const selectedMenuItem = this.menuItems.filter(x => x.title === menuItem.title && !x.isVirtualFavourite)[0];

            if (!selectedMenuItem) {
                for (let i = 0; i < this.menuItems.length; i++) {
                    if (this.menuItems[i].menuItems) {
                        this.selectedMenuItem = this.menuItems[i].menuItems
                            .filter(x => x.title === menuItem.title && !x.isVirtualFavourite)[0];

                        if (this.selectedMenuItem) {
                            return;
                        }
                    }
                }
            }
        } else {
            this.selectedMenuItem = menuItem;
        }
    }

    private getParentItem(menuItem: IMenuItem): IMenuItem {
        const parents = this.menuItems.filter(x => x.menuItems && x.menuItems.find(y => y === menuItem));

        if (parents && parents.length === 1) {
            return parents[0];
        }
        return null;
    }


    expandMenuItem(menuItem: IMenuItem) {
        menuItem.expanded = !menuItem.expanded;
        this.setVisibleItems();
        this.onToggleExpand.emit();
    }

    availableInThisBrowser(): boolean {
        if (this.menu.theme === 'Red') {
            return this.browserDetector.isInternetExplorer();
        }
        return true;
    }

    selectedMenuChanged(selectedMenuTitle: string) {
        this.isInactive = this.menu.title !== selectedMenuTitle;

    }

    private menuItemsInitialized(): boolean {
        return this.menuItems && this.menuItems.length > 0;
    }

    private intializeMenuItems() {
        if (this.isSingleMenu) {
            this.menuItems = this.intializeMenuItemsForSingleMenu();
        } else {
            this.menuItems = this.intializeMenuItemsForMultipleMenu();
        }

    }

    private intializeMenuItemsForMultipleMenu(): IMenuItem[] {
        const groupMenuItems = this.getGroupMenuItems();
        if (groupMenuItems.filter(x => !x.isSeparator).length <= 3) {
            groupMenuItems.forEach(x => x.visible = true);
            return groupMenuItems.sort(this.sortMenuItems);
        } else {
            return this.getFavouriteChildItems().concat(groupMenuItems).sort(this.sortMenuItems);
        }
    }

    private intializeMenuItemsForSingleMenu(): IMenuItem[] {
        const singleMenuItems = this.getGroupMenuItems().sort(this.sortMenuItems);
        singleMenuItems.forEach(x => { x.visible = true; });
        return singleMenuItems;

    }

    private setVisibleItems() {
        if (this.isSingleMenu || this.menuItems.filter(x => !x.isSeparator).length <= 3) {
            return;
        }

        if (this.menu.expanded) {
            this.menuItems.forEach(x => { x.visible = !x.isVirtualFavourite || x.isSeparator });
        } else {
            this.setVisibleFavourites(3);
        }
    }

    private setVisibleFavourites(maxNumberOfVisibleFavourites: number) {
        let visibleCount = 0;

        for (let i = 0; i < this.menuItems.length; i++) {
            if (visibleCount >= maxNumberOfVisibleFavourites) {
                this.menuItems[i].visible = false;
            } else {
                if (this.menuItems[i].favourite || this.menuItems[i].isVirtualFavourite) {
                    this.menuItems[i].visible = true;
                    visibleCount++;
                } else {
                    this.menuItems[i].visible = false;
                }
            }
        }
    }

    ///Returns a copy of the favourite child items to be put first in the list
    private getFavouriteChildItems(): IMenuItem[] {
        const flattenedMenuItems = this.flattenMenuItems(this.menu);
        const favouriteItems = flattenedMenuItems.filter(menuItem => menuItem.favourite && menuItem.child).sort(this.sortMenuItems);
        const copyArray = JSON.parse(JSON.stringify(favouriteItems.slice()));

        copyArray.forEach((x: any) => { x.isVirtualFavourite = true; });

        return copyArray;
    }

    private getGroupMenuItems(): IMenuItem[] {
        const sortedGroups = this.menu.groups.sort(this.sortGroups);

        let menuItemsCount = 0;
        this.menu.groups.forEach(groups => menuItemsCount = menuItemsCount + groups.menuItems.length);

        let ungroupedItems = [] as IMenuItem[];
        for (let i = 0; i < sortedGroups.length; i++) {
            ungroupedItems = ungroupedItems.concat(sortedGroups[i].menuItems.sort(this.sortMenuItems));

            // Separator shall not be added in last group or if items is less than 4
            if (i < sortedGroups.length - 1 && menuItemsCount > 3) {
                ungroupedItems.push({ isSeparator: true, order: ungroupedItems[ungroupedItems.length - 1].order + '.1' } as IMenuItem);
            }
        }
        return ungroupedItems;
    }

    private sortMenuItems(a: IMenuItem, b: IMenuItem): number {
        if (a.order > b.order) {
            return 1;
        }
        if (a.order < b.order) {
            return -1;
        }
        return 0;
    }

    private sortGroups(a: IMenuGroup, b: IMenuGroup): number {
        if (a.order > b.order) {
            return 1;
        }
        if (a.order < b.order) {
            return -1;
        }
        return 0;
    }

    private flattenMenuItems(menu: IMenu): IMenuItem[] {
        let flattenedList: IMenuItem[] = [];
        for (let i = 0; i < menu.groups.length; i++) {
            for (let j = 0; j < menu.groups[i].menuItems.length; j++) {
                flattenedList.push(menu.groups[i].menuItems[j]);
                if (menu.groups[i].menuItems[j].menuItems) {
                    let childItems = menu.groups[i].menuItems[j].menuItems;
                    childItems = childItems.sort(this.sortMenuItems);
                    childItems.forEach(x => { x.child = true; });
                    flattenedList = flattenedList.concat(childItems);
                }
            }
        }
        return flattenedList;
    }
}

