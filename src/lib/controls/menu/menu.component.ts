import { Input, Component, HostBinding } from '@angular/core';

@Component({
    selector: 'vgr-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent {

    @Input() title: string;

    @HostBinding('class.menu') hasClass = true;

    constructor() { }

}
