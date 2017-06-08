import { Component, AfterViewInit } from "@angular/core";
import { IDropdownItem } from "../../component-package/models/dropdownItem.model";
import { ISelectableItem } from "../../component-package/models/selectableItem.model";

@Component({
    selector: "komponentkarta",
    templateUrl: "/demo-app/komponentkarta/komponentkarta.component.html"
})
export class KomponentkartaComponent implements AfterViewInit {
    dropDownItems25: IDropdownItem[];
    dropDownItems9: IDropdownItem[];
    dropDownItems8: IDropdownItem[];
    dropDownItems25All: IDropdownItem[];
    buttonDisabled: boolean;
    selectedRadioOption: ISelectableItem;
    saveCancelMessage: string;
    lockMessage: string;
    constructor() {
        this.dropDownItems25 = this.getDemoItems(25);
        this.dropDownItems25All = this.getDemoItems(25);
        this.dropDownItems8 = this.getDemoItems(8);
        this.dropDownItems9 = this.getDemoItems(9);
        this.buttonDisabled = true;
        this.saveCancelMessage = "Ingen";
        this.lockMessage = "Ingen";
        this.selectedRadioOption = { displayName: "Inget" } as ISelectableItem;
    }

    private getDemoItems(numberOfItems: number): IDropdownItem[] {
        var items: IDropdownItem[] = [];
        for (var i = 1; i <= numberOfItems; i++) {
            items.push({ id: i.toString(), displayName: `Långt namn ${i}`, displayNameWhenSelected: `Alt ${i}` } as IDropdownItem);
        }
        return items;
    }

    onSelectedRadioOptionChanged(option: ISelectableItem) {
        this.selectedRadioOption = option;
    }
    consoleLog(logText: string) {
        console.log(logText);
    }

    ngAfterViewInit() {
        $(".with-classes").each((item: number, e: Element) => {
            var classes = e.classList;
            var classDescription = "";
            for (var i = 0; i < classes.length; i++) {
                if (classes[i] !== "with-classes" && classes[i] !== "flex-pull-right")
                    classDescription += `.${classes[i]} `;
            }

            (e as HTMLElement).title = classDescription;
            (e as HTMLElement).innerHTML += `<div class='class-description'>${classDescription}</div>`;
        });
    }

    toggleClasses() {
        $(".class-description").fadeToggle();
    }


}