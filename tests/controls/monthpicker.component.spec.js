"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var monthpicker_component_1 = require("../../component-package/controls/monthpicker/monthpicker.component");
describe('[MonthpickerComponent]', function () {
    var component;
    beforeEach(function () {
        component = new monthpicker_component_1.MonthpickerComponent(null, { detectChanges: function () { } }, null);
    });
    describe('When initialized with minDate 2017-01-01 and maxDate 2017-02-01', function () {
        beforeEach(function () {
            component.minDate = new Date(2016, 0, 1);
            component.maxDate = new Date(2016, 1, 1);
            component.ngOnInit();
        });
        it('contains months after maxDate', function () {
            expect(component.years[0].year).toBe(2016);
        });
    });
    describe('When initialized with minDate currentYearPlusOneYear-01-01 and currentYearPlusOneYear-02-01', function () {
        var currentYearPlusOneYear = (new Date().getFullYear() + 1);
        beforeEach(function () {
            component.minDate = new Date(currentYearPlusOneYear, 0, 1);
            component.maxDate = new Date(currentYearPlusOneYear, 1, 1);
            component.ngOnInit();
        });
        it('contains currentYearPlusOneYear in years', function () {
            expect(component.years.filter(function (x) { return x.year === currentYearPlusOneYear; })[0].year).toBe(currentYearPlusOneYear);
        });
        it('contains currentYear in years', function () {
            expect(component.years.filter(function (x) { return x.year === new Date().getFullYear(); })[0].year).toBe(new Date().getFullYear());
        });
    });
    describe('When initialized with minDate currentYearPlusMinusYear-01-01 and currentYearMinusOneYear-02-01', function () {
        var currentYearMinusOneYear = (new Date().getFullYear() - 1);
        beforeEach(function () {
            component.minDate = new Date(currentYearMinusOneYear, 0, 1);
            component.maxDate = new Date(currentYearMinusOneYear, 1, 1);
            component.ngOnInit();
        });
        it('contains currentYearPlusOneYear in years', function () {
            expect(component.years.filter(function (x) { return x.year === currentYearMinusOneYear; })[0].year).toBe(currentYearMinusOneYear);
        });
        it('contains currentYear in years', function () {
            expect(component.years.filter(function (x) { return x.year === new Date().getFullYear(); })[0].year).toBe(new Date().getFullYear());
        });
    });
    describe('When initialized with default settings', function () {
        beforeEach(function () {
            component.ngOnInit();
        });
        it('contains the current year', function () {
            expect(component.years.map(function (x) { return x.year; })).toEqual([new Date().getFullYear()]);
        });
        it('the current year contains 12 months', function () {
            expect(component.years[0].months.map(function (x) { return x.displayName; })).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']);
        });
        it('displayedYear is set to the current year', function () {
            var actualCurrentYear = new Date().getFullYear();
            var currentYear = component.years.filter(function (x) { return x.year === actualCurrentYear; })[0];
            expect(component.displayedYear).toBe(currentYear);
        });
        it('the current month is set', function () {
            var actualCurrentMonth = new Date().getMonth();
            var currentMonth = component.years[0].months.filter(function (x) { return x.date.getMonth() === actualCurrentMonth; })[0];
            expect(currentMonth.isCurrentMonth).toBe(true);
        });
    });
    describe('When initialized with the current and next year', function () {
        var currentYear;
        var nextYear;
        beforeEach(function () {
            currentYear = new Date().getFullYear();
            nextYear = new Date().getFullYear() + 1;
            component.minDate = new Date(currentYear, 0);
            component.maxDate = new Date(nextYear, 11, 31);
            component.ngOnInit();
        });
        it('contains the current and next year ', function () {
            expect(component.years.map(function (x) { return x.year; })).toEqual([currentYear, nextYear]);
        });
        it('current year contains 12 months', function () {
            expect(component.years[0].months.map(function (x) { return x.displayName; })).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']);
        });
        it('next year contains 12 months', function () {
            expect(component.years[1].months.map(function (x) { return x.displayName; })).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']);
        });
        it('displayedYear is set to the current year', function () {
            var expectedYear = component.years.filter(function (x) { return x.year === new Date().getFullYear(); })[0];
            expect(component.displayedYear).toBe(expectedYear);
        });
        it('the current month is set', function () {
            var actualCurrentMonth = new Date().getMonth();
            var currentMonth = component.years[0].months.filter(function (x) { return x.date.getMonth() === actualCurrentMonth; })[0];
            expect(currentMonth.isCurrentMonth).toBe(true);
        });
        it('Only one month is set current month', function () {
            expect(component.years[0].months.filter(function (x) { return x.isCurrentMonth; }).length).toBe(1);
            expect(component.years[1].months.filter(function (x) { return x.isCurrentMonth; }).length).toBe(0);
        });
    });
    describe('When initialized with the previous and the next year', function () {
        var currentYear;
        var nextYear;
        var prevYear;
        beforeEach(function () {
            prevYear = new Date().getFullYear() - 1;
            currentYear = new Date().getFullYear();
            nextYear = new Date().getFullYear() + 1;
            component.minDate = new Date(prevYear, 0);
            component.maxDate = new Date(nextYear, 11, 31);
            component.ngOnInit();
        });
        it('contains previous year, the current year and next year ', function () {
            expect(component.years.map(function (x) { return x.year; })).toEqual([prevYear, currentYear, nextYear]);
        });
        it('displayedYear is set to the current year', function () {
            var expectedYear = component.years.filter(function (x) { return x.year === new Date().getFullYear(); })[0];
            expect(component.displayedYear).toBe(expectedYear);
        });
        it('the current month is set', function () {
            var actualCurrentMonth = new Date().getMonth();
            var currentMonth = component.years.filter(function (y) { return y.year === currentYear; })[0].months.filter(function (x) { return x.date.getMonth() === actualCurrentMonth; })[0];
            expect(currentMonth.isCurrentMonth).toBe(true);
        });
        it('previousYear is set', function () {
            expect(component.previousYear).toBe(component.years[0]);
        });
        it('nextYear is set', function () {
            expect(component.nextYear).toBe(component.years[2]);
        });
        it('Only one month is set current month', function () {
            expect(component.years[0].months.filter(function (x) { return x.isCurrentMonth; }).length).toBe(0);
            expect(component.years[1].months.filter(function (x) { return x.isCurrentMonth; }).length).toBe(1);
            expect(component.years[2].months.filter(function (x) { return x.isCurrentMonth; }).length).toBe(0);
        });
        describe('and selectedDate is previous year', function () {
            beforeEach(function () {
                component.selectedDate = new Date(prevYear, 2, 1);
                component.ngOnInit();
            });
            it('displayedYear is set to the selectedDates year', function () {
                expect(component.displayedYear.year).toBe(prevYear);
            });
        });
    });
    describe('When initialized with less than a year', function () {
        describe('Within a year', function () {
            var currentYear;
            beforeEach(function () {
                currentYear = new Date().getFullYear();
                component.minDate = new Date(currentYear, 3);
                component.maxDate = new Date(currentYear, 7, 31);
                component.ngOnInit();
            });
            it('contains the current year ', function () {
                expect(component.years.map(function (x) { return x.year; })).toEqual([currentYear]);
            });
            it('current year contains 12 months', function () {
                expect(component.years[0].months.map(function (x) { return x.displayName; })).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']);
            });
            it('months before mindate and after maxdate are disabled', function () {
                expect(component.years[0].months.filter(function (x) { return x.disabled; }).map(function (x) { return x.displayName; })).toEqual(['Jan', 'Feb', 'Mar', 'Sep', 'Okt', 'Nov', 'Dec']);
            });
            it('months within min/max are enabled', function () {
                expect(component.years[0].months.filter(function (x) { return !x.disabled; }).map(function (x) { return x.displayName; })).toEqual(['Apr', 'Maj', 'Jun', 'Jul', 'Aug']);
            });
        });
        describe('Between two years', function () {
            var currentYear;
            var nextYear;
            beforeEach(function () {
                currentYear = new Date().getFullYear();
                nextYear = new Date().getFullYear() + 1;
                component.minDate = new Date(currentYear, 7);
                component.maxDate = new Date(nextYear, 2, 31);
                component.ngOnInit();
            });
            it('contains the current year and next year', function () {
                expect(component.years.map(function (x) { return x.year; })).toEqual([currentYear, nextYear]);
            });
            it('current year contains 12 months', function () {
                expect(component.years[0].months.map(function (x) { return x.displayName; })).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']);
            });
            it('next year contains 12 months', function () {
                expect(component.years[1].months.map(function (x) { return x.displayName; })).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']);
            });
            it('months before mindate in the current year are disabled', function () {
                expect(component.years[0].months.filter(function (x) { return x.disabled; }).map(function (x) { return x.displayName; })).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul']);
            });
            it('months after maxdate in the next year are disabled', function () {
                expect(component.years[1].months.filter(function (x) { return x.disabled; }).map(function (x) { return x.displayName; })).toEqual(['Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']);
            });
        });
    });
    describe('When initialized with a specific date less than current year', function () {
        var currentYear;
        beforeEach(function () {
            currentYear = new Date().getFullYear();
            component.selectedDate = new Date(2015, 0, 1);
            component.ngOnInit();
        });
        it('the default min date is set to 2015', function () {
            expect(component.minDate.getFullYear()).toBe(2015);
        });
        it('the default max date is set to current Year', function () {
            expect(component.maxDate.getFullYear()).toBe(currentYear);
        });
        it('displayedYear is set to 2015', function () {
            var preselectedYear = component.years.filter(function (x) { return x.year === 2015; })[0];
            expect(component.displayedYear).toBe(preselectedYear);
        });
        it('january in 2015 is selected', function () {
            expect(component.years[0].months.filter(function (x) { return x.selected; }).map(function (m) { return m.displayName; })).toEqual(['Jan']);
            expect(component.years[1].months.filter(function (x) { return x.selected; }).length).toBe(0);
            expect(component.years[2].months.filter(function (x) { return x.selected; }).length).toBe(0);
        });
        it('Min date has first month in year', function () {
            expect(component.minDate.getMonth()).toBe(0);
        });
    });
    describe('When initialized with a specific date greater than current year', function () {
        var currentYear;
        beforeEach(function () {
            currentYear = new Date().getFullYear();
            component.selectedDate = new Date(currentYear + 2, 2, 1);
            component.ngOnInit();
        });
        it('the default min date is set to currentYear', function () {
            expect(component.minDate.getFullYear()).toBe(currentYear);
        });
        it('the default max date is set to currentYear + 2', function () {
            expect(component.maxDate.getFullYear()).toBe(currentYear + 2);
        });
        it('displayedYear is set to currentYear + 2', function () {
            var preselectedYear = component.years.filter(function (x) { return x.year === currentYear + 2; })[0];
            expect(component.displayedYear).toBe(preselectedYear);
        });
        it('mars in currentYear + 2 is selected', function () {
            expect(component.years[0].months.filter(function (x) { return x.selected; }).length).toBe(0);
            expect(component.years[1].months.filter(function (x) { return x.selected; }).length).toBe(0);
            expect(component.years[2].months.filter(function (x) { return x.selected; }).map(function (m) { return m.displayName; })).toEqual(['Mar']);
        });
        it('Max date has last month in year', function () {
            expect(component.maxDate.getMonth()).toBe(11);
        });
    });
    describe('When selecting a month', function () {
        var selectedMonth;
        beforeEach(function () {
            component.ngOnInit();
            selectedMonth = component.years[0].months[0];
            component.onSelectMonthMouseDown(selectedMonth);
        });
        it('the month is selected', function () {
            expect(selectedMonth.selected).toBe(true);
        });
    });
    describe('When selecting a month and the month is disabled', function () {
        var selectedMonth;
        var currentYear;
        beforeEach(function () {
            currentYear = new Date().getFullYear();
            component.minDate = new Date(currentYear, 1, 1);
            component.ngOnInit();
            selectedMonth = component.years[0].months[0];
            component.onSelectMonthMouseDown(selectedMonth);
        });
        it('the month is not selected', function () {
            expect(selectedMonth.selected).toBe(false);
        });
    });
});
//# sourceMappingURL=monthpicker.component.spec.js.map