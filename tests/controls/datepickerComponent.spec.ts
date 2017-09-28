
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICalendarYearMonth } from '../../component-package/models/calendarYearMonth.model';
import { ICalendarWeek } from '../../component-package/models/calendarWeek.model';
import { ICalendarDay } from '../../component-package/models/calendarDay.model';

import { DatepickerComponent } from '../../component-package/controls/datepicker/datepicker.component';

describe('[DaypickerComponent]', () => {
    let component: DatepickerComponent;
    let currentYear: number;
    let currentMonth: number;
    let minDate: Date;
    let maxDate: Date;

    describe('When initialized with default settings', () => {
        beforeEach(() => {
            currentMonth = new Date().getMonth();
            currentYear = new Date().getFullYear();
            component = new DatepickerComponent(null);
            component.ngOnInit();
        });
        it('contains a yearmonth-model with current year', () => {
            console.log(component.yearMonths.map(ym => ym.year)[0]);

            expect(component.yearMonths.map(ym => ym.year)[0]).toEqual(new Date().getFullYear());
        });

        it('contains the current month in the year-month model', () => {
            expect(component.yearMonths.filter(ym => ym.month === currentMonth).map(ym => ym.month)[0]).toEqual(currentMonth);
        });

        it('contains January in the year-month model', () => {
            expect((component.yearMonths.filter(ym => ym.month === currentMonth)[0].month)).toBe(8);
        });

        it('contains right amount of weeks in month model', () => {
            const firstDayOfWeek = 1;
            const firstDayOfMonth = component.getFirstDayInMonth(currentYear, currentMonth - 1);
            const lastDayOfMonth = component.getLastDayInMonth(currentYear, currentMonth);
            const numberOfDaysInMonth = lastDayOfMonth.getDate();
            const firstWeekDay = (firstDayOfMonth.getDay() - firstDayOfWeek + 7) % 7;
            const used = firstWeekDay + numberOfDaysInMonth;
            const actual = Math.ceil(used / 7);

            expect(component.yearMonths.filter(ym => ym.year === currentYear && ym.month === currentMonth)[0].weeks.length).toEqual(actual);
        });

        it('contains correct day in firstWeek of type ICalendarWeeks', () => {
            const firstDayInYear = new Date(currentYear, 0, 1);
            const firstDayInYearInWeekIndex = component.getSwedishDayNumbersInWeek(firstDayInYear.getDay());

            expect(component.yearMonths.filter(ym => ym.year === ym.year)[0].weeks[0].days[firstDayInYearInWeekIndex].day).toEqual(firstDayInYear);
        });

        it('contains correct day in lastWeek of type ICalendarWeeks', () => {
            const lastWeekIndex = component.getNumberOfWeeks(2017, 1);
            const lastDayInMonth = new Date(currentYear, 1, 0);
            const firstDayInYearInWeekIndex = component.getSwedishDayNumbersInWeek(lastDayInMonth.getDay());
            expect(component.yearMonths.filter(ym => ym.year === ym.year)[0].weeks[lastWeekIndex - 1].days[firstDayInYearInWeekIndex].day).toEqual(new Date(currentYear, 1, 0));
        });

        it('todays date is set in the calendar', () => {

        });

        describe('and selecting a day in the calendar ', () => {
            it('the selected date is set in the component')
            it('the selected day closes the calendar', () => { });
            it('the todays date is set in the calendar', () => { });
            it('the selected date is set in the dropdown', () => { });
        });



        it('', () => { });

        /*     - Det finns en kalender där man väljer datum (duh)
               X Valt datum väljer och stänger kalender
               X Valt datum markeras som skiss
               - Hover markeras som skiss (svårt att testa?)
              -  Det går att gå fram och tillbaka i tid om min/ maxvärde tillåter
               - Inaktiva val (val utanför min / maxvärden) markeras som skiss (har vi redan tester på disablead date)
               - Kalendern kan temas (behövs inte testas)
               X Dagens datum är alltid markerad enligt skiss om dagens datum inte är valt
               - Växer vid brytgräns (behövs inte testa)
               - Ett exempel ska finnas på komponentkartan
               - Man kan sätta formatet på valt datum (irrelecant)
               - Man kan sätta formatet på tooltip för valt datum (irrelevant)
               - Kalenderdropdown ska se ut enligt skiss (räcker med UI-tester)
               - Kalendern visas nedanför kalenderdropdown enligt skiss (räcker med UI-tester)
               - Man kan sätta min och maxdatum och startvärde (finns enhetstester)
               X När kalendern stängs visas datum i valt format
         */

    });

    describe(' When initialized with currentYear 2017 and currentMonth October', () => {
        beforeEach(() => {
            currentYear = 2017;
            currentMonth = 10;
            minDate = new Date(currentYear, currentMonth - 1, 15);
            maxDate = new Date(currentYear, currentMonth - 1, 27);
            component.currentDate = new Date(currentYear, currentMonth, 1);
            component.ngOnInit();
        });

        it('contains a yearmonth-model with current year', () => {
            expect(component.yearMonths.map(ym => ym.year)[0]).toEqual(currentYear);
        });

        it('contains the current month in the yearmonth model', () => {
            expect(component.yearMonths.filter(ym => ym.month === currentMonth).map(ym => ym.month)[0]).toEqual(currentMonth);
        });

        it('contains 6 weeks in month model', () => {
            expect(component.getNumberOfWeeks(currentYear, currentMonth)).toEqual(6);
        });

        it('contains 6 elements of ICalendarWeeks', () => {
            expect(component.createWeeks(currentYear, currentMonth).length).toEqual(6);
        });

        it('contains correct day in firstWeek of type ICalendarWeeks', () => {
            expect(component.createFirstWeek(currentYear, currentMonth).days[6].day.toDateString()).toBe('Sun Oct 01 2017');
        });

        it('contains correct day in lastWeek of type ICalendarWeeks', () => {
            expect(component.createLastWeek(currentYear, currentMonth).days[0].day.toDateString()).toBe('Mon Oct 30 2017');
        });
        it('contains correct day in lastWeek of type ICalendarWeeks', () => {
            expect(component.createLastWeek(currentYear, currentMonth).days[1].day.toDateString()).toBe('Tue Oct 31 2017');
        });

        it('contains empty day in lastWeek of type ICalendarWeeks', () => {
            expect(component.createLastWeek(currentYear, currentMonth).days[2]).toEqual({});
        });

        it('contains correct day in the middle of the month', () => {
            expect(component.createWeeksAndDays(currentYear, currentMonth)[2].days[2].day.toDateString()).toBe('Wed Oct 11 2017');
        });

        it('contains Empty day in the First week of the month', () => {
            expect(component.createWeeksAndDays(currentYear, currentMonth)[0].days[2]).toEqual({});
        });

        it('contains Empty day in the First week of the month', () => {
            expect(component.createWeeksAndDays(currentYear, currentMonth)[0].days[2]).toEqual({});
        });

        it('First month of the year shall have 6 weeks', () => {
            expect(component.createYearMonths(minDate, maxDate)[0].weeks.length).toBe(6);
        });

        it('all days in october disabled=false', () => {
            expect(component.createYearMonths(minDate, maxDate)[0].weeks[0].days[6].disabled as boolean).toBe(false);
            expect(component.createYearMonths(minDate, maxDate)[0].weeks[1].days[0].disabled as boolean).toBe(false);
            expect(component.createYearMonths(minDate, maxDate)[0].weeks[1].days[1].disabled as boolean).toBe(false);
            expect(component.createYearMonths(minDate, maxDate)[0].weeks[1].days[2].disabled as boolean).toBe(false);
        });

        it('Days before mindate and after maxdate are disabled=true', () => {
            expect(component.setDisabledDates(minDate, maxDate, component.createYearMonths(minDate, maxDate))[0].weeks[0].days[6].disabled).toBe(true);
            expect(component.setDisabledDates(minDate, maxDate, component.createYearMonths(minDate, maxDate))[0].weeks[2].days[5].disabled).toBe(true);
            expect(component.setDisabledDates(minDate, maxDate, component.createYearMonths(minDate, maxDate))[0].weeks[4].days[5].disabled).toBe(true);
            expect(component.setDisabledDates(minDate, maxDate, component.createYearMonths(minDate, maxDate))[0].weeks[4].days[5].disabled).toBe(true);
            expect(component.setDisabledDates(minDate, maxDate, component.createYearMonths(minDate, maxDate))[0].weeks[5].days[1].disabled).toBe(true);
        });


        it('Days in between mindate are maxdate disabled=false', () => {
            expect(component.setDisabledDates(minDate, maxDate, component.createYearMonths(minDate, maxDate))[0].weeks[2].days[6].disabled).toBe(false);
            expect(component.setDisabledDates(minDate, maxDate, component.createYearMonths(minDate, maxDate))[0].weeks[4].days[4].disabled).toBe(false);
        });
    });
});


