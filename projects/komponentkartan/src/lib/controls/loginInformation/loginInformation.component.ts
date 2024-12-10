import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'vgr-login-information',
    templateUrl: './loginInformation.component.html',
    standalone: false
})

export class LoginInformationComponent {
    @Input() userName: string;
    @Input() initials: string;
    @Input() textColor: string;
    @Input() circleColor: string;
}
