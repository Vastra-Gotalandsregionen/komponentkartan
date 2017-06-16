import { Component, AfterViewInit, ViewChild } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { ISelectableItem } from "../component-package/models/selectableItem.model";
import { IMenu, IMenuGroup, IMenuItem } from "../component-package/models/menu.model";

@Component({
    selector: "komponentkartan-application",
    templateUrl: "/demo-app/app.component.html"
})

export class KomponentkartanApplicationComponent implements AfterViewInit {
    selectedTheme: string;
    @ViewChild(HeaderComponent) header: HeaderComponent;
    menus: IMenu[];
    constructor() {
        this.selectedTheme = "neutral";
        this.menus = [
            {
                title: "Innehåll",
                groups: [
                    {
                        order: "0",
                        menuItems: [
                            { title: "Komponenter", url: "/komponentkartan" } as IMenuItem,
                        ] as IMenuItem[]
                    } as IMenuGroup
                ] as IMenuGroup[]
            } as IMenu,


        ] as IMenu[];
    }

    onSelectedMenuChanged(newMenu: string) {
        console.log(newMenu);
    }

    selectedThemeChanged(theme: ISelectableItem) {
        console.log(this.header);
        this.header.changeTheme(theme.id);
    }

    ngAfterViewInit() {

    }
}


