import { Component, Input } from "@angular/core"

@Component({
    selector: "vgr-login-information",
    moduleId: module.id,
    templateUrl: "./loginInformation.component.html",
    host: { 'class': 'login-info header-menu__trigger' }
})

export class LoginInformationComponent {
    @Input() userName: string;
    constructor() {
        this.userName = "Not set";
    }

}