import { RowNotification } from './rowNotification.model';
import { NotificationType } from './notificationType.model';

export class ExpandableRow<TPreview, TFull> {
    previewObject: TPreview;
    fullObject: TFull;
    notification: RowNotification;

    constructor(previewObject: TPreview) {
        this.previewObject = previewObject;
    }
    notifyOnCollapse(message: string, icon: string) {
        this.notification = { icon: icon, message: message, type: NotificationType.ShowOnCollapse } as RowNotification;
    }

    notifyOnRemove(message: string, icon: string) {
        this.notification = { icon: icon, message: message, type: NotificationType.ShowOnRemove } as RowNotification;
    }
}
