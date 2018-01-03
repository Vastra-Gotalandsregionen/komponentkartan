"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var browserDetector_1 = require("../../services/browserDetector");
var MenuComponent = (function () {
    function MenuComponent(browserDetector) {
        this.browserDetector = browserDetector;
        this.onToggleExpand = new core_1.EventEmitter();
        this.onInitialized = new core_1.EventEmitter();
        this.menuItems = [];
    }
    MenuComponent.prototype.ngAfterViewInit = function () {
        this.onInitialized.emit();
    };
    MenuComponent.prototype.ngOnChanges = function () {
        if (this.menu) {
            if (!this.menuItemsInitialized()) {
                this.intializeMenuItems();
                this.setVisibleItems();
            }
        }
    };
    MenuComponent.prototype.toggleExpand = function () {
        if (this.isSingleMenu) {
            return;
        }
        if (this.menuItems.length > 3) {
            this.menu.expanded = !this.menu.expanded;
            if (this.menu.expanded && this.selectedMenuItem && this.selectedMenuItem.child) {
                var parentItem = this.getParentItem(this.selectedMenuItem);
                if (parentItem && !parentItem.expanded) {
                    this.expandMenuItem(parentItem);
                }
            }
            this.setVisibleItems();
            this.onToggleExpand.emit();
        }
    };
    MenuComponent.prototype.setActiveMenuItem = function (menuItem) {
        if (menuItem.isVirtualFavourite) {
            var selectedMenuItem = this.menuItems.filter(function (x) { return x.title === menuItem.title && !x.isVirtualFavourite; })[0];
            if (!selectedMenuItem) {
                for (var i = 0; i < this.menuItems.length; i++) {
                    if (this.menuItems[i].menuItems) {
                        this.selectedMenuItem = this.menuItems[i].menuItems
                            .filter(function (x) { return x.title === menuItem.title && !x.isVirtualFavourite; })[0];
                        if (this.selectedMenuItem) {
                            return;
                        }
                    }
                }
            }
        }
        else {
            this.selectedMenuItem = menuItem;
        }
    };
    MenuComponent.prototype.getParentItem = function (menuItem) {
        var parents = this.menuItems.filter(function (x) { return x.menuItems && x.menuItems.find(function (y) { return y === menuItem; }); });
        if (parents && parents.length === 1) {
            return parents[0];
        }
        return null;
    };
    MenuComponent.prototype.expandMenuItem = function (menuItem) {
        menuItem.expanded = !menuItem.expanded;
        this.setVisibleItems();
        this.onToggleExpand.emit();
    };
    MenuComponent.prototype.availableInThisBrowser = function () {
        if (this.menu.theme === 'Red') {
            return this.browserDetector.isInternetExplorer();
        }
        return true;
    };
    MenuComponent.prototype.selectedMenuChanged = function (selectedMenuTitle) {
        this.isInactive = this.menu.title !== selectedMenuTitle;
    };
    MenuComponent.prototype.menuItemsInitialized = function () {
        return this.menuItems && this.menuItems.length > 0;
    };
    MenuComponent.prototype.intializeMenuItems = function () {
        if (this.isSingleMenu) {
            this.menuItems = this.intializeMenuItemsForSingleMenu();
        }
        else {
            this.menuItems = this.intializeMenuItemsForMultipleMenu();
        }
    };
    MenuComponent.prototype.intializeMenuItemsForMultipleMenu = function () {
        var groupMenuItems = this.getGroupMenuItems();
        if (groupMenuItems.filter(function (x) { return !x.isSeparator; }).length <= 3) {
            groupMenuItems.forEach(function (x) { return x.visible = true; });
            return groupMenuItems.sort(this.sortMenuItems);
        }
        else {
            return this.getFavouriteChildItems().concat(groupMenuItems).sort(this.sortMenuItems);
        }
    };
    MenuComponent.prototype.intializeMenuItemsForSingleMenu = function () {
        var singleMenuItems = this.getGroupMenuItems().sort(this.sortMenuItems);
        singleMenuItems.forEach(function (x) { x.visible = true; });
        return singleMenuItems;
    };
    MenuComponent.prototype.setVisibleItems = function () {
        if (this.isSingleMenu || this.menuItems.filter(function (x) { return !x.isSeparator; }).length <= 3) {
            return;
        }
        if (this.menu.expanded) {
            this.menuItems.forEach(function (x) { x.visible = !x.isVirtualFavourite || x.isSeparator; });
        }
        else {
            this.setVisibleFavourites(3);
        }
    };
    MenuComponent.prototype.setVisibleFavourites = function (maxNumberOfVisibleFavourites) {
        var visibleCount = 0;
        for (var i = 0; i < this.menuItems.length; i++) {
            if (visibleCount >= maxNumberOfVisibleFavourites) {
                this.menuItems[i].visible = false;
            }
            else {
                if (this.menuItems[i].favourite || this.menuItems[i].isVirtualFavourite) {
                    this.menuItems[i].visible = true;
                    visibleCount++;
                }
                else {
                    this.menuItems[i].visible = false;
                }
            }
        }
    };
    ///Returns a copy of the favourite child items to be put first in the list
    MenuComponent.prototype.getFavouriteChildItems = function () {
        var flattenedMenuItems = this.flattenMenuItems(this.menu);
        var favouriteItems = flattenedMenuItems.filter(function (menuItem) { return menuItem.favourite && menuItem.child; }).sort(this.sortMenuItems);
        var copyArray = JSON.parse(JSON.stringify(favouriteItems.slice()));
        copyArray.forEach(function (x) { x.isVirtualFavourite = true; });
        return copyArray;
    };
    MenuComponent.prototype.getGroupMenuItems = function () {
        var sortedGroups = this.menu.groups.sort(this.sortGroups);
        var menuItemsCount = 0;
        this.menu.groups.forEach(function (groups) { return menuItemsCount = menuItemsCount + groups.menuItems.length; });
        var ungroupedItems = [];
        for (var i = 0; i < sortedGroups.length; i++) {
            ungroupedItems = ungroupedItems.concat(sortedGroups[i].menuItems.sort(this.sortMenuItems));
            // Separator shall not be added in last group or if items is less than 4
            if (i < sortedGroups.length - 1 && menuItemsCount > 3) {
                ungroupedItems.push({ isSeparator: true, order: ungroupedItems[ungroupedItems.length - 1].order + '.1' });
            }
        }
        return ungroupedItems;
    };
    MenuComponent.prototype.sortMenuItems = function (a, b) {
        if (a.order > b.order) {
            return 1;
        }
        if (a.order < b.order) {
            return -1;
        }
        return 0;
    };
    MenuComponent.prototype.sortGroups = function (a, b) {
        if (a.order > b.order) {
            return 1;
        }
        if (a.order < b.order) {
            return -1;
        }
        return 0;
    };
    MenuComponent.prototype.flattenMenuItems = function (menu) {
        var flattenedList = [];
        for (var i = 0; i < menu.groups.length; i++) {
            for (var j = 0; j < menu.groups[i].menuItems.length; j++) {
                flattenedList.push(menu.groups[i].menuItems[j]);
                if (menu.groups[i].menuItems[j].menuItems) {
                    var childItems = menu.groups[i].menuItems[j].menuItems;
                    childItems = childItems.sort(this.sortMenuItems);
                    childItems.forEach(function (x) { x.child = true; });
                    flattenedList = flattenedList.concat(childItems);
                }
            }
        }
        return flattenedList;
    };
    return MenuComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MenuComponent.prototype, "menu", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MenuComponent.prototype, "isSingleMenu", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MenuComponent.prototype, "onToggleExpand", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MenuComponent.prototype, "onInitialized", void 0);
MenuComponent = __decorate([
    core_1.Component({
        selector: 'vgr-menu',
        moduleId: module.id,
        templateUrl: './menu.component.html',
    }),
    __metadata("design:paramtypes", [browserDetector_1.BrowserDetector])
], MenuComponent);
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map