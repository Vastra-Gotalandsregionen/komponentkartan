export interface PageItem {
    label: string;
    active: boolean;
    tabindex: number;
    buttonIndex: number;
    action: () => void;
}