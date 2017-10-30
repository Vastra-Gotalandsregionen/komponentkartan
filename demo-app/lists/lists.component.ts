import { Component, EventEmitter, Output, AfterContentInit, ContentChild } from '@angular/core';
import { ExpandableRow } from '../../component-package/models/expandableRow.model';
import { NotificationIcon } from '../../component-package/models/notificationIcon.model';
import { RowNotification } from '../../component-package/models/rowNotification.model';
import { NotificationType } from '../../component-package/models/notificationType.model';
import { ModalService } from '../../component-package/services/modalService';
import { ModalButtonConfiguration } from '../../component-package/services/modalService';
import { SortDirection } from '../../component-package/controls/list/list-column-header.component';
import { SortChangedArgs, ListHeaderComponent } from '../../component-package/controls/list/list-header.component';

@Component({
    moduleId: module.id,
    selector: 'vgr-lists',
    templateUrl: 'lists.component.html'
})
export class ListsComponent {
    sortDirections = SortDirection;
    actionPanelVisible: boolean;
    public peopleRows: ExpandableRow<ExamplePerson>[];
    public cardUnlocked: boolean;
    public cardRow: ExpandableRow<string> = new ExpandableRow<string>('Foo');
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


        this.peopleRows = examplePeople.map(x => new ExpandableRow<ExamplePerson>(x));

        this.peopleRows[0].notification = { message: 'Information saknas', icon: NotificationIcon.ExclamationRed, type: NotificationType.Permanent } as RowNotification;
        this.peopleRows[4].notification = { message: 'Personen är inaktiv', icon: NotificationIcon.Exclamation, type: NotificationType.Permanent } as RowNotification;
    }



    onSortChanged(event: SortChangedArgs) {
        if (event.columnTitle === 'Förnamn') {
            this.peopleRows = this.peopleRows.sort((row1, row2) => {
                return row1.object.firstName > row2.object.firstName ? (event.sortDirection === SortDirection.Ascending ? 1 : -1) :
                    row1.object.firstName < row2.object.firstName ? (event.sortDirection === SortDirection.Ascending ? -1 : 1) : 0;
            });
        } else if (event.columnTitle === 'Efternamn') {
            this.peopleRows = this.peopleRows.sort((row1, row2) => {
                return row1.object.lastName > row2.object.lastName ? (event.sortDirection === SortDirection.Ascending ? 1 : -1) :
                    row1.object.lastName < row2.object.lastName ? (event.sortDirection === SortDirection.Ascending ? -1 : 1) : 0;
            });
        }
    }

    removeRow(row: ExpandableRow<ExamplePerson>) {
        this.modalService.openDialog('Ta bort person', 'Vill du verkligen ta bort ' + row.object.firstName + '?',
            new ModalButtonConfiguration('Ja', () => {

                row.notifyOnRemove(row.object.firstName + ' togs bort och kommer inte längre att kunna logga in', NotificationIcon.Ok);
                row.object.deleted = true;
            }),
            new ModalButtonConfiguration('Nej', () => { }));
    }


    removeRowWithoutExpand(row: ExpandableRow<ExamplePerson>, event: Event) {
        event.cancelBubble = true;
        this.modalService.openDialog('Ta bort person', 'Vill du verkligen ta bort ' + row.object.firstName + '?',
            new ModalButtonConfiguration('Ja', () => {
                row.notifyOnRemove(row.object.firstName + ' togs bort och kommer inte längre att kunna logga in', NotificationIcon.Ok);
                row.object.deleted = true;
            }),
            new ModalButtonConfiguration('Nej', () => { }));
    }

    removeCardRow(row: ExpandableRow<string>) {
        this.modalService.openDialog('Ta bort rad', 'Vill du verkligen ta bort raden?',
            new ModalButtonConfiguration('Ja', () => {
                row.notifyOnRemove('Raden togs bort', NotificationIcon.Ok);
            }),
            new ModalButtonConfiguration('Nej', () => { }));
    }

    savePerson(row: ExpandableRow<ExamplePerson>) {
        row.notifyOnCollapse(row.object.firstName + ' sparades', NotificationIcon.OkGreen);
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
}

export interface ExamplePerson {
    id: string;
    firstName: string;
    lastName: string;
    organisations: string[];
    canBeDeleted: boolean;
    deleted: boolean;
}


