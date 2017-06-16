import { Component, AfterViewInit, ViewChild } from "@angular/core";

import { ISelectableItem } from "../component-package/models/selectableItem.model";

@Component({
    selector: "komponentkartan-application",
    templateUrl: "/demo-app/app.component.html"
})

export class KomponentkartanApplicationComponent implements AfterViewInit {
    selectedTheme: string;
  
    constructor() {
        this.selectedTheme = "neutral";
    }

   

    ngAfterViewInit() {

    }
}


