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
    minDatepicker: Date = new Date(2017, 9, 15)
    maxDatepicker: Date = new Date(2017, 10, 27);
    selectedDateDatePicker: Date = new Date(2017, 9, 17);

    constructor() {
        console.log('Calendarcomponent mindatepicker', this.minDatepicker);
        console.log('Calendarcomponent maxdatepicker', this.maxDatepicker);
    }

}

