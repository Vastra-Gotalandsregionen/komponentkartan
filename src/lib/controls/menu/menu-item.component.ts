import { Input, Component } from '@angular/core';

@Component({
    selector: 'vgr-menu-item',
    templateUrl: './menu-item.component.html'
})
export class MenuItemComponent {
    @Input() text: string;
    @Input() link: string;
    @Input() disabled = false;
    @Input() disabledTooltip?: boolean;
    @Input() notification?: MenuItemNotification;

    get notificationColor(): string {
        return 'notification--' + this.notification.color;
    }

    constructor() { }


}

class MenuItemNotification {
    color: string;
    text: string;
    tooltip: string;
}
