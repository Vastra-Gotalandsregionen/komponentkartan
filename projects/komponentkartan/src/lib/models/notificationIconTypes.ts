
// export type NotificationIconTypes = 'pen' | 'comment-dots' | 'trash-alt' | 'check-circle' | 'question-circle' | 'exclamation-circle'


export interface NotificationIconTypes {
    name: 'pen' | 'comment-dots' | 'trash-alt' | 'check-circle' | 'question-circle' | 'exclamation-circle';
    size?: string;
    color?: 'success' | 'error';
    solid?: boolean;
    disabled?: boolean;
}

