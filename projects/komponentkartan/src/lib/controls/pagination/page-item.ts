export interface PageItem {
    label: string;
    active: boolean;
    action: () => void;
}