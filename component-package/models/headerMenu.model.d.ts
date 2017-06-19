
export interface IHeaderMenu {
    title: string;
    expanded: boolean;
    groups: IHeaderMenuGroup[];
    isExpandable: boolean;
}

export interface IHeaderMenuGroup {
    menuItems: IHeaderMenuItem[];
}

export interface IHeaderMenuItem {
    title: string;
    url: string;
    menuItems: IHeaderMenuItem[];
    expanded: boolean;
    isSeparator: boolean;
}