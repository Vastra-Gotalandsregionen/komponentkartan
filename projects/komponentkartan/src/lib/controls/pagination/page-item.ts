export interface PageItem {
    label: string;
    ariaLabel: string;
    active: boolean;
    tabindex: number;
    buttonIndex: number;
    action: () => void;
}