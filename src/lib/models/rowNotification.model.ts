import { NotificationType } from './notificationType.model';
export interface RowNotification {
    icon: string;
    type: NotificationType;
    message: string;
    done: boolean;
}
