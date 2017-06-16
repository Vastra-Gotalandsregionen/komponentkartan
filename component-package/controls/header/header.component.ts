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

    changeTheme(menuTitle: string) {
        this.systemColor = menuTitle;
        var themeName =
            menuTitle === "BMM" ? "blue" :
                menuTitle === "VGPV" ? "red" :
                    menuTitle === "Rehab" ? "green" :
                        "neutral";

        $('.main-content').removeClass('theme--blue theme--red theme--neutral theme--green');
        $('.main-content').addClass('theme--' + themeName);


    }
}