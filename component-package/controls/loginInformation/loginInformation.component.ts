import { Component, Input, HostBinding } from '@angular/core'

@Component({
    selector: 'vgr-login-information',
    moduleId: module.id,
    templateUrl: './loginInformation.component.html'
})

export class LoginInformationComponent {
    @HostBinding('class.login-info')
    @Input() userName: string;
    constructor() {
        this.userName = 'Not set';
    }
}
