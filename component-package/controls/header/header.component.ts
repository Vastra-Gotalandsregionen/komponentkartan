import { Component, AfterViewInit, Input } from "@angular/core"

import { IHeaderMenu } from "../../models/headerMenu.model"

@Component({
    selector: "vgr-header",
    moduleId: module.id,
    templateUrl: "./header.component.html"
})

export class HeaderComponent {
    systemColor: string;
    @Input() userName: string;
    @Input() headerMenu: IHeaderMenu; 

    constructor() {
        this.systemColor = "neutral";
    }

}