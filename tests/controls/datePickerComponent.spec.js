"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var datepicker_component_1 = require("../../component-package/controls/datepicker/datepicker.component");
describe('[DatepickerComponent]', function () {
    var component;
    var currentYear;
    var currentMonth;
    var minDate;
    var maxDate;
    describe('When initialized with minDate 2017-08-01 and maxDate 2017-09-01', function () {
        beforeEach(function () {
            component = new datepicker_component_1.DatepickerComponent(null, { detectChanges: function () { } }, null);
            component.minDate = new Date(2017, 7, 1);
            component.maxDate = new Date(2017, 8, 1);
            component.ngOnInit();
        });
        it('contains months after maxDate', function () {
            expect(component.yearMonths[2].month).toBe(10);
        });
    });
    describe('When initialized with default settings', function () {
        beforeEach(function () {
            component = new datepicker_component_1.DatepickerComponent(null, null, null);
            currentMonth = new Date().getMonth();
            currentYear = new Date().getFullYear();
            component.ngOnInit();
        });
        it('contains a yearmonth-model with current year', function () {
            expect(component.yearMonths.map(function (ym) { return ym.year; })[0]).toEqual(currentYear);
        });
        it('contains the current month in the year-month model', function () {
            expect(component.yearMonths.filter(function (ym) { return ym.month === currentMonth; }).map(function (ym) { return ym.month; })[0]).toEqual(currentMonth);
        });
        it('contains January in the year-month model', function () {
            expect((component.yearMonths.filter(function (ym) { return ym.month === 1; })[0].month)).toBe(1);
        });
        it('currentYearMonthIndex is set with todays date', function () {
            expect(component.yearMonths[component.currentYearMonthIndex].year).toBe(currentYear);
            expect(component.yearMonths[component.currentYearMonthIndex].month).toBe(currentMonth + 1);
        });
        it('contains right amount of weeks in month model', function () {
            var firstDayOfWeek = 1;
            var firstDayOfMonth = component.getFirstDayInMonth(currentYear, currentMonth - 1);
            var lastDayOfMonth = component.getLastDayInMonth(currentYear, currentMonth);
            var numberOfDaysInMonth = lastDayOfMonth.getDate();
            var firstWeekDay = (firstDayOfMonth.getDay() - firstDayOfWeek + 7) % 7;
            var used = firstWeekDay + numberOfDaysInMonth;
            var actual = Math.ceil(used / 7);
            expect(component.yearMonths.filter(function (ym) { return ym.year === currentYear && ym.month === currentMonth; })[0].weeks.length).toEqual(actual);
        });
        it('contains correct day in firstWeek of type ICalendarWeeks', function () {
            var firstDayInYear = new Date(currentYear, 0, 1);
            var firstDayInYearInWeekIndex = component.getSwedishDayNumbersInWeek(firstDayInYear.getDay());
            expect(component.yearMonths.filter(function (ym) { return ym.year === ym.year; })[0].weeks[0].days[firstDayInYearInWeekIndex].day).toEqual(firstDayInYear);
        });
        it('contains correct day in lastWeek of type ICalendarWeeks', function () {
            var lastWeekIndex = component.getNumberOfWeeks(2017, 1);
            var lastDayInMonth = new Date(currentYear, 1, 0);
            var firstDayInYearInWeekIndex = component.getSwedishDayNumbersInWeek(lastDayInMonth.getDay());
            expect(component.yearMonths.filter(function (ym) { return ym.year === ym.year; })[0].weeks[lastWeekIndex - 1].days[firstDayInYearInWeekIndex].day).toEqual(new Date(currentYear, 1, 0));
        });
    });
    describe(' When initialized with 2017 october 15th ', function () {
        var yearMonthArray;
        function NumberofYearMonthsInCalendar(d1, d2) {
            var monthCount = 0;
            for (var year = d1.getFullYear(); year <= d2.getFullYear(); year++) {
                for (var month = 1; month <= 12; month++) {
                    if (new Date(year, month - 1) >= new Date(d1.getFullYear(), d1.getMonth())
                        && (new Date(year, month - 1) <= new Date(d2.getFullYear(), d2.getMonth()))) {
                        monthCount++;
                    }
                }
            }
            return monthCount;
        }
        beforeEach(function () {
            jasmine.clock().uninstall();
            jasmine.clock().install();
            currentYear = 2017;
            currentMonth = 10;
            jasmine.clock().mockDate(new Date(currentYear, currentMonth - 1, 15));
            component = new datepicker_component_1.DatepickerComponent(null, { detectChanges: function () { } }, null);
            minDate = new Date(currentYear, currentMonth - 1, 15);
            maxDate = new Date(currentYear, currentMonth - 1, 27);
            component.minDate = minDate;
            component.maxDate = maxDate;
            component.ngOnInit();
            yearMonthArray = component.yearMonths;
        });
        afterEach(function () {
            jasmine.clock().uninstall();
        });
        describe('and mindate is set to 2017-10-15 and maxdate is set to 2017-10-27 the yearmonth model ', function () {
            it('the calendar is not visible', function () {
                expect(component.isDatePickerVisible).toBe(false);
            });
            it('contains the current year', function () {
                expect(component.yearMonths.map(function (ym) { return ym.year; })[0]).toEqual(currentYear);
            });
            it('contains the current month', function () {
                expect(component.yearMonths.filter(function (ym) { return ym.month === currentMonth; }).map(function (ym) { return ym.month; })[0]).toEqual(currentMonth);
            });
            it('contains only one month', function () {
                expect(component.yearMonths.length).toBe(1);
            });
            it('contains 6 weeks in currentMonth (october) ', function () {
                expect(component.getNumberOfWeeks(currentYear, currentMonth)).toEqual(6);
            });
            it('contains 6 elements of ICalendarWeeks', function () {
                expect(yearMonthArray[0].weeks.length).toEqual(6);
            });
            it('contains correct day in firstWeek of type ICalendarWeeks', function () {
                expect(yearMonthArray[0].weeks[0].days[6].day.toDateString()).toBe('Sun Oct 01 2017');
            });
            it('contains correct day in lastWeek of type ICalendarWeeks', function () {
                expect(yearMonthArray[0].weeks[5].days[0].day.toDateString()).toBe('Mon Oct 30 2017');
            });
            it('contains correct day in lastWeek of type ICalendarWeeks', function () {
                expect(yearMonthArray[0].weeks[5].days[1].day.toDateString()).toBe('Tue Oct 31 2017');
            });
            it('contains empty day in lastWeek of type ICalendarWeeks', function () {
                expect(yearMonthArray[0].weeks[5].days[2]).toBeNull(true);
            });
            it('contains 11 october ', function () {
                expect(yearMonthArray[0].weeks[2].days[2].day.toDateString()).toBe('Wed Oct 11 2017');
            });
            it('contains Empty day in the First week of the month', function () {
                expect(yearMonthArray[0].weeks[0].days[0]).toBeNull(true);
            });
            it('Days before mindate are disabled', function () {
                var weekTwo = yearMonthArray[0].weeks[1].days;
                var weekThree = yearMonthArray[0].weeks[2].days;
                expect(yearMonthArray[0].weeks[0].days[6].disabled).toBe(true);
                expect(weekTwo.every(function (day) { return day.disabled; })).toBe(true);
                expect(weekThree[0].disabled).toBe(true);
                expect(weekThree[1].disabled).toBe(true);
                expect(weekThree[3].disabled).toBe(true);
                expect(weekThree[4].disabled).toBe(true);
                expect(weekThree[5].disabled).toBe(true);
            });
            it('Days between mindate and maxdate are enabled', function () {
                var weekThree = yearMonthArray[0].weeks[2].days;
                var weekFour = yearMonthArray[0].weeks[3].days;
                var weekFive = yearMonthArray[0].weeks[4].days;
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
            it('Days after maxdate are disabled', function () {
                var weekFive = yearMonthArray[0].weeks[4].days;
                var weekSix = yearMonthArray[0].weeks[5].days;
                expect(weekFive[5].disabled).toBe(true);
                expect(weekFive[6].disabled).toBe(true);
                expect(weekSix[0].disabled).toBe(true);
                expect(weekSix[1].disabled).toBe(true);
            });
            describe('and the datepicker is clicked', function () {
                beforeEach(function () {
                    component.onDatePickerClick({ cancelBubble: true });
                });
                it('the calendar is visible', function () {
                    expect(component.isDatePickerVisible).toBe(true);
                });
                describe('and a disabled date is clicked', function () {
                    beforeEach(function () {
                        var spy = spyOn(component.selectedDateChanged, 'emit');
                        component.onSelectedDate({ cancelBubble: true }, 0, 5, 1);
                    });
                    it('the selected date is disabled', function () {
                        expect(component.yearMonths[0].weeks[5].days[1].disabled).toBe(true);
                    });
                    it('the calendar is still visible', function () {
                        expect(component.isDatePickerVisible).toBe(true);
                    });
                });
                describe('and selecting a day in the calendar ', function () {
                    beforeEach(function () {
                        var spy = spyOn(component.selectedDateChanged, 'emit');
                        component.onSelectedDate({ cancelBubble: true }, 0, 3, 1);
                    });
                    it('the selected date is set', function () {
                        expect(component.yearMonths[0].weeks[3].days[1].selected).toBe(true);
                    });
                    it('the calendar is closed', function () {
                        expect(component.isDatePickerVisible).toBe(false);
                    });
                    it('selectedDateChanged event is emitted', function () {
                        expect(component.selectedDateChanged.emit).toHaveBeenCalled();
                    });
                });
            });
            describe('when a date has been selected', function () {
                beforeEach(function () {
                    component.onSelectedDate({ cancelBubble: true }, 0, 3, 2);
                });
                describe('and a new date is selected', function () {
                    beforeEach(function () {
                        component.onSelectedDate({ cancelBubble: true }, 0, 3, 3);
                    });
                    it('the selected date is selected', function () {
                        expect(component.yearMonths[0].weeks[3].days[3].selected).toBe(true);
                    });
                    it('the previous date is not selected', function () {
                        expect(component.yearMonths[0].weeks[3].days[2].selected).toBe(false);
                    });
                });
            });
        });
    });
    describe('When calendar is open and focused', function () {
        beforeEach(function () {
            //component.ngOnInit();
            component.isDatePickerVisible = true;
            component.onEnter();
        });
        describe('and user leaves component', function () {
            beforeEach(function () {
                spyOn(component, 'validate');
                component.onLeave(null);
            });
            it('datepicker is validated', function () {
                expect(component.validate).toHaveBeenCalled();
            });
            it('the calendar is not visible', function () {
                expect(component.isDatePickerVisible).toBe(false);
            });
        });
        describe('and user leaves component with no related target', function () {
            beforeEach(function () {
                spyOn(component, 'validate');
                component.onLeave({ relatedTarget: null });
            });
            it('datepicker is validated', function () {
                expect(component.validate).toHaveBeenCalled();
            });
            it('the calendar is not visible', function () {
                expect(component.isDatePickerVisible).toBe(false);
            });
        });
    });
    describe('When calendar is disabled', function () {
        beforeEach(function () {
            component.disabled = true;
        });
        describe('and the datepicker is clicked', function () {
            beforeEach(function () {
                component.onDatePickerClick({ cancelBubble: true });
            });
            it('the calendar is not visible', function () {
                expect(component.isDatePickerVisible).toBe(false);
            });
        });
    });
    describe(' When initialized with 3 months', function () {
        beforeEach(function () {
            jasmine.clock().uninstall();
            jasmine.clock().install();
            var year = 2017;
            var october = 9;
            jasmine.clock().mockDate(new Date(year, october - 1, 15));
            component = new datepicker_component_1.DatepickerComponent(null, { detectChanges: function () { } }, null);
            component.minDate = new Date(year, october - 1, 1);
            component.maxDate = new Date(year, october + 1, 30);
            component.selectedDate = new Date(year, october, 1);
            component.ngOnInit();
        });
        it('can navigate to previous month', function () {
            expect(component.previousMonth).toBeTruthy();
        });
        it('can navigate to next month', function () {
            expect(component.nextMonth).toBeTruthy();
        });
        describe('and navigation to next month', function () {
            beforeEach(function () {
                component.onNextMonth({ cancelBubble: true });
            });
            it('can navigate to previous month', function () {
                expect(component.previousMonth).toBeTruthy();
            });
            it('can not navigate to next month', function () {
                expect(component.nextMonth).toBeFalsy();
            });
        });
        describe('and navigation to previous month', function () {
            beforeEach(function () {
                component.onPreviousMonth({ cancelBubble: true });
            });
            it('can not navigate to previous month', function () {
                expect(component.previousMonth).toBeFalsy();
            });
            it('can navigate to next month', function () {
                expect(component.nextMonth).toBeTruthy();
            });
        });
    });
    describe('correct css class assignment', function () {
        beforeEach(function () {
            component = new datepicker_component_1.DatepickerComponent(null, { detectChanges: function () { } }, null);
            component.yearMonths = [
                {
                    year: 2017, month: 1, weeks: [
                        {
                            days: [
                                { day: new Date(2017, 1, 1), disabled: true },
                                { day: new Date(2017, 1, 2), isCurrentDay: true },
                                { day: new Date(2017, 1, 3), selected: true },
                                { day: new Date(2017, 1, 4), disabled: false }
                            ]
                        }
                    ]
                }
            ];
            component.currentYearMonthIndex = 0;
        });
        describe('when checkDisabledDate is called', function () {
            it('disabled date returns true', function () {
                expect(component.checkDisabledDate(0, 0)).toBe(true);
            });
            it('enabled date returns false', function () {
                expect(component.checkDisabledDate(0, 3)).toBe(false);
            });
        });
        describe('when checkTodayDate is called', function () {
            it('todays date returns true', function () {
                expect(component.checkTodayDate(0, 1)).toBeTruthy();
            });
            it('other date returns false', function () {
                expect(component.checkTodayDate(0, 0)).toBeFalsy();
            });
        });
        describe('when checkSelectedDate is called', function () {
            it('selected date returns true', function () {
                expect(component.checkSelectedDate(0, 2)).toBeTruthy();
            });
            it('other date returns false', function () {
                expect(component.checkSelectedDate(0, 0)).toBeFalsy();
            });
        });
    });
});
//# sourceMappingURL=datePickerComponent.spec.js.map