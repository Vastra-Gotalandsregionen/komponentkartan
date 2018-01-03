import { NotificationType } from './notificationType.model';
import { NotificationIcon } from './notificationIcon.model';

export interface RowNotification {
    icon: NotificationIcon;
    type: NotificationType;
    message: string;
    done: boolean;
}
