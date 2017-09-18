import { RowNotification } from './rowNotification.model';
import { NotificationIcon } from './notificationIcon.model';
import { NotificationType } from './notificationType.model';

export class ExpandableRow<T> {
    object: T;
    notification: RowNotification;

    constructor(object: T) {
        this.object = object;
    }
    notifyOnCollapse(message: string, icon: NotificationIcon) {
        this.notification = { icon: icon, message: message, type: NotificationType.ShowOnCollapse } as RowNotification;
    }
}
