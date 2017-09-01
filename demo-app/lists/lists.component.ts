import { Component } from '@angular/core';
import { NotificationType } from '../../component-package/models/notificationType.model';
import { NotificationIcon } from '../../component-package/models/notificationIcon.model';

@Component({
    moduleId: module.id,
    selector: 'vgr-lists',
    templateUrl: 'lists.component.html'
})
export class ListsComponent {
    // Enum declarations
    public NotificationTypes = NotificationType;
    public NotificationIcons = NotificationIcon;

    public examplePeople: ExamplePerson[];

    constructor() {
        this.examplePeople = [
            { firstName: 'Adam', lastName: 'Andersson', organisations: ['Team 1', 'Team 2'] } as ExamplePerson,
            { firstName: 'Boyd', lastName: 'Braithwathe', organisations: ['Team 1'] } as ExamplePerson,
            { firstName: 'Carol', lastName: 'Corbinson', organisations: ['Team 1', 'Team 2', 'Team 3'] } as ExamplePerson,
            { firstName: 'Damon', lastName: 'Dietz', organisations: ['Team 4'] } as ExamplePerson,
            { firstName: 'Erin', lastName: '', organisations: ['Team 2', 'Team 4'], validationError: 'Last name missing' } as ExamplePerson,
        ];
    }
}

export interface ExamplePerson {
    firstName: string;
    lastName: string;
    organisations: string[];
    validationError: string;

}
