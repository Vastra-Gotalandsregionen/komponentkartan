import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'vgr-calendars',
    templateUrl: 'calendars.component.html'
})
export class CalendarsComponent {
    selectedDate: Date;
    preselectedDate: Date = new Date(2015, 0, 13);
    maxDate: Date = new Date(2018, 7, 1);
    datepicker_Min: Date = new Date(2016, 0, 15)
    datepicker_Max: Date = new Date(2018, 11, 27);
    datepicker_selectedDate: Date = new Date(2017, 9, 17);

    constructor() {
    }
}
