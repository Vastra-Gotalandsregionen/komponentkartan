export interface NotificationIconTypes {
    /**
     * 'exclamation-cirlce' kräver användning av solid: true
     * 'pen' kräver användning av solid: true
    */
   name: 'pen' | 'comment-dots' | 'trash-alt' | 'check-circle' | 'question-circle' | 'exclamation-circle';
    size?: string;
    color?: 'success' | 'error';
    solid?: boolean;
    disabled?: boolean;
}