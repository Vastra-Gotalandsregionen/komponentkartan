
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
                }
            }
        }
    }

    getFirstDayInMonth(year: number, month: number) { return new Date(year, month, 1); }

    getLastDayInMonth(year: number, month: number) { return new Date(year, month, 0); }

    getNumberOfWeeks(year: number, month: number): number {
        const firstDayOfWeek = 1;
        const firstDayOfMonth = this.getFirstDayInMonth(year, month - 1);
        const lastDayOfMonth = this.getLastDayInMonth(year, month);
        const numberOfDaysInMonth = lastDayOfMonth.getDate();
        const firstWeekDay = (firstDayOfMonth.getDay() - firstDayOfWeek + 7) % 7;
        const used = firstWeekDay + numberOfDaysInMonth;

        return Math.ceil(used / 7);
    }

    createWeeks(year: number, month: number): ICalendarWeek[] {
        const weeks: ICalendarWeek[] = [];
        const numberOfWeeks = this.getNumberOfWeeks(year, month);

        for (let i = 1; i <= numberOfWeeks; i++) {
            weeks.push({} as ICalendarWeek);
        }
        return weeks;
    }

    setWeeksAndDays(year: number, month: number): ICalendarWeek[] {
        const weeks: ICalendarWeek[] = this.createWeeks(year, month);
        const firstWeek: ICalendarWeek = this.setFirstWeek(year, month);
        const lastWeek: ICalendarWeek = this.setLastWeek(year, month);

        const secondWeekIndex = 1;
        const secondLastWeekIndex = weeks.length - 1;
        const lastWeekIndex = weeks.length

        let dayNumber = firstWeek.days[6].day.getDate() + 1;

        weeks[0] = firstWeek;

        for (let iWeekIndex = secondWeekIndex; iWeekIndex < secondLastWeekIndex; iWeekIndex++) {
            let weekContainer: ICalendarWeek = {} as ICalendarWeek;
            let daysContainer: ICalendarDay[] = [];
            weekContainer.days = daysContainer;
            for (let iDayIndex = 0; iDayIndex < 7; iDayIndex++) {
                weekContainer.days.push({ day: new Date(year, month - 1, dayNumber) } as ICalendarDay);
                dayNumber++;
            }
            weeks[iWeekIndex] = weekContainer;
            weekContainer = {} as ICalendarWeek;
            daysContainer = [];
        }

        weeks[lastWeekIndex] = lastWeek;
        return weeks;
    }

    setFirstWeek(year: number, month: number): ICalendarWeek {
        const firstDayOfMonth = this.getFirstDayInMonth(year, month - 1);
        const calendarWeek: ICalendarWeek = {} as ICalendarWeek;
        calendarWeek.days = [];

        let daynumber = 1;

        for (let i = 0; i < 7; i++) {
            if (i < (this.getSwedishDayNumbersInWeek(firstDayOfMonth.getDay()))) {
                calendarWeek.days.push({} as ICalendarDay);
            } else {
                calendarWeek.days.push({ day: new Date(year, month - 1, daynumber) } as ICalendarDay);
                daynumber++;
            }
        }
        return calendarWeek;
    }

    setLastWeek(year: number, month: number): ICalendarWeek {
        const lastDayOfMonth = this.getLastDayInMonth(year, month);
        const calendarWeek: ICalendarWeek = {} as ICalendarWeek;
        calendarWeek.days = [];

        let daynumber = lastDayOfMonth.getDate() - this.getSwedishDayNumbersInWeek(lastDayOfMonth.getDay());

        for (let i = 0; i < 7; i++) {
            if (i <= (this.getSwedishDayNumbersInWeek(lastDayOfMonth.getDay()))) {
                calendarWeek.days.push({ day: new Date(year, month - 1, daynumber) } as ICalendarDay);
                daynumber++
            } else { calendarWeek.days.push({} as ICalendarDay); };
        }

        return calendarWeek;
    }

    getSwedishDayNumbersInWeek(weekNumber: number): number {
        switch (weekNumber) {
            case 0: {
                return 6;
            }
            case 1: {
                return 0;
            }
            case 2: {
                return 1;
            }
            case 3: {
                return 2;
            }
            case 4: {
                return 3;
            }
            case 5: {
                return 4;
            }
            case 6: {
                return 5;
            }
        }
    }
}

