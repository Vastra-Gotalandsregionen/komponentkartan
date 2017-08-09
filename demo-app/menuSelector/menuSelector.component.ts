import { Component, Output, EventEmitter } from "@angular/core";
import { ISelectableItem } from "../../component-package/models/selectableItem.model";


@Component({
    moduleId: module.id,
    selector: "menu-selector",
    templateUrl: "menuSelector.component.html",
    styles: [':host {    position: absolute;    top: 10;    top: 76px;    left: 23px;    z-index: 50;}'],
    host: { "class": "menu-selector" }
})
export class MenuSelectorComponent {
    menuOptions: ISelectableItem[];
    @Output() menuSelected: EventEmitter<number> = new EventEmitter<number>();
    constructor() {
        this.menuOptions = [{ id: "1", displayName: "En" } as ISelectableItem, { id: "3", displayName: "Flera" } as ISelectableItem] as ISelectableItem[];
    }

    onSelectedMenuChanged(selectedMenu: ISelectableItem) {
        this.menuSelected.emit(parseInt(selectedMenu.id));
    }
}