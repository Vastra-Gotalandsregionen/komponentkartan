import { Component, AfterViewInit, Input } from "@angular/core"

@Component({
    selector: "vgr-header",
    moduleId: module.id,
    templateUrl: "./header.component.html"
})

export class HeaderComponent {
    systemColor: string;
    @Input() userName: string;

    constructor() {
        this.systemColor = "neutral";
    }

}