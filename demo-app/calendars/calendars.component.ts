import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'vgr-calendars',
    templateUrl: 'calendars.component.html'
})
export class CalendarsComponent {
    preselectedDate: Date = new Date(2015, 0, 13);
    maxDate: Date = new Date(2018, 7, 1);

}