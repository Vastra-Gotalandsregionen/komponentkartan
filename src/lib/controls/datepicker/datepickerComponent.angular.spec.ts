import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICalendarYearMonth } from '../../models/calendarYearMonth.model';
import { ICalendarWeek } from '../../models/calendarWeek.model';
import { ICalendarDay } from '../../models/calendarDay.model';
import { DatepickerComponent } from '../../controls/datepicker/datepicker.component';
import { inject } from '@angular/core/testing';
import { TruncatePipe } from '../../pipes/truncatePipe';


describe('[DatepickerComponent(Angular)]', () => {
    let component: DatepickerComponent;
    let fixture: ComponentFixture<DatepickerComponent>;
    let rootElement: DebugElement;
    let datepicker: DebugElement;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [DatepickerComponent, TruncatePipe],
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

    describe('When initialized', () => {

        beforeEach(() => {
            component.ngOnInit();
        });

        describe('and the datepicker is clicked', () => {

            beforeEach(() => {
                component.onDatePickerClick({ cancelBubble: true } as Event);
            });
            it('the calendar is visible', () => {
                expect(component.isDatePickerVisible).toBe(true);
            });

            describe('and the datepicker is closed', () => {
                beforeEach(() => {
                    const datepickerElement = fixture.debugElement.query(By.css('.datepicker--open'));
                    datepickerElement.triggerEventHandler('click', event);
                });
                it('the calendar is not visible', () => {
                    expect(component.isDatePickerVisible).toBe(false);
                    expect(fixture.debugElement.query(By.css('.datepicker__calendar'))).toBeNull();
                });
            });

            describe('and the datepicker is focusout', () => {
                beforeEach(() => {
                    spyOn(component, 'onLeave').and.callThrough();
                    spyOn(component, 'validate');
                    const datepickerElement = fixture.debugElement.query(By.css('.datepicker--open'));
                    datepickerElement.triggerEventHandler('focusout', event);
                });
                it('onLeave is has been called', () => {
                    expect(component.onLeave).toHaveBeenCalled();
                });
                it('datepicker is validated', () => {
                    expect(component.validate).toHaveBeenCalled();
                });
            });

        });
    });

    describe('When initialized with empty Selected date and readonly-mode', () => {
        beforeEach(() => {
            component.readonly = true;
            fixture.detectChanges();
        });

        it('has div class .readonly', () => {
            expect(fixture.debugElement.classes['readonly']).toBe(true);
        });
        it('selected date is empty', () => {
            const selectedDateSpan = fixture.debugElement.query(By.css('.datepicker__calendar__selector'));
            const content = selectedDateSpan.nativeElement.textContent;
            expect(content.trim()).toBe('');
        });
    });

    describe('When initialized with existing Selected date and readonly-mode', () => {
        beforeEach(() => {
            component.selectedDate = new Date(2017, 1, 1);
            component.readonly = true;
            component.selectedDateFormat = 'yyyy-MM-dd';
            fixture.detectChanges();
        });

        it('has div class .readonly', () => {
            expect(fixture.debugElement.classes['readonly']).toBe(true);
        });

        it('selected date is new Date(2017,1,1) and displayed on format yyyy-MM-dd', () => {
            const selectedDateSpan = fixture.debugElement.query(By.css('.datepicker__calendar__selector'));
            const content = selectedDateSpan.nativeElement.textContent;
            expect(content.trim()).toBe('2017-02-01');
        });
    });

    describe('When initialized with readonly-mode set to false', () => {
        beforeEach(() => {
            component.readonly = false;
            fixture.detectChanges();
        });

        it('does not have div class .readonly', () => {
            expect(fixture.debugElement.classes['readonly']).toBe(false);
        });
    });

    describe('When initialized with existing Selected date and disabled-mode', () => {
        beforeEach(() => {
            component.selectedDate = new Date(2017, 1, 1);
            component.disabled = true;
            component.selectedDateFormat = 'yyyy-MM-dd';
            fixture.detectChanges();
        });

        it('has div class .readonly', () => {
            expect(fixture.debugElement.classes['disabled']).toBe(true);
        });

        it('selected date is new Date(2017,1,1) and displayed on format yyyy-MM-dd', () => {
            const selectedDateSpan = fixture.debugElement.query(By.css('.datepicker__calendar__selector'));
            const content = selectedDateSpan.nativeElement.textContent;
            expect(content.trim()).toBe('2017-02-01');
        });
    });

    describe('When initialized with empty Selected date and disabled-mode', () => {
        beforeEach(() => {
            component.disabled = true;
            fixture.detectChanges();
        });

        it('has div class .readonly', () => {
            expect(fixture.debugElement.classes['disabled']).toBe(true);
        });
        it('selected date is empty', () => {
            const selectedDateSpan = fixture.debugElement.query(By.css('.datepicker__calendar__selector'));
            const content = selectedDateSpan.nativeElement.textContent;
            expect(content.trim()).toBe('Välj datum');
        });
    });


    describe('When initialized with disabled-mode set to false', () => {
        beforeEach(() => {
            component.disabled = false;
            fixture.detectChanges();
        });

        it('does not have div class .readonly', () => {
            expect(fixture.debugElement.classes['readonly']).toBe(false);
        });
    });
});
