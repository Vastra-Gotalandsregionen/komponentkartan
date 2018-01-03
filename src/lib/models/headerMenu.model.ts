import { ISelectableItem } from './selectableItem.model';

export interface IHeaderMenu {
    expanded: boolean;
    menuItems: IHeaderMenuItem[];
}

export interface IHeaderMenuGroup {
    menuItems: IHeaderMenuItem[];
}

export interface IHeaderMenuItem extends ISelectableItem {
    url: string;
    menuItems: IHeaderMenuItem[];
    expanded: boolean;
    isSeparator: boolean;
    isInternalLink: boolean;
    marked: boolean;
    selected: boolean;
}
