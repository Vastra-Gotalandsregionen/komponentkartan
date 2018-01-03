import { ISelectableItem } from './selectableItem.model'

export interface IDropdownItem extends ISelectableItem {
    displayNameWhenSelected: string;
    marked: boolean;
}