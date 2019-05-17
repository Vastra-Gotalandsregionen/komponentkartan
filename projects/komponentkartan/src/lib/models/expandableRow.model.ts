import { RowNotification } from './rowNotification.model';
import { NotificationType } from './notificationType.model';

export class ExpandableRow<TPreview, TFull> {
    previewObject: TPreview;
    fullObject: TFull;
    notification: RowNotification; // the permanentNofication

    constructor(previewObject: TPreview) {
        this.previewObject = previewObject;
    }
    setNotification(message: string, icon: object, temporary = false) {
        const type = temporary ? NotificationType.ShowOnCollapse : NotificationType.Permanent;
        this.notification = { icon: icon, message: message, type: type } as RowNotification;
    }

    notifyOnCollapse(message: string, icon: object, clearNotification: boolean = false) {
        this.notification = { icon: icon, message: message, type: NotificationType.ShowOnCollapse, removeWhenDone: clearNotification } as RowNotification;
    }

    notifyOnRemove(message: string, icon: object) {
        this.notification = { icon: icon, message: message, type: NotificationType.ShowOnRemove } as RowNotification;
    }

    removeNotification() {
        this.notification = null;
    }
}
