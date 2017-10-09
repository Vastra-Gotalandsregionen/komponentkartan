
import { Component, Input, EventEmitter, Output, OnChanges, HostBinding, OnInit, HostListener, ElementRef } from '@angular/core';
import { ICalendarYearMonth } from '../../models/calendarYearMonth.model';
import { ICalendarWeek } from '../../models/calendarWeek.model';
import { ICalendarDay } from '../../models/calendarDay.model';

@Component({
    selector: 'vgr-datepicker',
    moduleId: module.id,
    templateUrl: './datepicker.component.html'
})
export class DatepickerComponent implements OnInit {

    @Input() currentDate: Date;
    @Input() minDate: Date;
    @Input() maxDate: Date;
    @Input() selectedDate?: Date;
    @Input() @HostBinding('class.disabled') disabled: boolean;
    @Input() selectedDateFormat: String = 'yyyy-MM-dd';
    @Input() tooltipDateFormat: String = 'yyyy-MM-dd';

    @Output() selectedDateChanged = new EventEmitter<Date>();
    

    yearMonths: ICalendarYearMonth[] = [];
    isDatePickerVisible: boolean;
    nextMonth: boolean;
    previousMonth: boolean;
    currentYearMonthIndex: number;
    currentYearMonthOutput: Date;
    selectedCalendarDay: ICalendarDay;

    constructor(protected elementRef: ElementRef) {
        this.currentDate = new Date();
        this.isDatePickerVisible = false;
        this.nextMonth = true;
        this.previousMonth = true;
        this.currentYearMonthIndex = 0;
        this.minDate = new Date(this.currentDate.getFullYear(), 0, 1);
        this.maxDate = new Date(this.currentDate.getFullYear(), 11, 31);
    };

    ngOnInit() {
        this.yearMonths = this.createYearMonths(this.minDate, this.maxDate);
        this.yearMonths = this.updateDays(this.minDate, this.maxDate, this.yearMonths);
        this.setCurrentYearMonthOutput();
        this.setPreviousAndNextMonthNavigation();
    }

    setCurrentYearMonthOutput() {
        this.currentYearMonthOutput = new Date(this.yearMonths[this.currentYearMonthIndex].year, this.yearMonths[this.currentYearMonthIndex].month - 1);
    }

    createYearMonths(minDate: Date, maxDate: Date): ICalendarYearMonth[] {
        const yearMonths: ICalendarYearMonth[] = [];
        for (let year = minDate.getFullYear(); year <= maxDate.getFullYear(); year++) {
            for (let month = 1; month <= 12; month++) {
                if (new Date(year, month - 1) >= new Date(minDate.getFullYear(), minDate.getMonth())
                    && (new Date(year, month - 1) <= new Date(maxDate.getFullYear(), maxDate.getMonth()))) {
                    yearMonths.push({ year: year, month: month, weeks: this.createWeeksAndDays(year, month) } as ICalendarYearMonth);
                }
            }
        }
        return yearMonths;
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
    createWeeksAndDays(year: number, month: number): ICalendarWeek[] {
        const weeks: ICalendarWeek[] = this.createWeeks(year, month);
        const firstWeek: ICalendarWeek = this.createFirstWeek(year, month);
        const lastWeek: ICalendarWeek = this.createLastWeek(year, month);
        const secondWeekIndex = 1;
        const secondLastWeekIndex = weeks.length - 2;
        const lastWeekIndex = weeks.length - 1

        let dayNumber = firstWeek.days[6].day.getDate() + 1;

        weeks[0] = firstWeek;

        for (let iWeekIndex = secondWeekIndex; iWeekIndex <= secondLastWeekIndex + 1; iWeekIndex++) {
            let weekContainer: ICalendarWeek;
            weekContainer = {} as ICalendarWeek;
            const daysContainer: ICalendarDay[] = [];
            weekContainer.days = [];
            for (let iDayIndex = 0; iDayIndex < 7; iDayIndex++) {
                weekContainer.days.push({ day: new Date(year, month - 1, dayNumber), disabled: false } as ICalendarDay);
                dayNumber++;
            }
            weeks[iWeekIndex] = weekContainer;
        }

        weeks[lastWeekIndex] = lastWeek;

        return weeks;
    }

    createFirstWeek(year: number, month: number): ICalendarWeek {
        const firstDayOfMonth = this.getFirstDayInMonth(year, month - 1);
        const calendarWeek: ICalendarWeek = {} as ICalendarWeek;
        calendarWeek.days = [];

        let daynumber = 1;

        for (let i = 0; i < 7; i++) {
            if (i < (this.getSwedishDayNumbersInWeek(firstDayOfMonth.getDay()))) {
                calendarWeek.days.push(null);
            } else {
                calendarWeek.days.push({ day: new Date(year, month - 1, daynumber), disabled: false } as ICalendarDay);
                daynumber++;
            }
        }
        return calendarWeek;
    }

    createLastWeek(year: number, month: number): ICalendarWeek {
        const lastDayOfMonth = this.getLastDayInMonth(year, month);
        const calendarWeek: ICalendarWeek = {} as ICalendarWeek;
        calendarWeek.days = [];

        let daynumber = lastDayOfMonth.getDate() - this.getSwedishDayNumbersInWeek(lastDayOfMonth.getDay());

        for (let i = 0; i < 7; i++) {
            if (i <= (this.getSwedishDayNumbersInWeek(lastDayOfMonth.getDay()))) {
                calendarWeek.days.push({ day: new Date(year, month - 1, daynumber), disabled: false } as ICalendarDay);
                daynumber++
            } else { calendarWeek.days.push(null); };
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

    updateDays(minDate: Date, maxDate: Date, yearMonths: ICalendarYearMonth[]): ICalendarYearMonth[] {
        yearMonths.forEach((month, index) => {
            month.weeks.forEach((week, weekindex) => {
                week.days.forEach((calendarDay, dayindex) => {
                    if (calendarDay != null) {

                        const currentDatePosition = calendarDay.day.toDateString();
                        const currentselectedDate = this.selectedDate !== undefined ? this.selectedDate.toDateString() : this.selectedDate;
                        const currentTodayDate = this.currentDate.toDateString();

                        // Set disabled dates
                        if (calendarDay.day < minDate || calendarDay.day > maxDate) {
                            month.weeks[weekindex].days[dayindex].disabled = true;
                        }

                        // Set current selected date
                        if (currentselectedDate !== undefined && currentDatePosition === currentselectedDate) {
                            this.setSelectedDay(calendarDay);
                            this.currentYearMonthIndex = index;
                        }

                        // Set today's date
                        if (currentDatePosition === currentTodayDate) {
                            calendarDay.isCurrentDay = true;
                        }
                    }
                });
            })
        });
        return yearMonths;
    }

    private setSelectedDay(calendarDay: ICalendarDay) {

        if (this.selectedCalendarDay) {
            this.selectedCalendarDay.selected = false;
        }
        calendarDay.selected = true;
        this.selectedCalendarDay = calendarDay;
        this.setPreviousAndNextMonthNavigation();
    }

    // UI functions

    displayDatePicker() {
        if (!this.disabled) {
            this.isDatePickerVisible = true;
        }
    }

    @HostListener('document:click', ['$event'])

    onOutsideClick(event: Event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.isDatePickerVisible = false;
        }
    }

    onPreviousMonth() {
        if (this.previousMonth) {
            this.currentYearMonthIndex = this.currentYearMonthIndex - 1;
            this.setCurrentYearMonthOutput();
            this.setPreviousAndNextMonthNavigation();
        }
    }

    onNextMonth() {
        if (this.nextMonth) {
            this.currentYearMonthIndex = this.currentYearMonthIndex + 1;
            this.setCurrentYearMonthOutput();
            this.setPreviousAndNextMonthNavigation();
        }
    }

    onSelectedDate(currentYearMonthIndex: number, weekIndex: number, dayIndex: number) {
        const selectedDate = this.yearMonths[currentYearMonthIndex].weeks[weekIndex].days[dayIndex];

        if (!selectedDate.disabled) {
            this.setSelectedDay(selectedDate);
            this.selectedDateChanged.emit(selectedDate.day);
            this.isDatePickerVisible = false;
            this.selectedDate = selectedDate.day;
        }
    }

    checkDisabledDate(weekIndex: number, dayIndex: number): boolean {
        return this.yearMonths[this.currentYearMonthIndex].weeks[weekIndex].days[dayIndex] === null || this.yearMonths[this.currentYearMonthIndex].weeks[weekIndex].days[dayIndex].disabled;
    }

    checkTodayDate(weekIndex: number, dayIndex: number): boolean {
        return this.yearMonths[this.currentYearMonthIndex].weeks[weekIndex].days[dayIndex] !== null && this.yearMonths[this.currentYearMonthIndex].weeks[weekIndex].days[dayIndex].isCurrentDay;

    }

    checkSelectedDate(weekIndex: number, dayIndex: number): boolean {
        return this.yearMonths[this.currentYearMonthIndex].weeks[weekIndex].days[dayIndex] !== null && this.yearMonths[this.currentYearMonthIndex].weeks[weekIndex].days[dayIndex].selected;
    }


    setPreviousAndNextMonthNavigation() {
        const minMonth = this.minDate.getMonth() + 1;
        const maxMonth = this.maxDate.getMonth() + 1;
        const minYear = this.minDate.getFullYear();
        const maxYear = this.maxDate.getFullYear();
        const currentMonth = this.yearMonths[this.currentYearMonthIndex].month;
        const currentYear = this.yearMonths[this.currentYearMonthIndex].year;
        if ((currentYear === minYear && currentMonth === minMonth) && (currentYear === maxYear && currentMonth === maxMonth)) {
            this.previousMonth = false;
            this.nextMonth = false;
        } else if (currentYear <= minYear && currentMonth <= minMonth) {
            this.previousMonth = false;
        } else if (currentYear >= maxYear && currentMonth >= maxMonth) {
            this.nextMonth = false;
        } else if ((currentYear >= minYear && currentYear <= maxYear) && (currentMonth >= minMonth && currentMonth <= maxMonth)) {
            this.previousMonth = true;
            this.nextMonth = true;
        }
    }
}
