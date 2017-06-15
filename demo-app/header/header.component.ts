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
    changeTheme(theme: string) {
        console.log(theme);
        if (theme === "neutral")
            this.systemColor = "neutral";
        else if (theme === "blue")
            this.systemColor = "BMM";
        else if (theme === "red")
            this.systemColor = "VGPV";
        else if (theme === "green")
            this.systemColor = "Rehab";

    }
}