// /// <reference path="../node_modules/@types/jasmine/index.d.ts" />

// import { ComponentFixture, TestBed, async } from "@angular/core/testing";
// import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
// import { By } from "@angular/platform-browser";
// import { DebugElement } from "@angular/core";
// import { CommonModule } from "@angular/common";
// import { RouterTestingModule } from "@angular/router/testing";
// import { Router } from "@angular/router";
// import { Observable } from "rxjs/Rx";

// import { KomponentkartanApplicationComponent } from "../app/app.component";
// import { IMenu, IMenuGroup, IMenuItem } from "../app/shared/models/menu.model";

// export class MockMenuService {
//     numberOfMenusToReturn: number;

//     constructor() {
//         this.numberOfMenusToReturn = 1;
//     }
//     private getMenusforCurrentUser(numberOfMenus?: string): Observable<IMenu[]> {

//         const allMenus = [
//             {
//                 title: "BMM",
//                 groups: [{ menuItems: [{ url: "/bmmOption1", title: "BMM Menyval1" } as IMenuItem] as IMenuItem[] } as IMenuGroup] as IMenuGroup[]
//             } as IMenu,
//             {
//                 title: "VGPV",
//                 groups: [{ menuItems: [{ url: "/vgpvOption1", title: "VGPV Menyval1" } as IMenuItem] as IMenuItem[] } as IMenuGroup] as IMenuGroup[]
//             } as IMenu,
//             {
//                 title: "Rehab",
//                 groups: [{ menuItems: [{ url: "/rehabOption1", title: "Rehab Menyval1" } as IMenuItem] as IMenuItem[] } as IMenuGroup] as IMenuGroup[]
//             } as IMenu];

//         return Observable.of(allMenus);
//     }
// }

// describe("VardvalPortalApplicationComponent",
//     () => {
//         let component: KomponentkartanApplicationComponent;
//         let fixture: ComponentFixture<KomponentkartanApplicationComponent>;
//         let rootElement: DebugElement;
//         let router: Router;
//         var mockMenuService = new MockMenuService();
//         beforeEach((done) => {
//             jasmine.clock().uninstall();
//             jasmine.clock().install();
//             TestBed.resetTestEnvironment();
//             TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
//             TestBed.configureTestingModule({
//                 declarations: [KomponentkartanApplicationComponent, HeaderComponent, HeaderMenuComponent, SidebarMenuComponent, MenuComponent, EmptyComponent],
//                 imports: [CommonModule, RouterTestingModule.withRoutes([
//                     { path: "bmmOption1", component: EmptyComponent }, { path: "vgpvOption1", component: EmptyComponent }, { path: "optionFromDropDown", component: EmptyComponent }
//                 ])],
//                 providers: [{ provide: MenuService, useFactory: () => { return mockMenuService } }]
//             });

//             TestBed.overrideComponent(KomponentkartanApplicationComponent, { set: { templateUrl: "app/app.component.html" } });
//             TestBed.overrideComponent(HeaderComponent, { set: { templateUrl: "app/header/header.component.html" } });
//             TestBed.overrideComponent(HeaderMenuComponent, { set: { templateUrl: "app/header/header-menu.component.html" } });
//             TestBed.overrideComponent(SidebarMenuComponent, { set: { templateUrl: "app/sidebar-menu/sidebar-menu.component.html" } });
//             TestBed.overrideComponent(MenuComponent, { set: { templateUrl: "app/sidebar-menu/menu.component.html" } });
//             TestBed.overrideComponent(EmptyComponent, { set: { templateUrl: "app/empty/empty.component.html" } });

//             TestBed.compileComponents().then(() => {
//                 fixture = TestBed.createComponent(KomponentkartanApplicationComponent);
//                 component = fixture.componentInstance;
//                 rootElement = fixture.debugElement;
//                 router = TestBed.get(Router);

//                 done();
//                 fixture.detectChanges();

//             });

//         });
//         afterEach(() => {
//             jasmine.clock().uninstall();
//         });
//         describe("When navigating to a URL in the BMM Menu", () => {
//             it("system color in header is changed to BMM", (done) => {
//                 /* This is what happens:
//                  * 1. The router navigates to a URL
//                  * 2. The router event is caught by the Sidebar-menu.component
//                  * 3. Angular marks the selected menu item <LI> with "menu-item--selected", due to the RouterLinkActive attribute
//                  * 4. (After 200ms) The Sidebar-menu.component looks for the menu-item--selected LI and finds its parent menu
//                  * 5. The Sidebar-menu.component emits the title of that menu as an event
//                  * 6. The header.component listens to the event and sets the SystemColor accordingly
//                  */
//                 router.navigateByUrl("/bmmOption1").then(() => {
//                     //Since the component waits for 200ms before examining the CSS, we have to fake time passed here.
//                     jasmine.clock().tick(201);
//                     expect(component.headerComponent.systemColor).toBe("BMM");
//                     done();
//                 });
//             });

//             it("the other menus are marked as inactive", (done) => {
//                 router.navigateByUrl("/bmmOption1").then(() => {
//                     //Since the component waits for 200ms before examining the CSS, we have to fake time passed here.
//                     jasmine.clock().tick(201);
//                     expect(component.sidebarMenuComponent.menuComponents.filter(x => x.isInactive).length).toBe(2);
//                     expect(component.sidebarMenuComponent.menuComponents.filter(x => !x.isInactive)[0].menu.title).toBe("BMM");
//                     done();
//                 });
//             });

//             describe("And then navigating to a VGPV menu option", () => {
//                 it("the BMM menu is marked as inactive", (done) => {
//                     router.navigateByUrl("/vgpvOption1").then(() => {
//                         //Since the component waits for 200ms before examining the CSS, we have to fake time passed here.
//                         jasmine.clock().tick(201);
//                         expect(component.sidebarMenuComponent.menuComponents.filter(x => x.menu.title === "BMM")[0].isInactive).toBeTruthy();
//                         done();
//                     });
//                 });

//             });
//         });

//         describe("When navigating to a URL not present in the menu (like from the header menu)", () => {
//             beforeEach(() => {
//                 //Fake that we are already in the BMM menu. 'Neutral' is the default.
//                 component.headerComponent.systemColor = "BMM";
//             })
//             it("system color in header is changed to neutral", (done) => {
//                 router.navigateByUrl("/optionFromDropDown").then(() => {
//                     //Since the component waits for 200ms before examining the CSS, we have to fake time passed here.
//                     jasmine.clock().tick(201);
//                     expect(component.headerComponent.systemColor).toBe("neutral");
//                     done();
//                 });
//             });

//         });
//     });