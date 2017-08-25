
export interface IMenu {
    title: string;
    expanded: boolean;
    groups: IMenuGroup[];
    isExpandable: boolean;
}

export interface IMenuGroup {
    order: string;
    menuItems: IMenuItem[];
}

export interface IMenuItem {
    title: string;
    url: string;
    favourite: boolean;
    order: string;
    menuItems: IMenuItem[];
    expanded: boolean;
    visible: boolean;
    isVirtualFavourite: boolean;
    child: boolean;
    isSeparator: boolean;
}
