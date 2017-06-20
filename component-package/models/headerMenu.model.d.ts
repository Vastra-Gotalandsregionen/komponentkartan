import { ISelectableItem } from "./selectableItem.model";

export interface IHeaderMenu {
    expanded: boolean;
    groups: IHeaderMenuGroup[];
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
}