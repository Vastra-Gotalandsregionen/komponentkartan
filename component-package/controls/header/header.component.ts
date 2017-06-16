import { Component, AfterViewInit } from "@angular/core"

@Component({
    selector: "vgr-header",
    moduleId: module.id,
    templateUrl: "./header.component.html"
})

export class HeaderComponent {
    systemColor: string;

    ngAfterViewInit() {
        this.systemColor = "neutral";

    }
}