import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import {
    DropdownItem, SelectableItem, ModalService,
    ModalButtonConfiguration, IHeaderMenu,
    IHeaderMenuItem, NotificationType, NotificationIcon
} from '../../lib/index';

// 3rd Party
import * as $ from 'jquery';

@Component({
    moduleId: module.id,
    selector: 'vgr-komponentkarta',
    templateUrl: 'komponentkarta.component.html'
})
export class KomponentkartaComponent implements AfterViewInit {
    // Enum declarations
    public NotificationTypes = NotificationType;
    public NotificationIcons = NotificationIcon;

    maxDate: Date = new Date(2018, 7, 1);

    selectedThemeOption: string;
    themeOptions: SelectableItem<string>[];
    dropDownItems25: DropdownItem<string>[];
    dropDownItems200: DropdownItem<string>[];
    dropDownItems9: DropdownItem<string>[];
    dropDownItems6: DropdownItem<string>[];
    dropDownItems7: DropdownItem<string>[];
    dropDownItems4: DropdownItem<string>[];
    dropMultipleDownItems8: DropdownItem<string>[];
    dropDownItems10: DropdownItem<string>[];
    dropDownItems25All: DropdownItem<string>[];
    buttonDisabled: boolean;
    buttonSecondaryDisabled: boolean;
    selectedRadioOption: SelectableItem<number>;
    saveCancelMessage: string;
    lockMessage: string;
    actionPanelMessage: string;
    actionInProgress: boolean;
    headerMenu: IHeaderMenu;
    lastModalAnswer: string;
    lastMultipleSelection: string;
    lastSingleSelection: string;
    expanded: boolean;
    isReadonlyAndDisabled: boolean;
    isReadonlyAndDisabledMulti: boolean;
    constructor(private modalService: ModalService) {
        this.isReadonlyAndDisabled = true;
        this.isReadonlyAndDisabledMulti = true;
        this.dropDownItems25 = this.getDemoItems(25);
        this.dropDownItems200 = this.getDemoItems(200);
        this.dropDownItems4 = this.getDemoItems(4);
        this.dropDownItems7 = this.getDemoItems(7);
        this.dropDownItems6 = this.getDemoItems(6);
        this.dropMultipleDownItems8 = this.getDemoItems(8);
        this.dropDownItems9 = this.getDemoItems(9);
        this.dropDownItems10 = this.getDemoItems(10);
        this.buttonDisabled = true;
        this.buttonSecondaryDisabled = true;
        this.saveCancelMessage = 'Ingen';
        this.lockMessage = 'Ingen';
        this.actionPanelMessage = '';
        this.themeOptions = [
            { value: 'neutral', displayName: 'Neutral (grå)', selected: true } as SelectableItem<string>,
            { value: 'blue', displayName: 'BMM (blå)' } as SelectableItem<string>,
            { value: 'red', displayName: 'VGPV (röd)' } as SelectableItem<string>,
            { value: 'green', displayName: 'Rehab (grön)' } as SelectableItem<string>,
        ] as SelectableItem<string>[];
        this.selectedThemeOption = this.themeOptions[0].value;
        this.selectedRadioOption = { displayName: 'Inget', value: 0 } as SelectableItem<number>;
        this.actionInProgress = false;
        this.headerMenu = {
            menuItems: [
                { displayName: 'Test' } as IHeaderMenuItem] as IHeaderMenuItem[]
        } as IHeaderMenu;

        // Lägg til med fördröjning för att återskapa problem vi haft med laddning från service

        // setTimeout(() => {
        //     this.dropDownItems25All = this.getDemoItems(25);
        //     this.dropDownItems25All[1].selected = true;

        // }, 1000);

        this.dropDownItems25All = this.getDemoItems(25);
        this.dropDownItems25All[1].selected = true;

        this.lastMultipleSelection = 'Inget';
        this.lastSingleSelection = 'Inget';

        this.dropDownItems200[3].selected = true;

        this.dropMultipleDownItems8[0].selected = true;
        this.dropMultipleDownItems8[1].selected = true;
        this.dropMultipleDownItems8[2].selected = true;

        this.dropDownItems9[7].selected = true;
    }

    showOneButtonModal() {
        this.modalService.openDialog('Detta är en dialog med en knapp', 'Här kan du bara välja ett alternativ',
            new ModalButtonConfiguration('OK', () => this.lastModalAnswer = 'OK')
        );
    }

    onLock1Changed(locked: boolean) {
        this.lockMessage = 'Lås 1 ' + (locked ? 'låst' : 'upplåst');
    }

    onLock2Changed(locked: boolean) {
        this.lockMessage = 'Lås 2 ' + (locked ? 'låst' : 'upplåst');
    }


    showTwoButtonModal() {
        this.modalService.openDialog('Acceptera villkor',
            'Denna fil innehåller personnummer på de personer som valt er vårdcentral tom 2017-01-31. ' +
            'För nedladdning av filen gäller följande villkor' +
            '1. Innehållet i filen får inte behandlas i strid med personuppgiftslagen (PuL) och patient-datalagen (PdL). ' +
            'Informationen får därför inte användas för annat ändamål än det för vilket uppgifterna samlats in ' +
            '(9 § punkt c och d PuL och 2 kap. 4 § PdL). ' +
            'Detta innebär bland annat att uppgifterna inte får användas för massutskick eller marknadsföring. ' +
            '2. Verksamhetschefen ansvarar för att endast den senaste månadens fil används för eventuell bearbetning av informationen. ' +
            'För att acceptera båda villkoren ovan, tryck [Jag accepterar] annars tryck [Avbryt]' +
            'Notera att systemet bokför vem som accepterat villkoren och tidpunkten för detta.' +
            'Notera även att alla register i verksamheten ska vara anmälda till utsett personuppgiftsombud eller Datainspektionen.',
            new ModalButtonConfiguration('Jag accepterar', () => this.lastModalAnswer = 'Jag accepterar'),
            new ModalButtonConfiguration('Avbryt', () => this.lastModalAnswer = 'Avbryt'),
        );
    }


    showThreeButtonModal() {
        this.modalService.openDialog('Vill du spara innan du stänger?', 'Ändringarna går förlorade om du inte sparar dem',
            new ModalButtonConfiguration('Ja', () => this.lastModalAnswer = 'Ja'),
            new ModalButtonConfiguration('Nej', () => this.lastModalAnswer = 'Nej'),
            new ModalButtonConfiguration('Avbryt', () => this.lastModalAnswer = 'Avbryt')
        );
    }

    showSaveDontSaveCancelModal() {
        this.modalService.openSaveDontSaveCancelDialog('Vill du spara innan du stänger?', 'Ändringarna går förlorade om du inte sparar.',
            () => this.lastModalAnswer = 'Sparade', () => this.lastModalAnswer = 'Sparade inte', () => this.lastModalAnswer = 'Avbröt');
    }

    selectedThemeChanged(selectedTheme: string) {
        const themeClass = 'theme--' + selectedTheme;
        document.getElementById('theme-root').classList.remove('theme--neutral');
        document.getElementById('theme-root').classList.remove('theme--blue');
        document.getElementById('theme-root').classList.remove('theme--red');
        document.getElementById('theme-root').classList.remove('theme--green');
        document.getElementById('theme-root').classList.add(themeClass);

    }

    private getDemoItems(numberOfItems: number): DropdownItem<string>[] {
        const items: DropdownItem<string>[] = [];
        for (let i = 1; i <= numberOfItems; i++) {
            items.push({ value: i.toString(), displayName: `${i} - Södra hälso- och sjukvårdsnämnd`, displayNameWhenSelected: `Alt ${i}` } as DropdownItem<string>);
        }
        return items;
    }

    onSelectedRadioOptionChanged(optionValue: number) {
        this.selectedRadioOption.value = optionValue;
    }
    consoleLog(logText: string) {
    }

    ngAfterViewInit() {
        $('.with-classes').each((item: number, e: Element) => {
            const classes = e.classList;
            let classDescription = '';
            for (let i = 0; i < classes.length; i++) {
                if (classes[i] !== 'with-classes' && classes[i] !== 'flex-pull-right') {
                    classDescription += `.${classes[i]} `;
                }
            }

            (e as HTMLElement).title = classDescription;
            (e as HTMLElement).innerHTML += `<div class='class-description'>${classDescription}</div>`;
        });
    }

    toggleClasses() {
        $('.class-description').fadeToggle();
    }

    onMultipleSelectionChanged(selectedItems: string[]) {
        this.lastMultipleSelection = selectedItems.join(',');
    }

    onSingleSelectionChanged(selectedItem: string) {
        this.lastSingleSelection = selectedItem;
    }
}
