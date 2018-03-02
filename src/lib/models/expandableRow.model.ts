import { RowNotification } from './rowNotification.model';
import { NotificationType } from './notificationType.model';

export class ExpandableRow<TPreview, TFull> {
    previewObject: TPreview;
    fullObject: TFull;
    private _notification: RowNotification; //the permanentNofication

    constructor(previewObject: TPreview) {
        this.previewObject = previewObject;
    }
    setNotification(message: string, icon: string) {
        this._notification = { icon: icon, message: message, type: NotificationType.Permanent } as RowNotification;
    }

    notification(): RowNotification {
        return this._notification;
    }

    notifyOnCollapse(message: string, icon: string, clearNotification: boolean = false) {
        this._notification = { icon: icon, message: message, type: NotificationType.ShowOnCollapse, removeWhenDone: clearNotification } as RowNotification;
    }

    notifyOnRemove(message: string, icon: string) {
        this._notification = { icon: icon, message: message, type: NotificationType.ShowOnRemove } as RowNotification;
    }

    removeNotifiaction() {
        this._notification = null;
    }
}
