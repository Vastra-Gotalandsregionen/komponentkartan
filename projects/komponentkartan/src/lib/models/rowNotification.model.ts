import { NotificationType } from './notificationType.model';
import { NotificationIconTypes } from './notificationIconTypes';


export interface RowNotification {
    icon: NotificationIconTypes;
    type: NotificationType;
    message: string;
    done: boolean;
    removeWhenDone: boolean;
}
