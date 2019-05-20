import { RowNotification } from './rowNotification.model';
import { NotificationType } from './notificationType.model';
import { NotificationIconTypes } from './notificationIconTypes';

export class ExpandableRow<TPreview, TFull> {
    previewObject: TPreview;
    fullObject: TFull;
    notification: RowNotification; // the permanentNofication

    constructor(previewObject: TPreview) {
        this.previewObject = previewObject;
    }
    setNotification(message: string, icon: NotificationIconTypes, temporary = false) {
        const type = temporary ? NotificationType.ShowOnCollapse : NotificationType.Permanent;
        this.notification = { icon: icon, message: message, type: type } as RowNotification;
    }

    notifyOnCollapse(message: string, icon: NotificationIconTypes, clearNotification: boolean = false) {
        this.notification = { icon: icon, message: message, type: NotificationType.ShowOnCollapse, removeWhenDone: clearNotification } as RowNotification;
    }

    notifyOnRemove(message: string, icon: NotificationIconTypes) {
        this.notification = { icon: icon, message: message, type: NotificationType.ShowOnRemove } as RowNotification;
    }

    removeNotification() {
        this.notification = null;
    }
}
