import { Component, EventEmitter, Output, AfterContentInit, ContentChild } from '@angular/core';
import { ExpandableRow } from '../../component-package/models/expandableRow.model';
import { NotificationIcon } from '../../component-package/models/notificationIcon.model';
import { RowNotification } from '../../component-package/models/rowNotification.model';
import { NotificationType } from '../../component-package/models/notificationType.model';
import { ModalService } from '../../component-package/services/modalService';
import { ModalButtonConfiguration } from '../../component-package/services/modalService';
import { SortDirection } from '../../component-package/controls/list/list-column-header.component';
import { SortChangedArgs, ListHeaderComponent } from '../../component-package/controls/list/list-header.component';
import { setTimeout } from 'core-js/library/web/timers';

@Component({
    moduleId: module.id,
    selector: 'vgr-lists',
    templateUrl: 'lists.component.html'
})
export class ListsComponent {
    sortDirections = SortDirection;
    actionPanelVisible: boolean;
    public peopleRows: ExpandableRow<ExamplePerson, ExamplePerson>[];
    public cardUnlocked: boolean;
    public cardRow: ExpandableRow<string, string> = new ExpandableRow<string, string>('Foo');
    get netAmount(): number {
        if (isNaN(this.grossAmount) || isNaN(this.taxPercent)) {
            return NaN;
        } else {
            return this.grossAmount - ((this.taxPercent / 100) * this.grossAmount);
        }
    }
    public grossAmount: number;
    public taxPercent: number;
    public selectedDate: Date;

    public initialDate: Date = new Date();
    public initialFromDate: Date = new Date(2017, 1, 20);
    public initialToDate: Date = new Date(2017, 10, 20);

    public claimRows: ExpandableRow<any, any>[];

    constructor(private modalService: ModalService) {
        const examplePeople = [
            { id: '1', firstName: 'Adam', lastName: 'Andersson', organisations: ['Team 1', 'Team 2'] } as ExamplePerson,
            { id: '2', firstName: 'Bjarne', lastName: 'Bengtsson', organisations: ['Team 1'], canBeDeleted: true } as ExamplePerson,
            { id: '3', firstName: 'Carola', lastName: 'Claesson', organisations: ['Team 1', 'Team 2', 'Team 3'] } as ExamplePerson,
            { id: '4', firstName: 'Daniella', lastName: 'Di Maria Marquez ', organisations: ['Team 4'], canBeDeleted: true } as ExamplePerson,
            { id: '5', firstName: 'Erik', lastName: '', organisations: ['Team 2', 'Team 4'] } as ExamplePerson,
        ];




        this.grossAmount = 15000;
        this.taxPercent = 32;

        //this.loadItems();
        this.peopleRows = examplePeople.map(x => new ExpandableRow<ExamplePerson, ExamplePerson>(x));

        this.peopleRows[0].notification = { message: 'Information saknas', icon: NotificationIcon.ExclamationRed, type: NotificationType.Permanent } as RowNotification;
        this.peopleRows[4].notification = { message: 'Personen är inaktiv', icon: NotificationIcon.Exclamation, type: NotificationType.Permanent } as RowNotification;
    }

    loadItems() {

        this.claimRows = [
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 122300200112', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 122343242342', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 1223424242', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 12232342342', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 12232342344', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 12231111222', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 122312135654', payableAmount: 200, issueDate: new Date(), visits: undefined }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 12230098667', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 1223654767', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 12237567567', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 1223567567', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 12234534w345', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 122353453453', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 122334534534', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 122334534534', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] })];



    }


    onSortChanged(event: SortChangedArgs) {
        this.peopleRows = this.peopleRows.sort((row1, row2) => {
            return row1.previewObject[event.key] > row2.previewObject[event.key] ? (event.direction === SortDirection.Ascending ? 1 : -1) :
                row1.previewObject[event.key] < row2.previewObject[event.key] ? (event.direction === SortDirection.Ascending ? -1 : 1) : 0;
        });
    }

    removeRow(row: ExpandableRow<ExamplePerson, ExamplePerson>) {
        this.modalService.openDialog('Ta bort person', 'Vill du verkligen ta bort ' + row.previewObject.firstName + '?',
            new ModalButtonConfiguration('Ja', () => {

                row.notifyOnRemove(row.previewObject.firstName + ' togs bort och kommer inte längre att kunna logga in', NotificationIcon.Ok);
                row.previewObject.deleted = true;
            }),
            new ModalButtonConfiguration('Nej', () => { }));
    }


    removeRowWithoutExpand(row: ExpandableRow<ExamplePerson, ExamplePerson>, event: Event) {
        event.cancelBubble = true;
        this.modalService.openDialog('Ta bort person', 'Vill du verkligen ta bort ' + row.previewObject.firstName + '?',
            new ModalButtonConfiguration('Ja', () => {
                row.notifyOnRemove(row.previewObject.firstName + ' togs bort och kommer inte längre att kunna logga in', NotificationIcon.Ok);
                row.previewObject.deleted = true;
            }),
            new ModalButtonConfiguration('Nej', () => { }));
    }

    removeCardRow(row: ExpandableRow<string, string>) {
        this.modalService.openDialog('Ta bort rad', 'Vill du verkligen ta bort raden?',
            new ModalButtonConfiguration('Ja', () => {
                row.notifyOnRemove('Raden togs bort', NotificationIcon.Ok);
            }),
            new ModalButtonConfiguration('Nej', () => { }));
    }

    savePerson(row: ExpandableRow<ExamplePerson, ExamplePerson>) {
        row.notifyOnCollapse(row.previewObject.firstName + ' sparades', NotificationIcon.OkGreen);
    }

    cardSaved() {
        this.cardUnlocked = false;
        this.cardRow.notifyOnCollapse('Användaren sparades', NotificationIcon.OkGreen);
    }

    cardCancelled() {
        this.cardUnlocked = false;
        this.cardRow.notifyOnCollapse('Åtgärden avbröts', NotificationIcon.Ok);
    }

    onCardUnlocked() {
        this.cardUnlocked = true;
    }

    onSelectRowChanged(row: ExpandableRow<ExamplePerson, ExamplePerson>) {
        console.log('select row: ', row);
    }

    onDeleteRow(row: ExpandableRow<ExamplePerson, ExamplePerson>) {
        console.log('delete row: ', row);
    }
}

export interface ExamplePerson {
    id: string;
    firstName: string;
    lastName: string;
    organisations: string[];
    canBeDeleted: boolean;
    deleted: boolean;
}


