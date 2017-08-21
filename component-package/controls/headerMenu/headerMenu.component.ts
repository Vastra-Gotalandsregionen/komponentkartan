import { Component, Input, ElementRef } from "@angular/core"
import { IHeaderMenu, IHeaderMenuItem } from "../../models/headermenu.model"

import * as $ from 'jquery';

@Component({
    selector: "vgr-header-menu",
    moduleId: module.id,
    templateUrl: "./headerMenu.component.html",
    host: {
        '(document:click)': "onDocumentClick($event)"
    }
})

export class HeaderMenuComponent {
    @Input() menu: IHeaderMenu;
    hidden: boolean;
    selectedItem: IHeaderMenuItem;

    constructor(private elementRef: ElementRef) {
        this.hidden = true;
    }

    toggleHeaderMenu(event: Event) {
        let target = event.target || event.srcElement || event.currentTarget;
        let element = $(target);
        if (!element.is(".header-menu__submenu-header")) {
            this.hidden = !this.hidden;
        }

        if (!this.hidden) {
            event.cancelBubble = true;
        }
    }

    toggleSubMenu(item: IHeaderMenuItem) {
        item.expanded = !item.expanded;
    }

    onDocumentClick(event: any) {
        let target = event.target || event.srcElement || event.currentTarget;

        if (!this.elementRef.nativeElement.contains(target)) {
            this.hidden = true;
        }
    }

    onMouseEnter(item: IHeaderMenuItem) {
        this.menu.menuItems.forEach(x => x.marked = false);

        item.marked = true;
    }

    onMouseLeave(item: IHeaderMenuItem) {
        item.marked = false;
        if (this.selectedItem)
            this.selectedItem.marked = true;
    }


    selectItem(item: IHeaderMenuItem) {
        if (!item)
            return;

        this.menu.menuItems.forEach(x => x.selected = false);

        item.selected = true;
        item.marked = true;
        this.selectedItem = item;


    }
}


