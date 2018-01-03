"use strict";
/// <reference path='../../node_modules/@types/jasmine/index.d.ts' />
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/platform-browser-dynamic/testing");
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require("@angular/common");
var testing_3 = require("@angular/router/testing");
var sidebarMenu_component_1 = require("../../component-package/controls/sidebar-menu/sidebarMenu.component");
var menu_component_1 = require("../../component-package/controls/sidebar-menu/menu.component");
var browserDetector_1 = require("../../component-package/services/browserDetector");
var ngx_perfect_scrollbar_1 = require("ngx-perfect-scrollbar");
var MenuCreator = (function () {
    function MenuCreator() {
    }
    MenuCreator.prototype.createMenu = function (numberOfMenus) {
        var allMenus = [];
        for (var i = 1; i <= numberOfMenus; i++) {
            allMenus.push({
                title: "Meny " + i,
                groups: [{
                        menuItems: [{
                                title: "Anv\u00E4ndare" + i,
                                url: "/anvandare" + i,
                                favourite: false,
                                order: '1',
                                menuItems: [
                                    {
                                        title: "Anv\u00E4ndare 1" + i,
                                        url: "/anvandare1" + i,
                                        favourite: false,
                                        order: '1'
                                    },
                                    {
                                        title: "Anv\u00E4ndare 2" + i,
                                        url: "/anvandare2" + i,
                                        favourite: false,
                                        order: '2'
                                    }
                                ]
                            }]
                    }]
            });
        }
        return allMenus;
    };
    return MenuCreator;
}());
exports.MenuCreator = MenuCreator;
describe('SidebarMenuComponent', function () {
    var component;
    var fixture;
    var rootElement;
    var menuCreator = new MenuCreator();
    beforeEach(function (done) {
        testing_1.TestBed.resetTestEnvironment();
        testing_1.TestBed.initTestEnvironment(testing_2.BrowserDynamicTestingModule, testing_2.platformBrowserDynamicTesting());
        testing_1.TestBed.configureTestingModule({
            declarations: [sidebarMenu_component_1.SidebarMenuComponent, menu_component_1.MenuComponent],
            imports: [common_1.CommonModule, testing_3.RouterTestingModule.withRoutes([]), ngx_perfect_scrollbar_1.PerfectScrollbarModule],
            providers: [browserDetector_1.BrowserDetector]
        });
        testing_1.TestBed.overrideComponent(sidebarMenu_component_1.SidebarMenuComponent, {
            set: {
                templateUrl: './sidebarMenu.component.html'
            }
        });
        testing_1.TestBed.overrideComponent(menu_component_1.MenuComponent, {
            set: {
                templateUrl: './menu.component.html'
            }
        });
        testing_1.TestBed.compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(sidebarMenu_component_1.SidebarMenuComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            component.menus = menuCreator.createMenu(1);
            done();
        });
    });
    describe('When one menu', function () {
        beforeEach(function () {
            component.menus = menuCreator.createMenu(1);
            fixture.detectChanges();
        });
        it('sidebar-menu is in single menu mode', function () {
            var sidebarMenuElement = rootElement.query(platform_browser_1.By.css('nav'));
            expect(sidebarMenuElement.classes['sidebar-menu--single-menu']).toBe(true);
        });
        it('menu is set to single menu', function () {
            expect(component.menuComponents.first.isSingleMenu).toBe(true);
        });
    });
    describe('When two menus', function () {
        beforeEach(function () {
            component.menus = menuCreator.createMenu(2);
            fixture.detectChanges();
        });
        it('sidebar-menu is in multiple menu mode', function () {
            var sidebarMenuElement = rootElement.query(platform_browser_1.By.css('nav'));
            expect(sidebarMenuElement.classes['sidebar-menu--single-menu']).toBe(false);
        });
        it('menus are not set to single menu', function () {
            expect(component.menuComponents.filter(function (menuComponent) { return menuComponent.isSingleMenu; }).length).toBe(0);
        });
        describe('and a menu is expanded', function () {
            it('scroll is present', function () {
                component.menuComponents.first.menu.expanded = true;
                fixture.detectChanges();
                component.menuComponents.first.onToggleExpand.emit();
                fixture.detectChanges();
                var scrollFiller = rootElement.queryAll(platform_browser_1.By.css('.scroll-filler'));
                expect(scrollFiller.length).toBe(1);
            });
        });
        describe('and no menu is expanded', function () {
            it('scroll is not present', function () {
                component.menuComponents.forEach(function (menuComponent) { return menuComponent.menu.expanded = false; });
                fixture.detectChanges();
                component.menuComponents.first.onToggleExpand.emit();
                fixture.detectChanges();
                var scrollFiller = rootElement.queryAll(platform_browser_1.By.css('.scroll-filler'));
                expect(scrollFiller.length).toBe(0);
            });
        });
        describe('and a submenu is automatically expanded', function () {
            it('scroll is present', function () {
                component.menuComponents.first.menu.groups[0].menuItems[0].expanded = true;
                fixture.detectChanges();
                component.menuComponents.first.onToggleExpand.emit();
                fixture.detectChanges();
                var scrollFiller = rootElement.queryAll(platform_browser_1.By.css('.scroll-filler'));
                expect(scrollFiller.length).toBe(1);
            });
        });
        describe('and a submenu is expanded by click', function () {
            it('scroll is present', function () {
                fixture.debugElement.query(platform_browser_1.By.css('.menu-item__expander')).parent.triggerEventHandler('click', null);
                fixture.detectChanges();
                var scrollFiller = rootElement.queryAll(platform_browser_1.By.css('.scroll-filler'));
                expect(scrollFiller.length).toBe(1);
            });
        });
    });
});
//# sourceMappingURL=sidebarMenuComponent.angular.spec.js.map