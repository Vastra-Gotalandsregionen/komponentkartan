import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms"

import { DebugElement } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterTestingModule } from "@angular/router/testing";

import { HeaderMenuComponent } from "../../component-package/controls/headermenu/headerMenu.component";
import { IHeaderMenu, IHeaderMenuItem } from "../../component-package/models/headerMenu.model"

describe("HeaderMenuComponent", () => {
    let component: HeaderMenuComponent;
    let fixture: ComponentFixture<HeaderMenuComponent>;
    let rootElement: DebugElement;
    let headerMenu: IHeaderMenu;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [HeaderMenuComponent],
            imports: [CommonModule, FormsModule, RouterTestingModule.withRoutes([])]

        });

        TestBed.overrideComponent(HeaderMenuComponent,
            {
                set: {
                    templateUrl: "headermenu.component.html"
                }
            });



        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(HeaderMenuComponent);


            component = fixture.componentInstance;

            component.menu = {
                menuItems: [
                    {
                        displayName: "Min sida",
                        url: "/minsida",
                        isInternalLink: true
                    },
                    {
                        isSeparator: true
                    },
                    {
                        displayName: "Krav- och kvalitetsbok",
                        menuItems: [
                            {
                                displayName: "VGPV",
                                url: `http://www.vgregion.se/halsa-och-vard/vardgivarwebben/uppdrag-och-avtal/vardval-vg-primarvard/krav--och-kvalitetsbok-vg-primarvard/`,
                                isInternalLink: false
                            },
                            {
                                displayName: "Rehab",
                                url: "http://www.vgregion.se/halsa-och-vard/vardgivarwebben/uppdrag-och-avtal/vardval-rehab/krav--och-kvalitetsbok/",
                                isInternalLink: false
                            }
                        ] as IHeaderMenuItem[]
                    },
                    {
                        displayName: "FAQ",
                        menuItems: [
                            {
                                displayName: "VGPV",
                                url: "http://www.vgregion.se/sv/Vastra-Gotalandsregionen/startsida/Vard-och-halsa/Forvardgivare/VG-Primarvard1/Fragor-och-svar/",
                                isInternalLink: false
                            },
                            {
                                displayName: "Rehab",
                                url: "http://www.vgregion.se/halsa-och-vard/vardgivarwebben/uppdrag-och-avtal/vardval-rehab/fragor-och-svar/",
                                isInternalLink: false
                            }
                        ] as IHeaderMenuItem[]
                    },
                    {
                        displayName: "Kontakt",
                        url: "http://www.vgregion.se/halsa-och-vard/vardgivarwebben/it/it-system/it-stod-for-vardval-rehab/kontaktpersoner/",
                        isInternalLink: false
                    }
                ] as IHeaderMenuItem[]
            } as IHeaderMenu;

            rootElement = fixture.debugElement;
            fixture.detectChanges();

            done();
        });
    });

    describe("When component is initialized", () => {
        var headerMenuElement: DebugElement;
        beforeEach(() => {
            headerMenuElement = rootElement.query(By.css(".header-menu"));


        });
        it("headerMenu is not visible", () => {
            expect(headerMenuElement.classes["header-menu--hidden"]).toBe(true);
        });
        describe("and toggleHeaderMenu is called ", () => {
            it("headerMenu should be visible", () => {
                var mockEvent;
                mockEvent = new Event("");
                spyOn(mockEvent, 'preventDefault');
                component.toggleHeaderMenu(mockEvent);
                fixture.detectChanges();

                expect(headerMenuElement.classes["header-menu--hidden"]).toBe(false);
            });

            describe("and an item is hovered", () => {
                var itemToHover: DebugElement;
                beforeEach(() => {
                    itemToHover = rootElement.queryAll(By.css("a"))[0]; //.filter(x => x.nativeElement.textContent === "FAQ")[0]
                    itemToHover.triggerEventHandler("mouseenter", null);
                    fixture.detectChanges();
                });
                it("the hovered item is marked", () => {
                    expect(itemToHover.classes["header-menu-item--marked"]).toBe(true);
                });
                it("the hovered item is not selected", () => {
                    expect(itemToHover.classes["header-menu-item--selected"]).toBe(false);
                });
                // it("the selected item is not marked", () => {
                //     expect(itemToClick.parent.classes["dropdown-item--marked"]).toBe(false);
                // });
                // it("the clicked item is selected", () => {
                //     expect(itemToClick.parent.classes["dropdown-item--selected"]).toBe(true);
                // });

                describe("and the item is un-hovered", () => {
                    beforeEach(() => {
                        itemToHover.triggerEventHandler("mouseleave", null);
                        fixture.detectChanges();
                    });
                    it("the un-hovered item is not marked", () => {
                        expect(itemToHover.classes["header-menu-item--marked"]).toBe(false);
                    });
                    it("the un-hovered item is not selected", () => {
                        expect(itemToHover.classes["header-menu-item--selected"]).toBe(false);
                    });
                    // it("the selected item is marked", () => {
                    //     expect(itemToClick.parent.classes["dropdown-item--marked"]).toBe(true);
                    // });
                    // it("the clicked item is selected", () => {
                    //     expect(itemToClick.parent.classes["dropdown-item--selected"]).toBe(true);
                    // });
                });
            });
        });




    });
});