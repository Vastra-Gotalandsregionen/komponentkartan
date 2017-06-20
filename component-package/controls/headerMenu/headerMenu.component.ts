import { Component, Input, ElementRef } from "@angular/core"
import { IHeaderMenu } from "../../models/headermenu.model"

@Component({
    selector: "vgr-header-menu",
    moduleId: module.id,
    templateUrl: "./headerMenu.component.html",
    host: {
        '(document:click)': "onDocumentClick($event)"
    }
})

export class HeaderMenuComponent {
    @Input() menu: IHeaderMenu[];
    hidden: boolean;
    
    constructor(private elementRef: ElementRef) {
        this.hidden = false;
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

    onDocumentClick(event: any) {
        let target = event.target || event.srcElement || event.currentTarget;

        if (!this.elementRef.nativeElement.contains(target)) {
            this.hidden = true;
        }
    }
}


