import { Input, Component, HostBinding } from '@angular/core';

@Component({
    selector: 'vgr-menu-item',
    templateUrl: './menu-item.component.html'
})
export class MenuItemComponent {
    @HostBinding('class.menu-item') hasClass = true;


    @Input() text: string;
    @Input() link: string;
    @Input() disabled = false;
    @Input() disabledTooltip?: boolean;
    @Input() notification?: number;

    constructor() { }

}
