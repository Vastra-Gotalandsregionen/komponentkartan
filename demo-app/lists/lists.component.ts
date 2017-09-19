import { Component } from '@angular/core';
import { ExpandableRow } from '../../component-package/models/expandableRow.model';
import { NotificationIcon } from '../../component-package/models/notificationIcon.model';
import { RowNotification } from '../../component-package/models/rowNotification.model';
import { NotificationType } from '../../component-package/models/notificationType.model';

@Component({
    moduleId: module.id,
    selector: 'vgr-lists',
    templateUrl: 'lists.component.html'
})
export class ListsComponent {
    public peopleRows: ExpandableRow<ExamplePerson>[];
    public cardUnlocked: boolean;
    public cardRow: ExpandableRow<string> = new ExpandableRow<string>('Foo');
    constructor() {
        const examplePeople = [
            { id: '1', firstName: 'Adam', lastName: 'Andersson', organisations: ['Team 1', 'Team 2'] } as ExamplePerson,
            { id: '2', firstName: 'Bjarne', lastName: 'Bengtsson', organisations: ['Team 1'] } as ExamplePerson,
            { id: '3', firstName: 'Carola', lastName: 'Claesson', organisations: ['Team 1', 'Team 2', 'Team 3'] } as ExamplePerson,
            { id: '4', firstName: 'Daniella', lastName: 'Di Maria Marquez ', organisations: ['Team 4'] } as ExamplePerson,
            { id: '5', firstName: 'Erik', lastName: '', organisations: ['Team 2', 'Team 4'] } as ExamplePerson,
        ];

        this.peopleRows = examplePeople.map(x => new ExpandableRow<ExamplePerson>(x));

        this.peopleRows[0].notification = { message: 'Information saknas', icon: NotificationIcon.ExclamationRed, type: NotificationType.Permanent } as RowNotification;
        this.peopleRows[4].notification = { message: 'Personen är inaktiv', icon: NotificationIcon.Exclamation, type: NotificationType.Permanent } as RowNotification;

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
}

export interface ExamplePerson {
    id: string;
    firstName: string;
    lastName: string;
    organisations: string[];
}


