
import { Component, Input, EventEmitter, Output, OnChanges, HostBinding, OnInit, HostListener, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ICalendarYearMonth } from '../../models/calendarYearMonth.model';
import { ICalendarWeek } from '../../models/calendarWeek.model';
import { ICalendarDay } from '../../models/calendarDay.model';

@Component({
    selector: 'vgr-daypicker',
    moduleId: module.id,
    templateUrl: './daypicker.component.html'
})
export class DaypickerComponent implements OnInit {

    today: Date = new Date();

    @Input() minDate: Date;
    @Input() maxDate: Date;
    yearMonths: ICalendarYearMonth[] = [];

    ngOnInit() {
        this.createYearMonths();
    }


    constructor(protected elementRef: ElementRef) {
        this.minDate = new Date(this.today.getFullYear(), 0, 1);
        this.maxDate = new Date(this.today.getFullYear(), 11, 31);
    };


    createYearMonths() {
        for (let year = this.minDate.getFullYear(); year <= this.maxDate.getFullYear(); year++) {
            for (let month = 0; month <= 12; month++) {
                const lastDayInMonth = new Date(year, month, 0);
                const firstDayInMonth = this.getFirstDayInMonth(year, month);
                const firstDayInFirstWeek = lastDayInMonth.getDay();

                if (new Date(year, month) >= this.minDate && (new Date(year, month) <= this.maxDate)) {
                    this.yearMonths.push({ year: year, month: month } as ICalendarYearMonth);
                    console.log(this.yearMonths);
                }
            }
        }
        console.log(this.yearMonths.length);
    }

    getFirstDayInMonth(year: number, month: number) { return new Date(year, month, 1); }

    getLastDayInMonth(year: number, month: number) { return new Date(year, month, 0); }

    getNumberOfWeeks(year: number, month: number): number {
        const firstDayOfWeek = 1;
        const firstOfMonth = this.getFirstDayInMonth(year, month - 1);
        const lastOfMonth = this.getLastDayInMonth(year, month);
        const numberOfDaysInMonth = lastOfMonth.getDate();
        const firstWeekDay = (firstOfMonth.getDay() - firstDayOfWeek + 7) % 7;
        const used = firstWeekDay + numberOfDaysInMonth;

        return Math.ceil(used / 7);
    }

    createWeeks(year: number, month: number): ICalendarWeek[] {
        const weeks: ICalendarWeek[] = [];
        const numberOfWeeks = this.getNumberOfWeeks(year, month);

        for (let i = 1; i <= numberOfWeeks; i++) {
            weeks.push({} as ICalendarWeek)
        }
        console.log(weeks);
        return weeks;
    }
}

