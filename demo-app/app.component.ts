import { Component, AfterViewInit, ViewChild } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { ISelectableItem } from "../component-package/models/selectableItem.model";

@Component({
    selector: "komponentkartan-application",
    templateUrl: "/demo-app/app.component.html"
})

export class KomponentkartanApplicationComponent implements AfterViewInit {
    selectedTheme: string;
    @ViewChild(HeaderComponent) header: HeaderComponent;
    constructor() {
        this.selectedTheme = "neutral";
    }

    selectedThemeChanged(theme: ISelectableItem) {
        console.log(this.header);
        this.header.changeTheme(theme.id);
    }

    ngAfterViewInit() {

    }
}


