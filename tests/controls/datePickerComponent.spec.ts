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
    let currentYear: number;
    let currentMonth: number;
    let minDate: Date;
    let maxDate: Date;
    let numberOfMonthsInYearMonths: number;



    describe('When initialized with minDate 2017-08-01 and maxDate 2017-09-01', () => {
        beforeEach(() => {
            component = new DatepickerComponent(null);
            component.minDate = new Date(2017, 7, 1);
            component.maxDate = new Date(2017, 8, 1);
            component.ngOnInit();
        });

        it('contains months after maxDate', () => {
            expect(component.yearMonths[2].month).toBe(10);
        });

    });

    describe('When initialized with default settings', () => {
        beforeEach(() => {
            component = new DatepickerComponent(null);
            currentMonth = new Date().getMonth();
            currentYear = new Date().getFullYear();
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
            expect(component.yearMonths[component.currentYearMonthIndex].month).toBe(currentMonth + 1);
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

    describe(' When initialized with 2017 october 15th ', () => {
        let yearMonthArray: ICalendarYearMonth[];



        function NumberofYearMonthsInCalendar(d1: Date, d2: Date) {
            let monthCount = 0;
            for (let year = d1.getFullYear(); year <= d2.getFullYear(); year++) {
                for (let month = 1; month <= 12; month++) {
                    if (new Date(year, month - 1) >= new Date(d1.getFullYear(), d1.getMonth())
                        && (new Date(year, month - 1) <= new Date(d2.getFullYear(), d2.getMonth()))) {
                        monthCount++;
                    }
                }
            }
            return monthCount;
        }

        beforeEach(() => {
            jasmine.clock().uninstall();
            jasmine.clock().install();
            currentYear = 2017;
            currentMonth = 10;

            jasmine.clock().mockDate(new Date(currentYear, currentMonth - 1, 15));
            component = new DatepickerComponent(null);

            minDate = new Date(currentYear, currentMonth - 1, 15);
            maxDate = new Date(currentYear, currentMonth - 1, 27);
            component.minDate = minDate;
            component.maxDate = maxDate;

            component.ngOnInit();
            yearMonthArray = component.yearMonths;
        });
        afterEach(() => {
            jasmine.clock().uninstall();
        });
        describe('and mindate is set to 2017-10-15 and maxdate is set to 2017-10-27 the yearmonth model ', () => {

            it('the calendar is not visible', () => {
                expect(component.isDatePickerVisible).toBe(false);
            });

            it('contains the current year', () => {
                expect(component.yearMonths.map(ym => ym.year)[0]).toEqual(currentYear);
            });

            it('contains the current month', () => {
                expect(component.yearMonths.filter(ym => ym.month === currentMonth).map(ym => ym.month)[0]).toEqual(currentMonth);
            });

            it('contains only one month', () => {
                expect(component.yearMonths.length).toBe(1);
            });

            it('contains 6 weeks in currentMonth (october) ', () => {
                expect(component.getNumberOfWeeks(currentYear, currentMonth)).toEqual(6);
            });

            it('contains 6 elements of ICalendarWeeks', () => {
                expect(yearMonthArray[0].weeks.length).toEqual(6);
            });

            it('contains correct day in firstWeek of type ICalendarWeeks', () => {
                expect(yearMonthArray[0].weeks[0].days[6].day.toDateString()).toBe('Sun Oct 01 2017');
            });

            it('contains correct day in lastWeek of type ICalendarWeeks', () => {
                expect(yearMonthArray[0].weeks[5].days[0].day.toDateString()).toBe('Mon Oct 30 2017');
            });
            it('contains correct day in lastWeek of type ICalendarWeeks', () => {
                expect(yearMonthArray[0].weeks[5].days[1].day.toDateString()).toBe('Tue Oct 31 2017');
            });

            it('contains empty day in lastWeek of type ICalendarWeeks', () => {
                expect(yearMonthArray[0].weeks[5].days[2]).toBeNull(true);
            });

            it('contains 11 october ', () => {
                expect(yearMonthArray[0].weeks[2].days[2].day.toDateString()).toBe('Wed Oct 11 2017');
            });

            it('contains Empty day in the First week of the month', () => {
                expect(yearMonthArray[0].weeks[0].days[0]).toBeNull(true);
            });

            it('Days before mindate are disabled', () => {
                let weekTwo = yearMonthArray[0].weeks[1].days as Array<ICalendarDay>;
                let weekThree = yearMonthArray[0].weeks[2].days as Array<ICalendarDay>;


                expect(yearMonthArray[0].weeks[0].days[6].disabled).toBe(true);
                expect(weekTwo.every((day: ICalendarDay) => day.disabled)).toBe(true);
                expect(weekThree[0].disabled).toBe(true);
                expect(weekThree[1].disabled).toBe(true);
                expect(weekThree[3].disabled).toBe(true);
                expect(weekThree[4].disabled).toBe(true);
                expect(weekThree[5].disabled).toBe(true);
            });

            it('Days between mindate and maxdate are enabled', () => {

                let weekThree = yearMonthArray[0].weeks[2].days as Array<ICalendarDay>;
                let weekFour = yearMonthArray[0].weeks[3].days as Array<ICalendarDay>;
                let weekFive = yearMonthArray[0].weeks[4].days as Array<ICalendarDay>;

                expect(weekThree[6].disabled).toBe(false);
                expect(weekThree[6].disabled).toBe(false);
                expect(weekFour[0].disabled).toBe(false);
                expect(weekFour[1].disabled).toBe(false);
                expect(weekFour[2].disabled).toBe(false);
                expect(weekFour[3].disabled).toBe(false);
                expect(weekFour[4].disabled).toBe(false);
                expect(weekFour[5].disabled).toBe(false);
                expect(weekFour[6].disabled).toBe(false);
                expect(weekFive[0].disabled).toBe(false);
                expect(weekFive[1].disabled).toBe(false);
                expect(weekFive[2].disabled).toBe(false);
                expect(weekFive[3].disabled).toBe(false);
                expect(weekFive[4].disabled).toBe(false);
            });


            it('Days after maxdate are disabled', () => {
                let weekFive = yearMonthArray[0].weeks[4].days as Array<ICalendarDay>;
                let weekSix = yearMonthArray[0].weeks[5].days as Array<ICalendarDay>;

                expect(weekFive[5].disabled).toBe(true);
                expect(weekFive[6].disabled).toBe(true);
                expect(weekSix[0].disabled).toBe(true);
                expect(weekSix[1].disabled).toBe(true);
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
            component = new DatepickerComponent(null);

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

