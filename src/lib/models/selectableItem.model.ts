export interface SelectableItem<TValue> {
    displayName: string;
    value: TValue;
    selected?: boolean;
    disabled?: boolean;
    ariaid?: string;
}

export interface ISelectableItem {
    displayName: string;
    id: string;
    selected?: boolean;
    disabled?: boolean;
    ariaid?: string;
}
