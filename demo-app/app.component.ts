import { Component, AfterViewInit, ViewChild } from "@angular/core";
import { ISelectableItem } from "../component-package/models/selectableItem.model";
import { IMenu, IMenuGroup, IMenuItem } from "../component-package/models/menu.model";

@Component({
    selector: "komponentkartan-application",
    templateUrl: "/demo-app/app.component.html"
})

export class KomponentkartanApplicationComponent implements AfterViewInit {
    selectedTheme: string;
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

    ngAfterViewInit() {

    }
}


