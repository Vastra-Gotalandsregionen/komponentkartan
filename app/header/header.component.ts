import { Component, AfterViewInit } from "@angular/core"

@Component({
    selector: "vgr-header",
    templateUrl: "/app/header/header.component.html"
})

export class HeaderComponent {
    systemColor: string;

    ngAfterViewInit() {
        this.systemColor = "neutral";
      
    }
}