import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'vgr-calendars',
    templateUrl: 'calendars.component.html'
})
export class CalendarsComponent {
    selectedDate: Date = new Date(2015, 0, 13);
    selectedDateNew: Date;
    minDate: Date = new Date(2015, 0, 1);
    maxDate: Date = new Date(2016, 11, 1);

    datepicker_Min: Date = new Date(2016, 4, 15);
    datepicker_Max: Date = new Date(2016, 11, 25);
    datepicker_selectedDate: Date = new Date(2017, 6, 25);

    datepicker_selectedDateNew: Date;
    isReadonlyAndDisabled: boolean;
    isReadonlyAndDisabledDatepicker: boolean;
    constructor() {
        this.isReadonlyAndDisabled = true;
        this.isReadonlyAndDisabledDatepicker = true;
    }
}
