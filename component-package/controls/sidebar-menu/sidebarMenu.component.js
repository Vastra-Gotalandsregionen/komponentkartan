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
var menu_component_1 = require("./menu.component");
var router_1 = require("@angular/router");
var browserDetector_1 = require("../../services/browserDetector");
var scrollbarStyle = "\n\n:host /deep/ .ps {\n    -ms-touch-action: auto;\n    touch-action: auto;\n    overflow: hidden !important;\n    -ms-overflow-style: none;\n}\n\n:host /deep/ .ps.ps--active-y>.ps__scrollbar-y-rail {\n    display: block;\n    background-color: transparent;\n}\n\n:host /deep/ .ps.ps--in-scrolling.ps--y>.ps__scrollbar-y-rail {\n    background-color: transparent !important;\n    opacity: .9;\n}\n\n:host /deep/ .ps.ps--in-scrolling.ps--y>.ps__scrollbar-y-rail>.ps__scrollbar-y {\n    background-color: transparent !important;\n    width: 11px;\n}\n\n\n\n:host /deep/ .ps>.ps__scrollbar-y-rail {\n    display: none;\n    position: absolute;\n    opacity: 0;\n    -webkit-transition: background-color .2s linear, opacity .2s linear;\n    -o-transition: background-color .2s linear, opacity .2s linear;\n    -moz-transition: background-color .2s linear, opacity .2s linear;\n    transition: background-color .2s linear, opacity .2s linear;\n    right: 0;\n    width: 11px;\n}\n\n:host /deep/ .ps>.ps__scrollbar-y-rail>.ps__scrollbar-y {\n    position: absolute;\n    background-color: #aaa;\n    -webkit-border-radius: 6px;\n    -moz-border-radius: 6px;\n    border-radius: 6px;\n    -webkit-transition: background-color .2s linear, height .2s linear, width .2s ease-in-out, -webkit-border-radius .2s ease-in-out;\n    transition: background-color .2s linear, height .2s linear, width .2s ease-in-out, -webkit-border-radius .2s ease-in-out;\n    -o-transition: background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out;\n    -moz-transition: background-color .2s linear, height .2s linear,\n    width .2s ease-in-out, border-radius .2s ease-in-out, -moz-border-radius .2s ease-in-out;\n    transition: background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out;\n    transition: background-color .2s linear, height .2s linear,\n    width .2s ease-in-out, border-radius .2s ease-in-out, -webkit-border-radius .2s ease-in-out, -moz-border-radius .2s ease-in-out;\n    right: 2px;\n    width: 8px;\n}\n\n:host /deep/ .ps>.ps__scrollbar-y-rail:hover>.ps__scrollbar-y,\n:host /deep/ .ps>.ps__scrollbar-y-rail:active>.ps__scrollbar-y {\n    width: 8px;\n}\n\n:host /deep/ .ps:hover.ps--in-scrolling.ps--y>.ps__scrollbar-y-rail {\n    background-color: transparent;\n    opacity: .9;\n}\n\n:host /deep/ .ps:hover.ps--in-scrolling.ps--y>.ps__scrollbar-y-rail>.ps__scrollbar-y {\n    width: 8px;\n}\n\n:host /deep/ .ps:hover>.ps__scrollbar-y-rail {\n    opacity: .6;\n}\n\n\n:host /deep/ .ps:hover>.ps__scrollbar-y-rail:hover {\n    background-color: transparent;\n    opacity: .9;\n}\n\n:host /deep/ .ps:hover>.ps__scrollbar-y-rail:hover>.ps__scrollbar-y {\n    background-color: #999;\n}\n\n:host /deep/ .ps.ps--active-y>.ps__scrollbar-y-rail>.ps__scrollbar-y {\n    background-color: #999;\n}\n\n:host /deep/ .ps.ps--in-scrolling.ps--y>.ps__scrollbar-y-rail>.ps__scrollbar-y {\n    background-color: #999;\n}\n\n\n:host /deep/ .ps {\n    position: relative;\n    display: block;\n}\n\n:host /deep/ .ps[hidden] {\n    display: none;\n}\n\n:host /deep/ .ps[fxlayout]>.ps-content {\n    display: flex;\n    -webkit-box-flex: 1;\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n}\n\n:host /deep/ .ps.ps-static {\n    position: static;\n}\n\n:host /deep/ .ps.ps-static>.ps__scrollbar-y-rail {\n    top: 0 !important;\n}\n\n:host /deep/ .ps.ps-outside.ps--active-y {\n    padding-right: 24px;\n    margin-right: -24px;\n}\n\n:host /deep/ .ps.ps-outside>.ps__scrollbar-x-rail {\n    margin: 0 8px;\n}\n\n:host /deep/ .ps.ps-outside>.ps__scrollbar-y-rail {\n    margin: 8px 0;\n}";
var SidebarMenuComponent = (function () {
    function SidebarMenuComponent(activatedRoute, router, changeDetectorRef, browserDetector) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.changeDetectorRef = changeDetectorRef;
        this.browserDetector = browserDetector;
        this.selectedMenuChanged = new core_1.EventEmitter();
        this.initializedMenuCount = 0;
    }
    SidebarMenuComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.router.events.forEach(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                var url_1 = event.url;
                setTimeout(function () {
                    var newSelectedMenu = _this.getSelectedMenu();
                    if (newSelectedMenu.length === 0) {
                        // User has selected something from outside of the menu, from the drop-down perhaps.
                        _this.selectedMenuChanged.emit('neutral');
                        _this.selectedMenu = undefined;
                    }
                    else {
                        var newSelectedMenuComponent_1 = _this.getMenuComponent(newSelectedMenu);
                        if (newSelectedMenuComponent_1 !== null) {
                            _this.selectedMenuChanged.emit(newSelectedMenuComponent_1.menu.title);
                            _this.menuComponents.forEach(function (x) { return x.selectedMenuChanged(newSelectedMenuComponent_1.menu.title); });
                            // Expand menu automatically when selected
                            if (!newSelectedMenuComponent_1.menu.expanded) {
                                newSelectedMenuComponent_1.toggleExpand();
                                newSelectedMenuComponent_1.menuItems.forEach(function (menuItem) {
                                    if (menuItem.menuItems) {
                                        var selectedChildren = menuItem.menuItems.filter(function (x) { return x.url === url_1; });
                                        if (selectedChildren.length > 0) {
                                            menuItem.expanded = true;
                                        }
                                    }
                                });
                            }
                        }
                        // Don't scroll if the selected menu has not changed
                        if (!newSelectedMenu.is(_this.selectedMenu)) {
                            _this.scrollToMenu(newSelectedMenu);
                        }
                        _this.selectedMenu = newSelectedMenu;
                    }
                    _this.markParentOfSelectedChild();
                }, 200);
            }
        });
        this.changeDetectorRef.detectChanges();
        setTimeout(function () { _this.setupJQuery(); }, 1000);
    };
    SidebarMenuComponent.prototype.setupJQuery = function () {
        // Menu-item-marker
        $('.menu__item-list > li').not('.menu__footer').hover(function () {
            if (!$(this).hasClass('menu__expander')) {
                $('.menu-item--selected').removeClass('menu-item--marked');
            }
        }, function () {
            $('.menu-item--selected').addClass('menu-item--marked');
        });
        $('.menu__subItems-list > li').hover(function () {
            if (!$(this).hasClass('menu__expander')) {
                $('.menu-item--selected').removeClass('menu-item--marked');
            }
        }, function () {
            $('.menu-item--selected').addClass('menu-item--marked');
        });
        $('.menu').hover(function () {
            $('.menu').addClass('menu--not-hovered');
            $(this).closest('.menu').addClass('menu--hovered');
            $(this).closest('.menu').removeClass('menu--not-hovered');
        }, function () {
            $('.menu').removeClass('menu--not-hovered');
            $(this).closest('.menu').removeClass('menu--hovered');
        });
    };
    SidebarMenuComponent.prototype.markParentOfSelectedChild = function () {
        // First remove all child-selected instances
        $('.menu-item--parent').removeClass('menu-item--child-selected');
        // Then add the child-selected class to the currently selected child's (<LI>) Parent's(<UL>)
        // Previous Sibling (<LI>) with the class .menu-item--parent.
        $('.menu-item--child.menu-item--selected').parent().prev('.menu-item--parent').addClass('menu-item--child-selected');
    };
    SidebarMenuComponent.prototype.getSelectedMenu = function () {
        return $('.menu-item--selected').closest('.menu');
    };
    SidebarMenuComponent.prototype.getMenuComponent = function (menu) {
        var selectedTitle = menu.find('.menu__header__title').first().text();
        var matchingComponents = this.menuComponents.filter(function (x) { return x.menu.title === selectedTitle; });
        if (matchingComponents.length === 1) {
            return matchingComponents[0];
        }
        return null;
    };
    SidebarMenuComponent.prototype.scrollToMenu = function (newSelectedMenu) {
        // Calculate scrolling height by adding the heights of all menus above the selected one
        var totalHeight = 0;
        newSelectedMenu.closest('vgr-menu').prevAll('vgr-menu').each(function () { totalHeight += $(this).children('.menu').height(); });
        var newScrollTopValue = totalHeight > 0 ? totalHeight - 50 : 0;
        if (!this.browserDetector.isInternetExplorer()) {
            $('perfect-scrollbar').animate({ scrollTop: newScrollTopValue }, 900);
        }
    };
    SidebarMenuComponent.prototype.onAnyMenuExpanded = function () {
        this.anyMenuExpanded = this.menus && (this.menus.filter(function (x) { return x.expanded; }).length > 0 || this.anySubmenuExpanded());
        setTimeout(this.markParentOfSelectedChild, 200);
    };
    SidebarMenuComponent.prototype.anySubmenuExpanded = function () {
        for (var i = 0; i < this.menus.length; i++) {
            for (var j = 0; j < this.menus[i].groups.length; j++) {
                for (var k = 0; k < this.menus[i].groups[j].menuItems.length; k++) {
                    if (this.menus[i].groups[j].menuItems[k].expanded) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    return SidebarMenuComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], SidebarMenuComponent.prototype, "menus", void 0);
__decorate([
    core_1.ViewChildren(menu_component_1.MenuComponent),
    __metadata("design:type", core_1.QueryList)
], SidebarMenuComponent.prototype, "menuComponents", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SidebarMenuComponent.prototype, "selectedMenuChanged", void 0);
SidebarMenuComponent = __decorate([
    core_1.Component({
        selector: 'vgr-sidebar-menu',
        moduleId: module.id,
        templateUrl: './sidebarMenu.component.html',
        styles: [scrollbarStyle],
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, core_1.ChangeDetectorRef,
        browserDetector_1.BrowserDetector])
], SidebarMenuComponent);
exports.SidebarMenuComponent = SidebarMenuComponent;
//# sourceMappingURL=sidebarMenu.component.js.map