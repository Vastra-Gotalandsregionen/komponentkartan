import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, Validators } from '@angular/forms';
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
            //   datepicker = rootElement.query(By.css('.datepicker'));
            fixture.detectChanges();

            done();
        });
    });

    describe('When initialized', () => {

        // beforeEach(() => {
        //     component.ngOnInit();
        // });

        it('the calendar is not visible', () => {
            let datepickerElement = fixture.debugElement.query(By.css('datepicker--open'));
            expect(datepickerElement).toBe(null);
        });

        // describe('and the datepicker is clicked', () => {
        //     beforeEach(() => {

        //         let datepickerElement = fixture.debugElement.query(By.css('.datepicker'));
        //         datepickerElement.triggerEventHandler('mousedown', { cancelBubble: false } as Event);

        //     });
        //     it('the calendar is visible', () => {
        //         let datepickerElement = fixture.debugElement.query(By.css('.datepicker--open'));
        //         console.log(fixture.debugElement.classes);
        //         expect(datepickerElement).not.toBe(null);
        //     });
        // });
        // describe('and the datepicker is closed', () => {
        //     beforeEach(() => {

        //         let datepickerElement = fixture.debugElement.query(By.css('.datepicker--open'));
        //         console.log(datepickerElement);
        //         datepickerElement.triggerEventHandler('mousedown', event);

        //     });
        //     it('the calendar is not visible', () => {
        //         //     expect(component.expanded).toBe(false);
        //         console.log(fixture.debugElement.classes);
        //         //expect(fixture.debugElement.query(By.css('.datepicker__calendar'))).toBeNull();
        //     });
        // });

        describe('and the datepicker is focusout', () => {
            beforeEach(() => {
                spyOn(component, 'onLeave').and.callThrough();
                const datepickerElement = fixture.debugElement.query(By.css('.datepicker'));
                datepickerElement.triggerEventHandler('focusout', event);
            });
            it('onLeave is has been called', () => {
                expect(component.onLeave).toHaveBeenCalled();
            });
        });

        describe('calender is opened and in focus', () => {
            beforeEach(() => {
                event = { cancelBubble: false } as Event;

                component.control = new FormControl(null, { validators: [Validators.required], updateOn: 'blur' });
                component.ngOnInit();
                component.onEnter();
                fixture.detectChanges();
            });
            it('validation-error--editing is active', () => {
                expect(rootElement.classes['validation-error--editing']).toEqual(true);
            });

            describe('date has been selected', () => {
                beforeEach(() => {
                    event = { cancelBubble: false } as Event;

                    component.control = new FormControl(null, { validators: [Validators.required], updateOn: 'blur' });
                    component.ngOnInit();
                    component.onEnter();
                    component.onSelectedDate(event, 1, 1, 1);
                    fixture.detectChanges();
                });
                it('validation-error--editing is no longer active', () => {
                    expect(rootElement.classes['validation-error--editing']).toEqual(false);
                });
            });
        });

    });
});

    // describe('When initialized with empty Selected date and readonly-mode', () => {
    //     beforeEach(() => {
    //         component.readonly = true;
    //         fixture.detectChanges();
    //     });

    //     it('has div class .readonly', () => {
    //         expect(fixture.debugElement.classes['readonly']).toBe(true);
    //     });
    //     it('selected date is empty', () => {
    //         const selectedDateSpan = fixture.debugElement.query(By.css('.datepicker__calendar__selector'));
    //         const content = selectedDateSpan.nativeElement.textContent;
    //         expect(content.trim()).toBe('');
    //     });
    // });

    // describe('When initialized with existing Selected date and readonly-mode', () => {
    //     beforeEach(() => {
    //         component.selectedDate = new Date(2017, 1, 1);
    //         component.readonly = true;
    //         component.selectedDateFormat = 'yyyy-MM-dd';
    //         fixture.detectChanges();
    //     });

    //     it('has div class .readonly', () => {
    //         expect(fixture.debugElement.classes['readonly']).toBe(true);
    //     });

    //     it('selected date is new Date(2017,1,1) and displayed on format yyyy-MM-dd', () => {
    //         const selectedDateSpan = fixture.debugElement.query(By.css('.datepicker__calendar__selector'));
    //         const content = selectedDateSpan.nativeElement.textContent;
    //         expect(content.trim()).toBe('2017-02-01');
    //     });
    // });

    // describe('When initialized with readonly-mode set to false', () => {
    //     beforeEach(() => {
    //         component.readonly = false;
    //         fixture.detectChanges();
    //     });

    //     it('does not have div class .readonly', () => {
    //         expect(fixture.debugElement.classes['readonly']).toBe(false);
    //     });
    // });

    // describe('When initialized with existing Selected date and disabled-mode', () => {
    //     beforeEach(() => {
    //         component.selectedDate = new Date(2017, 1, 1);
    //         component.disabled = true;
    //         component.selectedDateFormat = 'yyyy-MM-dd';
    //         fixture.detectChanges();
    //     });

    //     it('has div class .readonly', () => {
    //         expect(fixture.debugElement.classes['disabled']).toBe(true);
    //     });

    //     it('selected date is new Date(2017,1,1) and displayed on format yyyy-MM-dd', () => {
    //         const selectedDateSpan = fixture.debugElement.query(By.css('.datepicker__calendar__selector'));
    //         const content = selectedDateSpan.nativeElement.textContent;
    //         expect(content.trim()).toBe('2017-02-01');
    //     });
    // });

    // describe('When initialized with empty Selected date and disabled-mode', () => {
    //     beforeEach(() => {
    //         component.disabled = true;
    //         fixture.detectChanges();
    //     });

    //     it('has div class .readonly', () => {
    //         expect(fixture.debugElement.classes['disabled']).toBe(true);
    //     });
    //     it('selected date is empty', () => {
    //         const selectedDateSpan = fixture.debugElement.query(By.css('.datepicker__calendar__selector'));
    //         const content = selectedDateSpan.nativeElement.textContent;
    //         expect(content.trim()).toBe('Välj datum');
    //     });
    // });


    // describe('When initialized with disabled-mode set to false', () => {
    //     beforeEach(() => {
    //         component.disabled = false;
    //         fixture.detectChanges();
    //     });

    //     it('does not have div class .readonly', () => {
    //         expect(fixture.debugElement.classes['readonly']).toBe(false);
    //     });
    // });
//});
