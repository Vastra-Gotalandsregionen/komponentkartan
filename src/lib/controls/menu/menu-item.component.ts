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
    @Input() notification: string;
    @Input() notificationColor: string;
    @Input() notificationTooltip: string;

    get notificationColorClass(): string {
        return 'notification--' + this.notificationColor;
    }

    get notificationText(): string {
        return this.notification && this.notification.length > 2 ? '!' : this.notification;
    }

    constructor() { }
}
