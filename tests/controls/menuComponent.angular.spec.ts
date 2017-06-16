// /// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

// import { ComponentFixture, TestBed, async } from "@angular/core/testing";
// import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
// import { By } from "@angular/platform-browser";
// import { DebugElement } from "@angular/core";
// import { CommonModule } from "@angular/common";
// import { RouterTestingModule } from "@angular/router/testing";
// import { MenuComponent } from "../../app/sidebar-menu/menu.component";
// import { IMenu, IMenuGroup, IMenuItem } from "../../app/shared/models/menu.model.d";

// describe("MenuComponent",
//     () => {
//         let component: MenuComponent;
//         let fixture: ComponentFixture<MenuComponent>;
//         let rootElement: DebugElement;

//         beforeEach(async(() => {
//             TestBed.resetTestEnvironment();
//             TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
//             TestBed.configureTestingModule({
//                 declarations: [MenuComponent],
//                 imports: [CommonModule, RouterTestingModule.withRoutes([])]
//             });

//             TestBed.overrideComponent(MenuComponent,
//                 {
//                     set: {
//                         templateUrl: "app/sidebar-menu/menu.component.html"
//                     }
//                 });

//             TestBed.compileComponents().then(() => {
//                 fixture = TestBed.createComponent(MenuComponent);
//                 component = fixture.componentInstance;
//                 rootElement = fixture.debugElement;
//                 var firstgroupMenuItems = [
//                     {
//                         title: "Vårdcentraler",
//                         url: "/vgovVardcentraler",
//                         favourite: false,
//                         order: "1"
//                     },
//                     {
//                         title: "Jourcentraler",
//                         url: "http://vardval.vgregion.se",
//                         favourite: false,
//                         order: "2"
//                     },
//                     {
//                         title: "Användare",
//                         url: "/vgpvAnvändare",
//                         favourite: false,
//                         order: "3",
//                         menuItems: [
//                             {
//                                 title: "Användare 1",
//                                 url: "/vgpvAnvändare1",
//                                 favourite: false,
//                                 order: "1"
//                             },
//                             {
//                                 title: "Användare 2",
//                                 url: "/vgpvAnvändare2",
//                                 favourite: false,
//                                 order: "2"
//                             }
//                         ]
//                     },
//                     {
//                         title: "Användare",
//                         url: "/vgpvAnvändare",
//                         favourite: true,
//                         order: "4"
//                     },
//                     {
//                         title: "Användare2",
//                         url: "/vgpvAnvändare",
//                         favourite: false,
//                         order: "5"
//                     }
//                 ];
//                 var secondgroupMenuItems = [
//                     {
//                         title: "Rapporter",
//                         url: "/vgpvRapporter",
//                         favourite: false,
//                         order: "2.2",
//                     }
//                 ];

//                 var menu = {
//                     title: "BMM",
//                     expanded: false,
//                     groups: [{ menuItems: firstgroupMenuItems } as IMenuGroup, { menuItems: secondgroupMenuItems } as IMenuGroup]

//                 } as IMenu;

//                 component.menu = menu;
//                 component.isSingleMenu = true;

//                 component.ngOnChanges();

//                 fixture.detectChanges();

//             });
//         }));

//         describe("When a non-single BMM menu is created", () => {
//             var menuElement: DebugElement;

//             beforeEach(() => {

//                 component.menu.expanded = false;
//                 component.isSingleMenu = false;

//                 component.ngOnChanges();

//                 fixture.detectChanges();
//                 menuElement = rootElement.query(By.css(".menu"));
//             });

//             it("the menu is not expanded", () => {
//                 expect(menuElement.classes["menu--expanded"]).toBeFalsy();
//             });

//             it("the menu is expandedable", () => {
//                 expect(menuElement.classes["menu--expandable"]).toBeTruthy();
//             });

//             it("the menu footer has content (dots are showing)", () => {
//                 let footerElement = menuElement.queryAll(By.css(".menu__footer"));
//                 expect(footerElement.length).toBe(1);
//                 expect(footerElement[0].classes["menu__footer--expander"]).toBeTruthy();
//                 expect(footerElement[0].classes["menu__footer--collapser"]).toBeFalsy();
//             });

//             describe("and when the menu is expanded", () => {
//                 it("a menu collapser is shown", async(() => {
//                     let footerElement = menuElement.query(By.css(".menu__footer"));

//                     footerElement.triggerEventHandler("click", null);
//                     fixture.detectChanges();

//                     expect(footerElement.classes["menu__footer--collapser"]).toBeTruthy();
//                 }));
//             });

//             describe("and when another menu is activated", () => {
//                 it("the BMM menu is inactivated", async(() => {
//                     component.selectedMenuChanged("VGPV");
//                     fixture.detectChanges();

//                     expect(menuElement.classes["menu--inactive"]).toBeTruthy();
//                 }));
//             });
//         });

//         describe("When a single BMM menu with groups and submenus is created", () => {
//             var menuElement: DebugElement;

//             beforeEach(() => {
//                 menuElement = rootElement.query(By.css(".menu"));
//             });

//             it("the menu title is set to BMM", () => {
//                 let menuheaderTitelElement = rootElement.query(By.css(".menu__header__title"));
//                 expect(menuheaderTitelElement.nativeElement.textContent).toBe("BMM");
//             });

//             it("the menu is themed as BMM", () => {
//                 expect(menuElement.classes["menu--bmm"]).toBeTruthy();
//             });

//             it("the menu is not expandable", () => {
//                 expect(menuElement.classes["menu--expandable"]).toBeFalsy();
//             });

//             it("the menu footer has no content (no dots is showing)", () => {
//                 let footerElement = menuElement.queryAll(By.css(".menu__footer"));
//                 expect(footerElement.length).toBe(1);
//                 expect(footerElement[0].classes["menu__footer--expander"]).toBeFalsy();
//                 expect(footerElement[0].classes["menu__footer--collapser"]).toBeFalsy();
//             });

//             it("the menu has a group separator", () => {
//                 let menuSeparatorElement = rootElement.query(By.css(".menu-item--separator"));
//                 expect(menuSeparatorElement.classes["menu-item--visible"]).toBeTruthy();
//             });


//             it("the menu has a sub-menu with two items", () => {
//                 let menuItemChildren = rootElement.queryAll(By.css(".menu-item--child"));
//                 expect(menuItemChildren.length).toBe(2);
//             });




//             describe("and when the menu footer is clicked", () => {
//                 it("the menu is expanded/collapsed",
//                     async(() => {
//                         spyOn(component, "toggleExpand");
//                         let button = fixture.debugElement.query(By.css(".menu__footer"))
//                             .triggerEventHandler("click", null);

//                         fixture.whenStable().then(() => {
//                             expect(component.toggleExpand).toHaveBeenCalled();
//                         });
//                     }));
//             });


//         });
//     });
