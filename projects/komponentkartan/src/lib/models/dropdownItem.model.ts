import { SelectableItem } from './selectableItem.model';

export interface DropdownItem<TValue> extends SelectableItem<TValue> {
    displayNameWhenSelected?: string;
    marked?: boolean;
}
