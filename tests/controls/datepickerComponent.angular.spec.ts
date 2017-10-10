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
import { inject } from '@angular/core/testing';

describe('[DatepickerComponent]', () => {
    let component: DatepickerComponent;
    let fixture: ComponentFixture<DatepickerComponent>;
    let rootElement: DebugElement;
    let datepicker: DebugElement;
    let currentYear: number;
    let currentMonth: number;
    let minDate: Date;
    let maxDate: Date;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [DatepickerComponent],
            imports: [CommonModule]
        });

        TestBed.overrideComponent(DatepickerComponent, {
            set: {
                templateUrl: './datepicker.component.html'
            }
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(DatepickerComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            datepicker = rootElement.query(By.css('.datepicker'));
            fixture.detectChanges();

            done();
        });
    });

    describe('When initialized with default settings', () => {
        beforeEach(() => {
            currentMonth = new Date().getMonth();
            currentYear = new Date().getFullYear();
            component = new DatepickerComponent(null);
            component.ngOnInit();
        });

        it('contains a yearmonth-model with current year', () => {
            expect(component.yearMonths.map(ym => ym.year)[0]).toEqual(currentYear);
        });

        it('contains the current month in the year-month model', () => {
            expect(component.yearMonths.filter(ym => ym.month === currentMonth).map(ym => ym.month)[0]).toEqual(currentMonth);
        });

        it('contains January in the year-month model', () => {
            expect((component.yearMonths.filter(ym => ym.month === 1)[0].month)).toBe(1);
        });

        it('currentYearMonthIndex is set with todays date', () => {            
            expect(component.yearMonths[component.currentYearMonthIndex].year).toBe(currentYear);
            expect(component.yearMonths[component.currentYearMonthIndex].month).toBe(currentMonth+1);
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

    });

    describe(' When initialized with currentYear 2017 and currentMonth October', () => {
        beforeEach(() => {
            currentYear = 2017;
            currentMonth = 10;
            minDate = new Date(currentYear, currentMonth - 1, 15);
            maxDate = new Date(currentYear, currentMonth - 1, 27);
            component.currentDate = new Date(currentYear, currentMonth - 1, 1);
            component.minDate = new Date(currentYear, currentMonth - 1, 15);
            component.maxDate = new Date(currentYear, currentMonth - 1, 27);
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
            expect(component.createLastWeek(currentYear, currentMonth).days[2]).toBeNull(true);
        });

        it('contains correct day in the middle of the month', () => {
            expect(component.createWeeksAndDays(currentYear, currentMonth)[2].days[2].day.toDateString()).toBe('Wed Oct 11 2017');
        });

        it('contains Empty day in the First week of the month', () => {
            expect(component.createWeeksAndDays(currentYear, currentMonth)[0].days[2]).toBeNull(true);
        });

        it('contains Empty day in the First week of the month', () => {
            expect(component.createWeeksAndDays(currentYear, currentMonth)[0].days[2]).toBeNull(true);
        });

        it('First month of the year shall have 6 weeks', () => {
            expect(component.createYearMonths(minDate, maxDate)[0].weeks.length).toBe(6);
        });

        it('all days in october disabled=false', () => {
            console.log(component.yearMonths);
            expect(component.createYearMonths(minDate, maxDate)[0].weeks[0].days[6].disabled as boolean).toBe(false);
            expect(component.createYearMonths(minDate, maxDate)[0].weeks[1].days[0].disabled as boolean).toBe(false);
            expect(component.createYearMonths(minDate, maxDate)[0].weeks[1].days[1].disabled as boolean).toBe(false);
            expect(component.createYearMonths(minDate, maxDate)[0].weeks[1].days[2].disabled as boolean).toBe(false);
        });

        it('Days before mindate and after maxdate are disabled=true', () => {
            expect(component.updateDays(minDate, maxDate, component.createYearMonths(minDate, maxDate))[0].weeks[0].days[6].disabled).toBe(true);
            expect(component.updateDays(minDate, maxDate, component.createYearMonths(minDate, maxDate))[0].weeks[2].days[5].disabled).toBe(true);
            expect(component.updateDays(minDate, maxDate, component.createYearMonths(minDate, maxDate))[0].weeks[4].days[5].disabled).toBe(true);
            expect(component.updateDays(minDate, maxDate, component.createYearMonths(minDate, maxDate))[0].weeks[4].days[5].disabled).toBe(true);
            expect(component.updateDays(minDate, maxDate, component.createYearMonths(minDate, maxDate))[0].weeks[5].days[1].disabled).toBe(true);
        });


        it('Days in between mindate are maxdate disabled=false', () => {
            expect(component.updateDays(minDate, maxDate, component.createYearMonths(minDate, maxDate))[0].weeks[2].days[6].disabled).toBe(false);
            expect(component.updateDays(minDate, maxDate, component.createYearMonths(minDate, maxDate))[0].weeks[4].days[4].disabled).toBe(false);
        });

        it('yearmonth shall only contain one month', () => {
            expect(component.yearMonths.length).toBe(1);
        });

        it('the calendar is not visible', () => {
            expect(component.isDatePickerVisible).toBe(false);
        });


        describe('and the datepicker is clicked', () => {

            beforeEach(() => {
                component.displayDatePicker();
            });
            it('the calendar is visible', () => {
                expect(component.isDatePickerVisible).toBe(true);
            });

            describe('and selecting a day in the calendar ', () => {
                beforeEach(() => {
                    const spy = spyOn(component.selectedDateChanged, 'emit');
                    component.onSelectedDate(0, 3, 1);
                });
                it('the selected date is set', () => {
                    expect(component.yearMonths[0].weeks[3].days[1].selected).toBe(true);
                });
                it('the calendar is closed', () => {
                    expect(component.isDatePickerVisible).toBe(false);
                });
                it('selectedDateChanged event is emitted', () => {
                    expect(component.selectedDateChanged.emit).toHaveBeenCalled();
                });
            });

            describe('and user clicks outside the calendar', () => {
                beforeEach(() => {
                    component.onOutsideClick({ target: {} } as Event)
                });
                it('the calendar is closed', () => {
                    expect(component.isDatePickerVisible).toBe(false);
                });
            });
        });


        describe('when a date has been selected', () => {
            beforeEach(() => {
                component.onSelectedDate(0, 3, 2);
            });

            describe('and a new date is selected', () => {
                beforeEach(() => {
                    component.onSelectedDate(0, 3, 3);
                });
                it('the selected date is selected', () => {
                    expect(component.yearMonths[0].weeks[3].days[3].selected).toBe(true);
                });
                it('the previous date is not selected', () => {
                    expect(component.yearMonths[0].weeks[3].days[2].selected).toBe(false);
                });
            });

        });

    });


    describe(' When initialized with 3 months', () => {
        beforeEach(() => {
            const year = 2017;
            const october = 9;
            component = new DatepickerComponent(null);
            component.minDate = new Date(year, october - 1, 1);
            component.maxDate = new Date(year, october + 1, 30);
            component.selectedDate = new Date(year, october, 1);
            component.ngOnInit();
        });

        it('can navigate to previous month', () => {
            expect(component.previousMonth).toBeTruthy();
        });

        it('can navigate to next month', () => {
            expect(component.nextMonth).toBeTruthy();
        });

        describe('and navigation to next month', () => {
            beforeEach(() => {
                component.onNextMonth();
            });

            it('can navigate to previous month', () => {
                expect(component.previousMonth).toBeTruthy();
            });

            it('can not navigate to next month', () => {
                expect(component.nextMonth).toBeFalsy();
            });
        });

        describe('and navigation to previous month', () => {
            beforeEach(() => {
                component.onPreviousMonth();
            });

            it('can not navigate to previous month', () => {
                expect(component.previousMonth).toBeFalsy();
            });

            it('can navigate to next month', () => {
                expect(component.nextMonth).toBeTruthy();
            });
        });
    });
    describe('correct css class assignment', () => {
        beforeEach(() => {
            component.yearMonths = [
                {
                    year: 2017, month: 1, weeks: [
                        {
                            days: [
                                { day: new Date(2017, 1, 1), disabled: true } as ICalendarDay,
                                { day: new Date(2017, 1, 2), isCurrentDay: true } as ICalendarDay,
                                { day: new Date(2017, 1, 3), selected: true } as ICalendarDay,
                                { day: new Date(2017, 1, 4), disabled: false } as ICalendarDay
                            ] as ICalendarDay[]
                        } as ICalendarWeek
                    ] as ICalendarWeek[]
                } as ICalendarYearMonth
            ] as ICalendarYearMonth[];
            component.currentYearMonthIndex = 0;
        });

        describe('when checkDisabledDate is called', () => {

            it('disabled date returns true', () => {
                expect(component.checkDisabledDate(0, 0)).toBe(true);
            });
            it('enabled date returns false', () => {
                expect(component.checkDisabledDate(0, 3)).toBe(false);
            });
        });

        describe('when checkTodayDate is called', () => {
            it('todays date returns true', () => {
                expect(component.checkTodayDate(0, 1)).toBeTruthy();
            });
            it('other date returns false', () => {
                expect(component.checkTodayDate(0, 0)).toBeFalsy();
            });
        });

        describe('when checkSelectedDate is called', () => {
            it('selected date returns true', () => {
                expect(component.checkSelectedDate(0, 2)).toBeTruthy();
            });
            it('other date returns false', () => {
                expect(component.checkSelectedDate(0, 0)).toBeFalsy();
            });
        });



    });



});

