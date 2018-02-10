import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'vgr-menu-container',
    templateUrl: './menu-container.component.html'
})
export class MenuContainerComponent {
    @HostBinding('class.sidemenu') hasClass = true;

    constructor() { }

}
