
// import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement, ChangeDetectorRef } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// import { MonthpickerComponent } from '../../controls/monthpicker/monthpicker.component';
// import { ICalendarMonth } from '../../models/calendarMonth.model';

// describe('[MonthpickerComponent]', () => {
//     let component: MonthpickerComponent;


//     beforeEach(() => {
//         component = new MonthpickerComponent(null, { detectChanges: () => { } } as ChangeDetectorRef, null);
//     });

//     describe('When initialized with minDate 2017-01-01 and maxDate 2017-02-01', () => {
//         beforeEach(() => {
//             component.minDate = new Date(2016, 0, 1);
//             component.maxDate = new Date(2016, 1, 1);
//             component.ngOnInit();
//         });

//         it('contains months after maxDate', () => {
//             expect(component.years[0].year).toBe(2016);
//         });

//         describe('when the component is resetted', () => {
//             beforeEach(() => {
//                 component.writeValue(null);
//             });
//             it('Eva is selected on component1', () => {
//                 component.years.forEach(y => y.months.forEach(m => {
//                     expect(m.selected).toBe(false);
//                 }));
//             });
//         });

//     });

//     describe('When initialized with minDate currentYearPlusOneYear-01-01 and currentYearPlusOneYear-02-01', () => {
//         const currentYearPlusOneYear = (new Date().getFullYear() + 1);
//         beforeEach(() => {
//             component.minDate = new Date(currentYearPlusOneYear, 0, 1);
//             component.maxDate = new Date(currentYearPlusOneYear, 1, 1);
//             component.ngOnInit();
//         });

//         it('contains currentYearPlusOneYear in years', () => {
//             expect(component.years.filter(x => x.year === currentYearPlusOneYear)[0].year).toBe(currentYearPlusOneYear);
//         });

//         it('contains currentYear in years', () => {
//             expect(component.years.filter(x => x.year === new Date().getFullYear())[0].year).toBe(new Date().getFullYear());
//         });
//     });

//     describe('When initialized with minDate currentYearPlusMinusYear-01-01 and currentYearMinusOneYear-02-01', () => {
//         const currentYearMinusOneYear = (new Date().getFullYear() - 1);
//         beforeEach(() => {
//             component.minDate = new Date(currentYearMinusOneYear, 0, 1);
//             component.maxDate = new Date(currentYearMinusOneYear, 1, 1);
//             component.ngOnInit();
//         });

//         it('contains currentYearPlusOneYear in years', () => {
//             expect(component.years.filter(x => x.year === currentYearMinusOneYear)[0].year).toBe(currentYearMinusOneYear);
//         });

//         it('contains currentYear in years', () => {
//             expect(component.years.filter(x => x.year === new Date().getFullYear())[0].year).toBe(new Date().getFullYear());
//         });
//     });

//     describe('When initialized with default settings', () => {
//         beforeEach(() => {
//             component.ngOnInit();
//         });
//         it('contains the current year', () => {
//             expect(component.years.map(x => x.year)).toEqual([new Date().getFullYear()]);
//         });
//         it('the current year contains 12 months', () => {
//             expect(component.years[0].months.map(x => x.displayName)).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']);
//         });
//         it('displayedYear is set to the current year', () => {
//             const actualCurrentYear = new Date().getFullYear();
//             const currentYear = component.years.filter(x => x.year === actualCurrentYear)[0];

//             expect(component.displayedYear).toBe(currentYear);
//         });
//         it('the current month is set', () => {
//             const actualCurrentMonth = new Date().getMonth();
//             const currentMonth = component.years[0].months.filter(x => x.date.getMonth() === actualCurrentMonth)[0];

//             expect(currentMonth.isCurrentMonth).toBe(true);
//         });
//     });

//     describe('When initialized with the current and next year', () => {
//         let currentYear: number;
//         let nextYear: number;
//         beforeEach(() => {
//             currentYear = new Date().getFullYear();
//             nextYear = new Date().getFullYear() + 1;
//             component.minDate = new Date(currentYear, 0);
//             component.maxDate = new Date(nextYear, 11, 31);
//             component.ngOnInit();
//         });
//         it('contains the current and next year ', () => {
//             expect(component.years.map(x => x.year)).toEqual([currentYear, nextYear]);
//         });
//         it('current year contains 12 months', () => {
//             expect(component.years[0].months.map(x => x.displayName)).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']);
//         });
//         it('next year contains 12 months', () => {
//             expect(component.years[1].months.map(x => x.displayName)).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']);
//         });
//         it('displayedYear is set to the current year', () => {
//             const expectedYear = component.years.filter(x => x.year === new Date().getFullYear())[0];

//             expect(component.displayedYear).toBe(expectedYear);
//         });
//         it('the current month is set', () => {
//             const actualCurrentMonth = new Date().getMonth();
//             const currentMonth = component.years[0].months.filter(x => x.date.getMonth() === actualCurrentMonth)[0];

//             expect(currentMonth.isCurrentMonth).toBe(true);
//         });
//         it('Only one month is set current month', () => {
//             expect(component.years[0].months.filter(x => x.isCurrentMonth).length).toBe(1);
//             expect(component.years[1].months.filter(x => x.isCurrentMonth).length).toBe(0);
//         });
//     });

//     describe('When initialized with the previous and the next year', () => {
//         let currentYear: number;
//         let nextYear: number;
//         let prevYear: number;
//         beforeEach(() => {
//             prevYear = new Date().getFullYear() - 1;
//             currentYear = new Date().getFullYear();
//             nextYear = new Date().getFullYear() + 1;
//             component.minDate = new Date(prevYear, 0);
//             component.maxDate = new Date(nextYear, 11, 31);
//             component.ngOnInit();
//         });
//         it('contains previous year, the current year and next year ', () => {
//             expect(component.years.map(x => x.year)).toEqual([prevYear, currentYear, nextYear]);
//         });

//         it('displayedYear is set to the current year', () => {
//             const expectedYear = component.years.filter(x => x.year === new Date().getFullYear())[0];

//             expect(component.displayedYear).toBe(expectedYear);
//         });
//         it('the current month is set', () => {
//             const actualCurrentMonth = new Date().getMonth();
//             const currentMonth = component.years.filter(y => y.year === currentYear)[0].months.filter(x => x.date.getMonth() === actualCurrentMonth)[0];

//             expect(currentMonth.isCurrentMonth).toBe(true);
//         });
//         it('previousYear is set', () => {
//             expect(component.previousYear).toBe(component.years[0]);
//         });
//         it('nextYear is set', () => {
//             expect(component.nextYear).toBe(component.years[2]);
//         });

//         it('Only one month is set current month', () => {
//             expect(component.years[0].months.filter(x => x.isCurrentMonth).length).toBe(0);
//             expect(component.years[1].months.filter(x => x.isCurrentMonth).length).toBe(1);
//             expect(component.years[2].months.filter(x => x.isCurrentMonth).length).toBe(0);
//         });


//         describe('and selectedDate is previous year', () => {

//             beforeEach(() => {
//                 component.selectedDate = new Date(prevYear, 2, 1);
//                 component.ngOnInit();
//             });

//             it('displayedYear is set to the selectedDates year', () => {
//                 expect(component.displayedYear.year).toBe(prevYear);
//             });
//         });
//     });

//     describe('When initialized with less than a year', () => {
//         describe('Within a year', () => {
//             let currentYear: number;
//             beforeEach(() => {
//                 currentYear = new Date().getFullYear();
//                 component.minDate = new Date(currentYear, 3);
//                 component.maxDate = new Date(currentYear, 7, 31);
//                 component.ngOnInit();
//             });
//             it('contains the current year ', () => {
//                 expect(component.years.map(x => x.year)).toEqual([currentYear]);
//             });
//             it('current year contains 12 months', () => {
//                 expect(component.years[0].months.map(x => x.displayName)).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']);
//             });
//             it('months before mindate and after maxdate are disabled', () => {
//                 expect(component.years[0].months.filter(x => x.disabled).map(x => x.displayName)).toEqual(['Jan', 'Feb', 'Mar', 'Sep', 'Okt', 'Nov', 'Dec']);
//             });
//             it('months within min/max are enabled', () => {
//                 expect(component.years[0].months.filter(x => !x.disabled).map(x => x.displayName)).toEqual(['Apr', 'Maj', 'Jun', 'Jul', 'Aug']);
//             });
//         });

//         describe('Between two years', () => {
//             let currentYear: number;
//             let nextYear: number;
//             beforeEach(() => {
//                 currentYear = new Date().getFullYear();
//                 nextYear = new Date().getFullYear() + 1;
//                 component.minDate = new Date(currentYear, 7);
//                 component.maxDate = new Date(nextYear, 2, 31);
//                 component.ngOnInit();
//             });
//             it('contains the current year and next year', () => {
//                 expect(component.years.map(x => x.year)).toEqual([currentYear, nextYear]);
//             });
//             it('current year contains 12 months', () => {
//                 expect(component.years[0].months.map(x => x.displayName)).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']);
//             });
//             it('next year contains 12 months', () => {
//                 expect(component.years[1].months.map(x => x.displayName)).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']);
//             });
//             it('months before mindate in the current year are disabled', () => {
//                 expect(component.years[0].months.filter(x => x.disabled).map(x => x.displayName)).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul']);
//             });
//             it('months after maxdate in the next year are disabled', () => {
//                 expect(component.years[1].months.filter(x => x.disabled).map(x => x.displayName)).toEqual(['Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']);
//             });
//         });
//     });

//     describe('When initialized with a specific date less than current year', () => {
//         let currentYear: number;
//         beforeEach(() => {
//             currentYear = new Date().getFullYear();
//             component.selectedDate = new Date(2015, 0, 1);
//             component.ngOnInit();
//         });
//         it('the default min date is set to 2015', () => {
//             expect(component.minDate.getFullYear()).toBe(2015);
//         });
//         it('the default max date is set to current Year', () => {
//             expect(component.maxDate.getFullYear()).toBe(currentYear);
//         });
//         it('displayedYear is set to 2015', () => {

//             const preselectedYear = component.years.filter(x => x.year === 2015)[0];

//             expect(component.displayedYear).toBe(preselectedYear);
//         });

//         it('january in 2015 is selected', () => {
//             expect(component.years[0].months.filter(x => x.selected).map(m => m.displayName)).toEqual(['Jan']);
//             expect(component.years[1].months.filter(x => x.selected).length).toBe(0);
//             expect(component.years[2].months.filter(x => x.selected).length).toBe(0);

//         });

//         it('Min date has first month in year', () => {
//             expect(component.minDate.getMonth()).toBe(0);
//         });

//     });

//     describe('When initialized with a specific date greater than current year', () => {
//         let currentYear: number;
//         beforeEach(() => {
//             currentYear = new Date().getFullYear();
//             component.selectedDate = new Date(currentYear + 2, 2, 1);
//             component.ngOnInit();
//         });
//         it('the default min date is set to currentYear', () => {
//             expect(component.minDate.getFullYear()).toBe(currentYear);
//         });
//         it('the default max date is set to currentYear + 2', () => {
//             expect(component.maxDate.getFullYear()).toBe(currentYear + 2);
//         });
//         it('displayedYear is set to currentYear + 2', () => {

//             const preselectedYear = component.years.filter(x => x.year === currentYear + 2)[0];

//             expect(component.displayedYear).toBe(preselectedYear);
//         });

//         it('mars in currentYear + 2 is selected', () => {
//             expect(component.years[0].months.filter(x => x.selected).length).toBe(0);
//             expect(component.years[1].months.filter(x => x.selected).length).toBe(0);
//             expect(component.years[2].months.filter(x => x.selected).map(m => m.displayName)).toEqual(['Mar']);

//         });


//         it('Max date has last month in year', () => {
//             expect(component.maxDate.getMonth()).toBe(11);
//         });
//     });

//     describe('When selecting a month', () => {
//         let selectedMonth: ICalendarMonth;
//         beforeEach(() => {
//             component.ngOnInit();
//             selectedMonth = component.years[0].months[0];
//             component.onSelectMonthMouseDown(selectedMonth);
//         });
//         it('the month is selected', () => {
//             expect(selectedMonth.selected).toBe(true);
//         });
//     });

//     describe('When selecting a month and the month is disabled', () => {
//         let selectedMonth: ICalendarMonth;
//         let currentYear: number;
//         beforeEach(() => {
//             currentYear = new Date().getFullYear();
//             component.minDate = new Date(currentYear, 1, 1);
//             component.ngOnInit();
//             selectedMonth = component.years[0].months[0];
//             component.onSelectMonthMouseDown(selectedMonth);
//         });
//         it('the month is not selected', () => {
//             expect(selectedMonth.selected).toBe(false);
//         });
//     });
// });

