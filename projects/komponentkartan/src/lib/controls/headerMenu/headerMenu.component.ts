import { Component, Input, ElementRef, HostListener } from '@angular/core';
import { IHeaderMenu, IHeaderMenuItem } from '../../models/headerMenu.model';

@Component({
    selector: 'vgr-header-menu',
    templateUrl: './headerMenu.component.html'
})

export class HeaderMenuComponent {
    @Input() menu: IHeaderMenu;
    @Input() hideMenu: boolean = true;
    selectedItem: IHeaderMenuItem;

    constructor(private elementRef: ElementRef) {
    }

    toggleHeaderMenu(event: MouseEvent|any) {
        this.hideMenu = !this.hideMenu;
    }

    toggleSubMenu(item: IHeaderMenuItem) {
        item.expanded = !item.expanded;

        event.cancelBubble = true;
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: any) {
        const target = event.target || event.srcElement || event.currentTarget;
        if (!this.elementRef.nativeElement.parentNode.contains(target)) {
            this.hideMenu = true;
        }
    }



    selectItem(item: IHeaderMenuItem) {
        if (!item) {
            return;
        }

        this.menu.menuItems.forEach(x => x.selected = false);

        item.selected = true;
        item.marked = true;
        this.selectedItem = item;


    }
}


