import { Component, AfterViewInit } from "@angular/core"

@Component({
    selector: "vgr-header",
    templateUrl: "/demo-app/header/header.component.html"
})

export class HeaderComponent implements AfterViewInit {
    systemColor: string;

    constructor() {
        this.systemColor = "neutral";

    }
    ngAfterViewInit() {


    }
}