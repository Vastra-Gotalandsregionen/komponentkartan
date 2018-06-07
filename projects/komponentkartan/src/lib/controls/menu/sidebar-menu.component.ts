import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'vgr-sidebar-menu',
    templateUrl: './sidebar-menu.component.html'
})
export class SidebarMenuComponent {
    @HostBinding('class.sidemenu') hasClass = true;

    constructor() { }

}
