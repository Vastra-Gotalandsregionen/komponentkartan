// import { SidebarMenuComponent } from "../../app/sidebar-menu/sidebar-menu.component";
// import { IMenu, IMenuGroup, IMenuItem } from "../../app/shared/models/menu.model";
// import { MenuService } from "../../app/shared/services/menu.service";

// import { Router, NavigationEnd, ActivatedRoute, Route } from "@angular/router";
// import { Observable } from "rxjs/Rx";
// import { ChangeDetectorRef } from "@angular/core";

// var sidebarmenuComponent: SidebarMenuComponent;

// describe("sidebarMenuComponent tests", () => {
//     let router: Router;
//     let route: Route[];

//     let activatedRouterMock: any;
//     let menuService: MenuService;
//     let activeRoute: ActivatedRoute;
//     let changeDetectorRef: ChangeDetectorRef;

//     beforeEach(() => {

//         activeRoute = new ActivatedRoute();
//         activeRoute.queryParams = Observable.of([{menus:"2"}]);

//         menuService = new MenuService(null, null);

//         router = new Router(null,null,null, null,null,null,null,[] as Route[]);

//         spyOn(router, "events").and.returnValue(Observable.of([new NavigationEnd(1, "", "")]));

//         changeDetectorRef = jasmine.createSpyObj("changeDetectorRef", ["detectChanges"]);


//     });

//     describe("when menuService returns one menu", () => {
//         beforeEach(() => {

//             spyOn(menuService, "getMenusforCurrentUser").and.returnValue(Observable.of([{ title: "min meny" } as IMenu] as IMenu[]));

//             sidebarmenuComponent = new SidebarMenuComponent(menuService, activeRoute, router, changeDetectorRef, null);
//         });

//         it("menus are set", () => {
//             sidebarmenuComponent.ngAfterViewInit();
//             expect(sidebarmenuComponent.menus.length).toBe(1);

//         });
//     });



// });