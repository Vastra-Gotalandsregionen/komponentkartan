import { Component, AfterViewInit } from "@angular/core"

@Component({
    selector: "vgr-header",
    moduleId: module.id,
    templateUrl: "./header.component.html"
})

export class HeaderComponent {
    systemColor: string;

    constructor() {
        this.systemColor = "neutral";
    }

}