// import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MonthpickerComponent } from '../../controls/monthpicker/monthpicker.component';
// import { TruncatePipe } from '../../pipes/truncatePipe';


// describe('[MonthpickerComponent(Angular)]', () => {
//     let component: MonthpickerComponent;
//     let fixture: ComponentFixture<MonthpickerComponent>;
//     let rootElement: DebugElement;
//     let datepicker: DebugElement;

//     beforeEach((done) => {
//         TestBed.resetTestEnvironment();
//         TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
//         TestBed.configureTestingModule({
//             declarations: [MonthpickerComponent, TruncatePipe],
//             imports: [CommonModule]
//         });

//         TestBed.overrideComponent(MonthpickerComponent, {
//             set: {
//                 templateUrl: './monthpicker.component.html'
//             }
//         });


//         TestBed.compileComponents().then(() => {
//             fixture = TestBed.createComponent(MonthpickerComponent);
//             component = fixture.componentInstance;
//             rootElement = fixture.debugElement;
//             datepicker = rootElement.query(By.css('.monthpicker'));
//             fixture.detectChanges();

//             done();
//         });
//     });

//     describe('When in monthpicker and nextmonth is clicked', () => {
//         beforeEach(() => {
//             const nextMonth = fixture.debugElement.query(By.css('.monthpicker__calendar__header__next-year'));
//             spyOn(component, 'onLeave');
//             spyOn(component, 'onNextMouseDown');
//             nextMonth.triggerEventHandler('mousedown', event);
//         });

//         it('onNextMouseDown function has been called', () => {
//             expect(component.onNextMouseDown).toHaveBeenCalled();
//         });

//         it('onLeave event is not triggered', () => {
//             expect(component.onLeave).not.toHaveBeenCalled();
//         });
//     });

//     describe('When in monthpicker is clicked outside - focusedout', () => {
//         beforeEach(() => {
//             const nextMonth = fixture.debugElement.query(By.css('.monthpicker'));
//             spyOn(component, 'onLeave');
//             nextMonth.triggerEventHandler('focusout', event);
//         });

//         it('onLeave event is triggered', () => {
//             expect(component.onLeave).toHaveBeenCalled();
//         });
//     });

//     describe('When initialized with empty Selected date and readonly-mode', () => {
//         beforeEach(() => {
//             component.readonly = true;
//             fixture.detectChanges();
//         });

//         it('has div class .readonly', () => {
//             expect(fixture.debugElement.classes['readonly']).toBe(true);
//         });

//         it('selected date is empty', () => {
//             const selectedMonthSpan = fixture.debugElement.query(By.css('.monthpicker__dropdown span'));
//             const content = selectedMonthSpan.nativeElement.textContent;
//             expect(content.trim()).toBe('');
//         });
//     });

//     describe('When initialized with existing Selected date and readonly-mode', () => {
//         beforeEach(() => {
//             component.selectedDate = new Date(2017, 1, 1);
//             component.readonly = true;
//             component.selectedDateFormat = 'MM';
//             fixture.detectChanges();
//         });

//         it('has div class .readonly', () => {
//             expect(fixture.debugElement.classes['readonly']).toBe(true);
//         });

//         it('selected date is new Date(2017,1,1) and displayed on format MM', () => {
//             const selectedMonthSpan = fixture.debugElement.query(By.css('.monthpicker__dropdown span'));
//             const content = selectedMonthSpan.nativeElement.textContent;
//             expect(content.trim()).toBe('02');
//         });
//     });

//     describe('When initialized with readonly-mode set to false', () => {
//         beforeEach(() => {
//             component.readonly = false;
//             fixture.detectChanges();
//         });

//         it('does not have div class .readonly', () => {
//             expect(fixture.debugElement.classes['readonly']).toBe(false);
//         });
//     });

//     describe('When initialized with existing Selected date and disabled-mode', () => {
//         beforeEach(() => {
//             component.selectedDate = new Date(2017, 1, 1);
//             component.disabled = true;
//             component.selectedDateFormat = 'MM';
//             fixture.detectChanges();
//         });

//         it('has div class .readonly', () => {
//             expect(fixture.debugElement.classes['disabled']).toBe(true);
//         });

//         it('selected date is new Date(2017,1,1) and displayed on format MM', () => {
//             const selectedMonthSpan = fixture.debugElement.query(By.css('.monthpicker__dropdown span'));
//             const content = selectedMonthSpan.nativeElement.textContent;
//             expect(content.trim()).toBe('02');
//         });
//     });

//     describe('When initialized with empty Selected date and disabled-mode', () => {
//         beforeEach(() => {
//             component.disabled = true;
//             fixture.detectChanges();
//         });

//         it('has div class .readonly', () => {
//             expect(fixture.debugElement.classes['disabled']).toBe(true);
//         });

//         it('selected date is empty', () => {
//             const selectedMonthSpan = fixture.debugElement.query(By.css('.monthpicker__dropdown span'));
//             const content = selectedMonthSpan.nativeElement.textContent;
//             expect(content.trim()).toBe('Välj månad');
//         });
//     });

//     describe('When initialized with disabled-mode set to false', () => {
//         beforeEach(() => {
//             component.disabled = false;
//             fixture.detectChanges();
//         });

//         it('does not have div class .readonly', () => {
//             expect(fixture.debugElement.classes['readonly']).toBe(false);
//         });
//     });
// });

