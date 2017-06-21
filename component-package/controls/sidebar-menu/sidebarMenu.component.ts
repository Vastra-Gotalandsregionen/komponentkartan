import { Input, Output, Component, AfterViewInit, ViewChildren, Query, QueryList, EventEmitter, ChangeDetectorRef } from "@angular/core"
import { IMenu } from "../../models/menu.model";
import { MenuComponent } from "./menu.component";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { BrowserDetector } from "../../services/browserDetector";

@Component({
    selector: "vgr-sidebar-menu",
    moduleId: module.id,
    templateUrl: "./sidebarMenu.component.html",
    providers: [BrowserDetector]
})
export class SidebarMenuComponent implements AfterViewInit {
    @Input() menus: IMenu[];
    @ViewChildren(MenuComponent) menuComponents: QueryList<MenuComponent>;
    @Output() selectedMenuChanged = new EventEmitter<string>();
    private selectedMenu: JQuery;
    public anyMenuExpanded: boolean;
    private initializedMenuCount: number;


    constructor(private activatedRoute: ActivatedRoute, private router: Router, private changeDetectorRef: ChangeDetectorRef,
        private browserDetector: BrowserDetector
    ) {
        this.initializedMenuCount = 0;
    }

    ngAfterViewInit() {

        this.router.events.forEach((event) => {
            if (event instanceof NavigationEnd) {
                setTimeout(() => {
                    var newSelectedMenu = this.getSelectedMenu();
                    if (newSelectedMenu.length === 0) {
                        //User has selected something from outside of the menu, from the drop-down perhaps.
                        this.selectedMenuChanged.emit("neutral");
                        this.selectedMenu = undefined;
                    }
                    //Don't scroll if the selected menu has not changed
                    else {
                        var newSelectedMenuComponent = this.getMenuComponent(newSelectedMenu);
                        if (newSelectedMenuComponent !== null) {
                            this.selectedMenuChanged.emit(newSelectedMenuComponent.menu.title);
                            this.menuComponents.forEach(x => x.selectedMenuChanged(newSelectedMenuComponent.menu.title));
                            //Expand menu automatically when selected
                            if (!newSelectedMenuComponent.menu.expanded) {
                                newSelectedMenuComponent.toggleExpand();
                            }
                        }

                        if (!newSelectedMenu.is(this.selectedMenu)) {
                            this.scrollToMenu(newSelectedMenu);
                        }

                        this.selectedMenu = newSelectedMenu;
                    }
                    this.markParentOfSelectedChild();
                }, 200);
            }
        });

        this.changeDetectorRef.detectChanges();

        setTimeout(() => { this.setupJQuery() }, 1000);

    }

    public onMenuInitialized() {
        // this.initializedMenuCount++;
        // if (!this.menuComponents)
        //     return;
        // if (this.initializedMenuCount >= this.menuComponents.length)
        //     this.setupJQuery();
    }

    private setupJQuery() {
        //Menu-item-marker
        $('.menu__item-list > li').hover(function () {
            if (!$(this).hasClass('menu__expander'))
                $('.menu-item--selected').removeClass('menu-item--marked');

        },
            function () {
                $('.menu-item--selected').addClass('menu-item--marked');
            });


        $('.menu__subItems-list > li').hover(function () {
            if (!$(this).hasClass('menu__expander'))
                $('.menu-item--selected').removeClass('menu-item--marked');
        },
            function () {
                $('.menu-item--selected').addClass('menu-item--marked');
            });

        $('.menu').hover(function () {
            $('.menu').addClass('menu--not-hovered');
            $(this).closest('.menu').addClass('menu--hovered');
            $(this).closest('.menu').removeClass('menu--not-hovered');

        },
            function () {
                $('.menu').removeClass('menu--not-hovered');
                $(this).closest('.menu').removeClass('menu--hovered');

            });

        //TODO: När är det rätt läge att aktivera scrollbaren? DSom det är nu förminskar den single menyn!

        this.applyScrollbar($('.sidebar-menu'))
    }

    private applyScrollbar(jqueryMenu: any) {
        //Apply a scrollbar to the menu. We use jquery.scrollbar from https://github.com/gromo/jquery.scrollbar
        jqueryMenu.scrollbar();

    }

    private markParentOfSelectedChild() {
        //First remove all child-selected instances
        $(".menu-item--parent").removeClass("menu-item--child-selected");
        //Then add the child-selected class to the currently selected child's (<LI>) Parent's(<UL>) Previous Sibling (<LI>) with the class .menu-item--parent.
        $(".menu-item--child.menu-item--selected").parent().prev(".menu-item--parent").addClass("menu-item--child-selected");
    }

    private getSelectedMenu(): JQuery {
        return $(".menu-item--selected").closest(".menu");
    }

    private getMenuComponent(menu: JQuery): MenuComponent {
        var selectedTitle = menu.find(".menu__header__title").first().text();
        var matchingComponents = this.menuComponents.filter(x => x.menu.title === selectedTitle);
        if (matchingComponents.length === 1)
            return matchingComponents[0];
        return null;
    }

    private scrollToMenu(newSelectedMenu: JQuery) {
        //Calculate scrolling height by adding the heights of all menus above the selected one
        var totalHeight = 0;
        newSelectedMenu.closest("menu").prevAll("menu").each(function () { totalHeight += $(this).height() });
        var newScrollTopValue = totalHeight > 0 ? totalHeight - 50 : 0;

        if (!this.browserDetector.isInternetExplorer())
            $(".sidebar-menu").animate({ scrollTop: newScrollTopValue }, 900);
    }

    onAnyMenuExpanded(): void {
        this.anyMenuExpanded = this.menus && (this.menus.filter(x => x.expanded).length > 0 || this.anySubmenuExpanded());
        setTimeout(this.markParentOfSelectedChild, 200);
    }

    anySubmenuExpanded(): boolean {
        for (var i = 0; i < this.menus.length; i++) {
            for (var j = 0; j < this.menus[i].groups.length; j++) {
                for (var k = 0; k < this.menus[i].groups[j].menuItems.length; k++) {
                    if (this.menus[i].groups[j].menuItems[k].expanded)
                        return true;
                }
            }
        }
        return false;
    }
}