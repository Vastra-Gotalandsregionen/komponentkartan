import { Component, AfterViewInit, Input,ElementRef,ViewChild } from "@angular/core"

import { IHeaderMenu } from "../../models/headerMenu.model"
import {HeaderMenuComponent} from "../headerMenu/headerMenu.component"

@Component({
    selector: "vgr-header",
    moduleId: module.id,
    templateUrl: "./header.component.html"
})

export class HeaderComponent {
    systemColor: string;
    @Input() userName: string;
   // @Input() headerMenu: IHeaderMenu; 

    @ViewChild(HeaderMenuComponent) headerMenu: HeaderMenuComponent;

    constructor(private elementRef:ElementRef) {
        this.systemColor = "neutral";

    }

onDocumentClick(event: any) {

        let target = event.target || event.srcElement || event.currentTarget;

        if (!this.elementRef.nativeElement.contains(target)) {
            this.headerMenu.hidden = true;
        }
    }
  
    
}

