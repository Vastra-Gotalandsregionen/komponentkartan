"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/platform-browser-dynamic/testing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var testing_3 = require("@angular/router/testing");
var headerMenu_component_1 = require("../../component-package/controls/headerMenu/headerMenu.component");
describe('HeaderMenuComponent', function () {
    var component;
    var fixture;
    var rootElement;
    beforeEach(function (done) {
        testing_1.TestBed.resetTestEnvironment();
        testing_1.TestBed.initTestEnvironment(testing_2.BrowserDynamicTestingModule, testing_2.platformBrowserDynamicTesting());
        testing_1.TestBed.configureTestingModule({
            declarations: [headerMenu_component_1.HeaderMenuComponent],
            imports: [common_1.CommonModule, forms_1.FormsModule, testing_3.RouterTestingModule.withRoutes([])]
        });
        testing_1.TestBed.compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(headerMenu_component_1.HeaderMenuComponent);
            component = fixture.componentInstance;
            component.menu = {
                menuItems: [
                    {
                        displayName: 'Min sida',
                        url: '/minsida',
                        isInternalLink: true
                    },
                    {
                        isSeparator: true
                    },
                    {
                        displayName: 'Krav- och kvalitetsbok',
                        menuItems: [
                            {
                                displayName: 'VGPV',
                                url: "http://www.vgregion.se/halsa-och-vard/vardgivarwebben/uppdrag-och-avtal/vardval-vg-primarvard/krav--och-kvalitetsbok-vg-primarvard/",
                                isInternalLink: false
                            },
                            {
                                displayName: 'Rehab',
                                url: 'http://www.vgregion.se/halsa-och-vard/vardgivarwebben/uppdrag-och-avtal/vardval-rehab/krav--och-kvalitetsbok/',
                                isInternalLink: false
                            }
                        ]
                    },
                    {
                        displayName: 'FAQ',
                        menuItems: [
                            {
                                displayName: 'VGPV',
                                url: 'http://www.vgregion.se/sv/Vastra-Gotalandsregionen/startsida/Vard-och-halsa/Forvardgivare/VG-Primarvard1/Fragor-och-svar/',
                                isInternalLink: false
                            },
                            {
                                displayName: 'Rehab',
                                url: 'http://www.vgregion.se/halsa-och-vard/vardgivarwebben/uppdrag-och-avtal/vardval-rehab/fragor-och-svar/',
                                isInternalLink: false
                            }
                        ]
                    },
                    {
                        displayName: 'Kontakt',
                        url: 'http://www.vgregion.se/halsa-och-vard/vardgivarwebben/it/it-system/it-stod-for-vardval-rehab/kontaktpersoner/',
                        isInternalLink: false
                    }
                ]
            };
            rootElement = fixture.debugElement;
            fixture.detectChanges();
            done();
        });
    });
    describe('When component is initialized', function () {
        var headerMenuElement;
        beforeEach(function () {
            headerMenuElement = rootElement.query(platform_browser_1.By.css('.header-menu'));
        });
        it('headerMenu is not visible', function () {
            expect(headerMenuElement.classes['header-menu--hidden']).toBe(true);
        });
        describe('and toggleHeaderMenu is called ', function () {
            var mockEvent;
            beforeEach(function () {
                mockEvent = new Event('');
                component.toggleHeaderMenu(mockEvent);
                fixture.detectChanges();
            });
            it('headerMenu should be visible', function () {
                expect(headerMenuElement.classes['header-menu--hidden']).toBe(false);
            });
            describe(' an item is clicked', function () {
                var itemToClick;
                beforeEach(function () {
                    itemToClick = rootElement.queryAll(platform_browser_1.By.css('a')).filter(function (x) { return x.nativeElement.text.includes('Min sida'); })[0];
                    itemToClick.triggerEventHandler('mousedown', null);
                    fixture.detectChanges();
                });
                it('the clicked item is selected', function () {
                    expect(itemToClick.classes['header-menu-item--selected']).toBe(true);
                });
                it('the clicked item is marked', function () {
                    expect(itemToClick.classes['header-menu-item--marked']).toBe(true);
                });
                describe('and an item is hovered', function () {
                    var itemToHover;
                    beforeEach(function () {
                        itemToHover = rootElement.queryAll(platform_browser_1.By.css('a')).filter(function (x) { return x.nativeElement.text.includes('FAQ'); })[0];
                        itemToHover.triggerEventHandler('mouseenter', null);
                        fixture.detectChanges();
                    });
                    it('the hovered item is marked', function () {
                        expect(itemToHover.classes['header-menu-item--marked']).toBe(true);
                    });
                    it('the hovered item is not selected', function () {
                        expect(itemToHover.classes['header-menu-item--selected']).toBe(false);
                    });
                    it('the selected item is not marked', function () {
                        expect(itemToClick.classes['header-menu-item--marked']).toBe(false);
                    });
                    it('the clicked item is selected', function () {
                        expect(itemToClick.classes['header-menu-item--selected']).toBe(true);
                    });
                    describe('and the item is un-hovered', function () {
                        beforeEach(function () {
                            itemToHover.triggerEventHandler('mouseleave', null);
                            fixture.detectChanges();
                        });
                        it('the un-hovered item is not marked', function () {
                            expect(itemToHover.classes['header-menu-item--marked']).toBe(false);
                        });
                        it('the un-hovered item is not selected', function () {
                            expect(itemToHover.classes['header-menu-item--selected']).toBe(false);
                        });
                        it('the selected item is marked', function () {
                            expect(itemToClick.classes['header-menu-item--marked']).toBe(true);
                        });
                        it('the clicked item is selected', function () {
                            expect(itemToClick.classes['header-menu-item--selected']).toBe(true);
                        });
                    });
                });
            });
            describe(' and the user clicks outside headermenu', function () {
                beforeEach(function () {
                    mockEvent = new Event('');
                    component.onDocumentClick(mockEvent);
                    fixture.detectChanges();
                });
                it('headerMenu should not be visible', function () {
                    expect(headerMenuElement.classes['header-menu--hidden']).toBe(true);
                });
            });
        });
    });
    describe('A submenu header is clicked', function () {
        var itemToClick;
        beforeEach(function () {
            itemToClick = rootElement.queryAll(platform_browser_1.By.css('a')).filter(function (x) { return x.nativeElement.text.includes('FAQ'); })[0];
            itemToClick.triggerEventHandler('mousedown', null);
            fixture.detectChanges();
        });
        it(' the header is not marked as selected ', function () {
            expect(itemToClick.classes['header-menu-item--selected']).toBe(false);
        });
        it(' the submenu is opened ', function () {
            expect(itemToClick.parent.classes['header-menu-submenu--expanded']).toBe(true);
        });
    });
});
//# sourceMappingURL=headerMenuComponent.angular.spec.js.map