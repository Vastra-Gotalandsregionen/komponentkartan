import { Input, Output, Component, AfterViewInit, ViewChildren, Query, QueryList, EventEmitter, ChangeDetectorRef } from '@angular/core'
import { IMenu } from '../../models/menu.model';
import { MenuComponent } from './menu.component';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BrowserDetector } from '../../services/browserDetector';

const scrollbarStyle = `

:host /deep/ .ps {
    -ms-touch-action: auto;
    touch-action: auto;
    overflow: hidden !important;
    -ms-overflow-style: none;
}

:host /deep/ .ps.ps--active-y>.ps__scrollbar-y-rail {
    display: block;
    background-color: transparent;
}

:host /deep/ .ps.ps--in-scrolling.ps--y>.ps__scrollbar-y-rail {
    background-color: transparent !important;
    opacity: .9;
}

:host /deep/ .ps.ps--in-scrolling.ps--y>.ps__scrollbar-y-rail>.ps__scrollbar-y {
    background-color: transparent !important;
    width: 11px;
}



:host /deep/ .ps>.ps__scrollbar-y-rail {
    display: none;
    position: absolute;
    opacity: 0;
    -webkit-transition: background-color .2s linear, opacity .2s linear;
    -o-transition: background-color .2s linear, opacity .2s linear;
    -moz-transition: background-color .2s linear, opacity .2s linear;
    transition: background-color .2s linear, opacity .2s linear;
    right: 0;
    width: 11px;
}

:host /deep/ .ps>.ps__scrollbar-y-rail>.ps__scrollbar-y {
    position: absolute;
    background-color: #aaa;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    -webkit-transition: background-color .2s linear, height .2s linear, width .2s ease-in-out, -webkit-border-radius .2s ease-in-out;
    transition: background-color .2s linear, height .2s linear, width .2s ease-in-out, -webkit-border-radius .2s ease-in-out;
    -o-transition: background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out;
    -moz-transition: background-color .2s linear, height .2s linear,
    width .2s ease-in-out, border-radius .2s ease-in-out, -moz-border-radius .2s ease-in-out;
    transition: background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out;
    transition: background-color .2s linear, height .2s linear,
    width .2s ease-in-out, border-radius .2s ease-in-out, -webkit-border-radius .2s ease-in-out, -moz-border-radius .2s ease-in-out;
    right: 2px;
    width: 8px;
}

:host /deep/ .ps>.ps__scrollbar-y-rail:hover>.ps__scrollbar-y,
:host /deep/ .ps>.ps__scrollbar-y-rail:active>.ps__scrollbar-y {
    width: 8px;
}

:host /deep/ .ps:hover.ps--in-scrolling.ps--y>.ps__scrollbar-y-rail {
    background-color: transparent;
    opacity: .9;
}

:host /deep/ .ps:hover.ps--in-scrolling.ps--y>.ps__scrollbar-y-rail>.ps__scrollbar-y {
    width: 8px;
}

:host /deep/ .ps:hover>.ps__scrollbar-y-rail {
    opacity: .6;
}


:host /deep/ .ps:hover>.ps__scrollbar-y-rail:hover {
    background-color: transparent;
    opacity: .9;
}

:host /deep/ .ps:hover>.ps__scrollbar-y-rail:hover>.ps__scrollbar-y {
    background-color: #999;
}

:host /deep/ .ps.ps--active-y>.ps__scrollbar-y-rail>.ps__scrollbar-y {
    background-color: #999;
}

:host /deep/ .ps.ps--in-scrolling.ps--y>.ps__scrollbar-y-rail>.ps__scrollbar-y {
    background-color: #999;
}


:host /deep/ .ps {
    position: relative;
    display: block;
}

:host /deep/ .ps[hidden] {
    display: none;
}

:host /deep/ .ps[fxlayout]>.ps-content {
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
}

:host /deep/ .ps.ps-static {
    position: static;
}

:host /deep/ .ps.ps-static>.ps__scrollbar-y-rail {
    top: 0 !important;
}

:host /deep/ .ps.ps-outside.ps--active-y {
    padding-right: 24px;
    margin-right: -24px;
}

:host /deep/ .ps.ps-outside>.ps__scrollbar-x-rail {
    margin: 0 8px;
}

:host /deep/ .ps.ps-outside>.ps__scrollbar-y-rail {
    margin: 8px 0;
}`;

@Component({
    selector: 'vgr-sidebar-menu',
    moduleId: module.id,
    templateUrl: './sidebarMenu.component.html',
    styles: [scrollbarStyle],
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
                const url = (event as NavigationEnd).url;
                setTimeout(() => {
                    const newSelectedMenu = this.getSelectedMenu();
                    if (newSelectedMenu.length === 0) {
                        // User has selected something from outside of the menu, from the drop-down perhaps.
                        this.selectedMenuChanged.emit('neutral');
                        this.selectedMenu = undefined;
                    } else {
                        const newSelectedMenuComponent = this.getMenuComponent(newSelectedMenu);
                        if (newSelectedMenuComponent !== null) {
                            this.selectedMenuChanged.emit(newSelectedMenuComponent.menu.title);
                            this.menuComponents.forEach(x => x.selectedMenuChanged(newSelectedMenuComponent.menu.title));
                            // Expand menu automatically when selected
                            if (!newSelectedMenuComponent.menu.expanded) {
                                newSelectedMenuComponent.toggleExpand();
                                newSelectedMenuComponent.menuItems.forEach(menuItem => {
                                    if (menuItem.menuItems) {
                                        const selectedChildren = menuItem.menuItems.filter(x => x.url === url);
                                        if (selectedChildren.length > 0) {
                                            menuItem.expanded = true;
                                        }
                                    }
                                });
                            }
                        }
                        // Don't scroll if the selected menu has not changed
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

    private setupJQuery() {
        // Menu-item-marker
        $('.menu__item-list > li').not('.menu__footer').hover(function () {
            if (!$(this).hasClass('menu__expander')) {
                $('.menu-item--selected').removeClass('menu-item--marked');
            }

        },
            function () {
                $('.menu-item--selected').addClass('menu-item--marked');
            });


        $('.menu__subItems-list > li').hover(function () {
            if (!$(this).hasClass('menu__expander')) {
                $('.menu-item--selected').removeClass('menu-item--marked');
            }
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
    }


    private markParentOfSelectedChild() {
        // First remove all child-selected instances
        $('.menu-item--parent').removeClass('menu-item--child-selected');

        // Then add the child-selected class to the currently selected child's (<LI>) Parent's(<UL>)
        // Previous Sibling (<LI>) with the class .menu-item--parent.
        $('.menu-item--child.menu-item--selected').parent().prev('.menu-item--parent').addClass('menu-item--child-selected');
    }

    private getSelectedMenu(): JQuery {
        return $('.menu-item--selected').closest('.menu');
    }

    private getMenuComponent(menu: JQuery): MenuComponent {
        const selectedTitle = menu.find('.menu__header__title').first().text();
        const matchingComponents = this.menuComponents.filter(x => x.menu.title === selectedTitle);
        if (matchingComponents.length === 1) {
            return matchingComponents[0];
        }
        return null;
    }

    private scrollToMenu(newSelectedMenu: JQuery) {
        // Calculate scrolling height by adding the heights of all menus above the selected one
        let totalHeight = 0;
        newSelectedMenu.closest('vgr-menu').prevAll('vgr-menu').each(function () { totalHeight += $(this).children('.menu').height() });
        const newScrollTopValue = totalHeight > 0 ? totalHeight - 50 : 0;

        if (!this.browserDetector.isInternetExplorer()) {
            $('perfect-scrollbar').animate({ scrollTop: newScrollTopValue }, 900);
        }
    }

    onAnyMenuExpanded(): void {
        this.anyMenuExpanded = this.menus && (this.menus.filter(x => x.expanded).length > 0 || this.anySubmenuExpanded());
        setTimeout(this.markParentOfSelectedChild, 200);
    }

    anySubmenuExpanded(): boolean {
        for (let i = 0; i < this.menus.length; i++) {
            for (let j = 0; j < this.menus[i].groups.length; j++) {
                for (let k = 0; k < this.menus[i].groups[j].menuItems.length; k++) {
                    if (this.menus[i].groups[j].menuItems[k].expanded) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
