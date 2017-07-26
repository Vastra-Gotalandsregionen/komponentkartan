import { Component, AfterViewInit, EventEmitter, Output } from "@angular/core";
import { IDropdownItem } from "../../component-package/models/dropdownItem.model";
import { ISelectableItem } from "../../component-package/models/selectableItem.model";
import { ModalService, ModalButtonConfiguration } from "../../component-package/services/modalService";
import { IHeaderMenu, IHeaderMenuItem } from "../../component-package/models/headerMenu.model";

@Component({
    selector: "vgr-komponentkarta",
    templateUrl: "/demo-app/komponentkarta/komponentkarta.component.html"
})
export class KomponentkartaComponent implements AfterViewInit {
    selectedThemeOption: ISelectableItem;
    themeOptions: ISelectableItem[];
    dropDownItems25: IDropdownItem[];
    dropDownItems9: IDropdownItem[];
    dropDownItems8: IDropdownItem[];
    dropDownItems25All: IDropdownItem[];
    buttonDisabled: boolean;
    buttonSecondaryDisabled: boolean;
    selectedRadioOption: ISelectableItem;
    saveCancelMessage: string;
    lockMessage: string;
    actionPanelMessage: string;
    actionInProgress: boolean;
    headerMenu: IHeaderMenu;
    lastModalAnswer: string;
    constructor(private modalService: ModalService) {
        this.dropDownItems25 = this.getDemoItems(25);
        this.dropDownItems8 = this.getDemoItems(8);
        this.dropDownItems9 = this.getDemoItems(9);
        this.buttonDisabled = true;
        this.buttonSecondaryDisabled = true;
        this.saveCancelMessage = "Ingen";
        this.lockMessage = "Ingen";
        this.actionPanelMessage = "";
        this.themeOptions = [
            { id: "default", displayName: "Neutral (grå)" } as ISelectableItem,
            { id: "blue", displayName: "BMM (blå)" } as ISelectableItem,
            { id: "red", displayName: "VGPV (röd)" } as ISelectableItem,
            { id: "green", displayName: "Rehab (grön)" } as ISelectableItem,
        ] as ISelectableItem[];
        this.selectedThemeOption = this.themeOptions[0];
        this.selectedRadioOption = { displayName: "Inget" } as ISelectableItem;
        this.actionInProgress = false;
        this.headerMenu = {
            menuItems: [
                { displayName: "Test" } as IHeaderMenuItem] as IHeaderMenuItem[]
        } as IHeaderMenu;

        //Lägg til med fördröjning för att återskapa problem vi haft med laddning från service
        this.dropDownItems25All = this.getDemoItems(1);
        setTimeout(() => {
            this.dropDownItems25All = this.getDemoItems(25);

        }, 1000);
    }

    showOneButtonModal() {
        this.modalService.openDialog("Detta är en dialog med en knapp", "Här kan du bara välja ett alternativ",
            new ModalButtonConfiguration("OK", () => this.lastModalAnswer = "OK")
        );
    }


    showTwoButtonModal() {
        this.modalService.openDialog("Vill du spara ändringarna på användaren?", "Ändringarna går förlorade om du inte sparar dem.",
            new ModalButtonConfiguration("Ja", () => this.lastModalAnswer = "Ja"),
            new ModalButtonConfiguration("Nej", () => this.lastModalAnswer = "Nej"),
        );
    }


    showThreeButtonModal() {
        this.modalService.openDialog("Vill du spara innan du stänger?", "Ändringarna går förlorade om du inte sparar dem",
            new ModalButtonConfiguration("Ja", () => this.lastModalAnswer = "Ja"),
            new ModalButtonConfiguration("Nej", () => this.lastModalAnswer = "Nej"),
            new ModalButtonConfiguration("Avbryt", () => this.lastModalAnswer = "Avbryt")
        );
    }

    showSaveDontSaveCancelModal() {
        this.modalService.openSaveDontSaveCancelDialog("Vill du spara innan du stänger?", "Ändringarna går förlorade om du inte sparar.",
            () => this.lastModalAnswer = "Sparade", () => this.lastModalAnswer = "Sparade inte", () => this.lastModalAnswer = "Avbröt");
    }

    private onActionStarted() {

        this.actionPanelMessage = "";
        this.actionInProgress = true;
    }

    private onActionEnded() {
        this.actionInProgress = false;
    }

    private selectedThemeChanged(selectedTheme: ISelectableItem) {
        var systemName = selectedTheme.id === "default" ? "neutral"
            : selectedTheme.id === "blue" ? "bmm"
                : selectedTheme.id === "red" ? "vgpv"
                    : selectedTheme.id === "green" ? "rehab" : "neutral";

        $('.main-content').removeClass('theme--blue theme--red theme--neutral theme--green');
        $('.main-content').addClass('theme--' + selectedTheme.id);

        $('.menu').removeClass('menu--neutral menu--bmm menu--vgpv menu--rehab');
        $('.menu').addClass('menu--' + systemName);


        $('.site-header-vgr').not(".header--inline").removeClass('site-header-vgr--default site-header-vgr--blue site-header-vgr--red site-header-vgr--green');
        $('.site-header-vgr').not(".header--inline").addClass('site-header-vgr--' + selectedTheme.id);
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