export interface PageItem {
    label: string;
    active: boolean;
    tabindex: number;
    action: () => void;
}