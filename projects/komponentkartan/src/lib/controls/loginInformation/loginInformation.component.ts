import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'vgr-login-information',
    templateUrl: './loginInformation.component.html'
})

export class LoginInformationComponent {
    @HostBinding('class.login-info')
    @Input() userName: string;
    @Input() textColor: string;
    @Input() circleColor: string;
    constructor() {
        this.userName = 'Not set';
    }
}
