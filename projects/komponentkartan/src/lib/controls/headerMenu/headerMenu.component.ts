import { Component, Input, ElementRef, HostListener } from '@angular/core';
import { IHeaderMenu, IHeaderMenuItem } from '../../models/headerMenu.model';

@Component({
    selector: 'vgr-header-menu',
    templateUrl: './headerMenu.component.html'
})

export class HeaderMenuComponent {
    @Input() menu: IHeaderMenu;
    hidden: boolean;
    selectedItem: IHeaderMenuItem;

    constructor(private elementRef: ElementRef) {
        this.hidden = true;
    }

    toggleHeaderMenu(event: MouseEvent|any) {
        this.hidden = !this.hidden;

        if (event.target && event.target.nodeName === 'A') {
            event.target.click();
        }

        if (!this.hidden) {
            event.cancelBubble = true;
        }
    }

    toggleSubMenu(item: IHeaderMenuItem) {
        item.expanded = !item.expanded;

        event.cancelBubble = true;
    }

    @HostListener('document:mousedown', ['$event'])
    onDocumentClick(event: any) {
        const target = event.target || event.srcElement || event.currentTarget;

        if (!this.elementRef.nativeElement.contains(target)) {
            this.hidden = true;
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


