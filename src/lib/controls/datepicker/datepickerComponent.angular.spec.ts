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

    beforeEach((done) => {
        jasmine.clock().uninstall();
        jasmine.clock().install();
        jasmine.clock().mockDate(new Date(2018, 2, 15));
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

        beforeEach(() => {
            component.ngOnInit();
        });

        it('the calendar is not visible', () => {
            const datepickerElement = fixture.debugElement.query(By.css('datepicker--open'));
            expect(datepickerElement).toBe(null);
        });

        describe('and the datepicker is clicked', () => {
            beforeEach(() => {

                const datepickerElement = fixture.debugElement.query(By.css('.datepicker'));
                datepickerElement.triggerEventHandler('mousedown', { cancelBubble: false } as Event);
                fixture.detectChanges();

            });
            it('the calendar is visible', () => {
                const datepickerElement = fixture.debugElement.query(By.css('.datepicker--open'));
                expect(datepickerElement).not.toBe(null);
            });

            describe('and the datepicker is closed', () => {
                beforeEach(() => {
                    const datepickerElement = fixture.debugElement.query(By.css('.datepicker--open'));
                    datepickerElement.triggerEventHandler('mousedown', event);
                    fixture.detectChanges();

                });
                it('the calendar is not visible', () => {
                    const datepickerElement = fixture.debugElement.query(By.css('datepicker--open'));
                    expect(datepickerElement).toBe(null);
                });
            });
        });

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

    describe('WCAG Tests', () => {
        let datepicker: DebugElement;
        beforeEach(() => {
            datepicker = rootElement.query(By.css('.datepicker'));
            fixture.detectChanges();
        });

        it('aria-expanded is false', () => {
            expect(datepicker.attributes['aria-expanded']).toBe('false');
        });
        it('aria-disabled is false', () => {
            expect(datepicker.attributes['aria-disabled']).toBe('false');
        });
        it('tabindex to be 0', () => {
            expect(datepicker.attributes['tabindex']).toBe('0');
        });
        it('aria-labelledby is set to', () => {
            expect(datepicker.attributes['aria-labelledby']).toBe(component.labelledbyid);
        });
        describe('datepicker is initialized with two years', () => {
            
            const currentYear = 2018;
            const currentMonth = 2; // mars
            const currentDate = 15;
            const daysInMonth = 31;

            let daysInCurrentMonth: DebugElement[];

            let currentYearElement;
            let nextMonthElement;

            beforeEach(() => {
                jasmine.clock().uninstall();
                jasmine.clock().install();
                jasmine.clock().mockDate(new Date(currentYear, currentMonth, currentDate));
                component.expanded = false;

                component.minDate = new Date(currentYear - 2, 5, 1);
                component.maxDate = new Date(currentYear, 11, 31);
                component.ngOnInit();
                fixture.detectChanges();

                nextMonthElement = fixture.debugElement.query(By.css('.datepicker__calendar__header__next-year'));

                daysInCurrentMonth = rootElement.queryAll(By.css('.datepicker__calendar__day'));
                currentYearElement = rootElement.query(By.css('.datepicker__calendar__header__year'));
            });

            it('current year is 2018 and month is March', () => {
                console.log(component.today);
                expect(currentYearElement.nativeElement.innerText).toBe('March 2018');
            });

            it('current month and year is in view', () => {
                expect(currentYearElement.nativeElement.innerText).toContain(currentYear.toString());
            });

            it('the month contains 30 days', () => {
                expect(daysInCurrentMonth.length).toBe(daysInMonth);
            });

            it('the days in view has the [attr.aria-selected] set to false', () => {
                jasmine.clock().tick(100);
                expect(daysInCurrentMonth.filter(d => d.attributes['aria-selected'] === 'false').length).toBe(daysInMonth);
            });

            it('next month has role button', () => {
                expect(nextMonthElement.attributes['role']).toBe('button');
            });

            it('the days has role set to gridcell', () => {
                expect(daysInCurrentMonth.filter(m => m.attributes['role'] === 'gridcell').length).toEqual(daysInMonth);
            });

            it('the days have aria-labels that contains year', () => {
                expect(daysInCurrentMonth[0].attributes['aria-label']).toContain(currentYear.toString());
            });

            describe('enter is pressed', () => {
                beforeEach(() => {
                    datepicker.triggerEventHandler('keydown', { keyCode: 13, preventDefault: function () { } } as KeyboardEvent);
                    fixture.detectChanges();
                    jasmine.clock().tick(100);
                });
                it('datepicker is expanded', () => {
                    expect(component.expanded).toBe(true);
                });
                it('attr.aria-expanded is true', () => {
                    expect(datepicker.attributes['aria-expanded']).toBe('true');
                });
                it('Current day in has focus', () => {
                    const focusedElement = rootElement.query(By.css(':focus'));
                    expect(focusedElement.nativeElement.innerText).toBe('15');
                });
                it('current year is 2018 and month is March', () => {
                    expect(currentYearElement.nativeElement.innerText).toBe('March 2018');
                });
                describe('and home is pressed', () => {
                    beforeEach(() => {
                        datepicker.triggerEventHandler('keydown', { keyCode: 36, preventDefault: function () { } } as KeyboardEvent);
                        fixture.detectChanges();
                    });
                    it('First day in month has focus', () => {
                        const focusedElement = rootElement.query(By.css(':focus'));
                        expect(focusedElement.nativeElement.innerText).toBe('1');
                    });
                    describe('arrow right is pressed', () => {
                        beforeEach(() => {
                            datepicker.triggerEventHandler('keydown', { keyCode: 39, preventDefault: function () { } } as KeyboardEvent);
                            fixture.detectChanges();
                        });
                        it('Second day in month has focus', () => {
                            const focusedElement = rootElement.query(By.css(':focus'));
                            expect(focusedElement.nativeElement.innerText).toBe('2');
                        });
                    });
                    describe('arrow down is pressed ', () => {
                        beforeEach(() => {
                            datepicker.triggerEventHandler('keydown', { keyCode: 40, preventDefault: function () { } } as KeyboardEvent);
                            fixture.detectChanges();
                        });
                        it('the 8th is focused', () => {
                            const focusedElement = rootElement.query(By.css(':focus'));
                            expect(focusedElement.nativeElement.innerText).toBe('8');
                        });
                    });
                    describe('arrow left is pressed', () => {
                        beforeEach(() => {
                            datepicker.triggerEventHandler('keydown', { keyCode: 37, preventDefault: function () { } } as KeyboardEvent);
                            fixture.detectChanges();
                            jasmine.clock().tick(100);
                        });
                        it('last day in February has focus', () => {
                            const focusedElement = rootElement.query(By.css(':focus'));
                            expect(focusedElement.nativeElement.innerText).toBe('28');
                        });
                        it('current year is 2018 and month is February', () => {
                            expect(currentYearElement.nativeElement.innerText).toBe('February 2018');
                        });
                    });
                    describe('arrow up is pressed ', () => {
                        beforeEach(() => {
                            datepicker.triggerEventHandler('keydown', { keyCode: 38, preventDefault: function () { } } as KeyboardEvent);
                            fixture.detectChanges();
                            jasmine.clock().tick(100);

                        });
                        it('the 22nd is focused', () => {
                            const focusedElement = rootElement.query(By.css(':focus'));
                            expect(focusedElement.nativeElement.innerText).toBe('22');
                        });
                        it('current year is 2018 and month is February', () => {
                            expect(currentYearElement.nativeElement.innerText).toBe('February 2018');
                        });
                    });
                });
                describe('and end is pressed', () => {
                    beforeEach(() => {
                        datepicker.triggerEventHandler('keydown', { keyCode: 35, preventDefault: function () { } } as KeyboardEvent);
                        fixture.detectChanges();
                    });
                    it('Last day in month has focus', () => {
                        const focusedElement = rootElement.query(By.css(':focus'));
                        const focusedDate = focusedElement.nativeElement.innerText;
                        expect(focusedDate).toBe(daysInMonth.toString());
                    });
                    describe('arrow left is pressed', () => {
                        beforeEach(() => {
                            datepicker.triggerEventHandler('keydown', { keyCode: 37, preventDefault: function () { } } as KeyboardEvent);
                            fixture.detectChanges();
                        });
                        it('second last day in month has focus', () => {
                            const focusedElement = rootElement.query(By.css(':focus'));
                            expect(focusedElement.nativeElement.innerText).toBe((daysInMonth - 1).toString());
                        });
                    });
                    describe('arrow right is pressed', () => {
                        beforeEach(() => {
                            datepicker.triggerEventHandler('keydown', { keyCode: 39, preventDefault: function () { } } as KeyboardEvent);
                            fixture.detectChanges();
                            jasmine.clock().tick(100);
                        });
                        it('first day in April has focus', () => {
                            const focusedElement = rootElement.query(By.css(':focus'));
                            expect(focusedElement.nativeElement.innerText).toBe('1');
                        });
                        it('current year is 2018 and month is April', () => {
                            expect(currentYearElement.nativeElement.innerText).toBe('April 2018');
                        });
                    });
                    describe('arrow up is pressed ', () => {
                        beforeEach(() => {
                            datepicker.triggerEventHandler('keydown', { keyCode: 38, preventDefault: function () { } } as KeyboardEvent);
                            fixture.detectChanges();
                        });
                        it('the 24th is focused', () => {
                            const focusedElement = rootElement.query(By.css(':focus'));
                            expect(focusedElement.nativeElement.innerText).toBe('24');
                        });
                        it('current year is 2018 and month is March', () => {
                            expect(currentYearElement.nativeElement.innerText).toBe('March 2018');
                        });
                        describe('page up is pressed ', () => {
                            beforeEach(() => {
                                datepicker.triggerEventHandler('keydown', { keyCode: 33, preventDefault: function () { } } as KeyboardEvent);
                                fixture.detectChanges();
                                jasmine.clock().tick(100);
                            });
                            it('the 24th is focused', () => {
                                const focusedElement = rootElement.query(By.css(':focus'));
                                expect(focusedElement.nativeElement.innerText).toBe('24');
                            });
                            it('current year is 2018 and month is February', () => {
                                expect(currentYearElement.nativeElement.innerText).toBe('February 2018');
                            });
                        });
                        describe('page down is pressed ', () => {
                            beforeEach(() => {
                                datepicker.triggerEventHandler('keydown', { keyCode: 34, preventDefault: function () { } } as KeyboardEvent);
                                fixture.detectChanges();
                                jasmine.clock().tick(100);
                            });
                            it('the 24th is focused', () => {
                                const focusedElement = rootElement.query(By.css(':focus'));
                                expect(focusedElement.nativeElement.innerText).toBe('24');
                            });
                            it('current year is 2018 and month is April', () => {
                                expect(currentYearElement.nativeElement.innerText).toBe('April 2018');
                            });

                        });
                    });
                    describe('arrow down is pressed ', () => {
                        beforeEach(() => {
                            datepicker.triggerEventHandler('keydown', { keyCode: 40, preventDefault: function () { } } as KeyboardEvent);
                            fixture.detectChanges();
                            jasmine.clock().tick(100);

                        });
                        it('the 22nd is focused', () => {
                            const focusedElement = rootElement.query(By.css(':focus'));
                            expect(focusedElement.nativeElement.innerText).toBe('7');
                        });
                        it('current year is 2018 and month is April', () => {
                            expect(currentYearElement.nativeElement.innerText).toBe('April 2018');
                        });
                    });
                });
                describe('Escape is pressed', () => {
                    beforeEach(() => {
                        datepicker.triggerEventHandler('keydown', { keyCode: 27, preventDefault: function () { } } as KeyboardEvent);
                        fixture.detectChanges();
                    });
                    it('datepicker is collapsed', () => {
                        expect(component.expanded).toBe(false);
                    });
                });
                describe('Tab is pressed', () => {
                    beforeEach(() => {
                        datepicker.triggerEventHandler('keydown', { keyCode: 9, preventDefault: function () { } } as KeyboardEvent);
                        fixture.detectChanges();
                    });
                    it('datepicker is collapsed', () => {
                        expect(component.expanded).toBe(false);
                    });
                });
                describe('and ctrl + home is pressed', () => {
                    beforeEach(() => {
                        datepicker.triggerEventHandler('keydown', { keyCode: 36, ctrlKey: true, preventDefault: function () { } } as KeyboardEvent);
                        fixture.detectChanges();
                        jasmine.clock().tick(100);

                    });
                    it('First day in year has focus', () => {
                        const focusedElement = rootElement.query(By.css(':focus'));
                        expect(focusedElement.nativeElement.innerText).toBe('1');
                    });
                    it('current year is 2018 and month is January', () => {
                        expect(currentYearElement.nativeElement.innerText).toBe('January 2018');
                    });
                });
                describe('and ctrl + end is pressed', () => {
                    beforeEach(() => {
                        datepicker.triggerEventHandler('keydown', { keyCode: 35, ctrlKey: true, preventDefault: function () { } } as KeyboardEvent);
                        fixture.detectChanges();
                        jasmine.clock().tick(100);

                    });
                    it('Last day in year has focus', () => {
                        const focusedElement = rootElement.query(By.css(':focus'));
                        expect(focusedElement.nativeElement.innerText).toBe('31');
                    });
                    it('current year is 2018 and month is December', () => {
                        expect(currentYearElement.nativeElement.innerText).toBe('December 2018');
                    });
                });
                describe('shift + page up is pressed ', () => {
                    beforeEach(() => {
                        datepicker.triggerEventHandler('keydown', { keyCode: 33, shiftKey: true, preventDefault: function () { } } as KeyboardEvent);
                        fixture.detectChanges();
                        jasmine.clock().tick(100);
                    });
                    it('the 15th is focused', () => {
                        const focusedElement = rootElement.query(By.css(':focus'));
                        expect(focusedElement.nativeElement.innerText).toBe('15');
                    });
                    it('current year is 2017 and month is March', () => {
                        expect(currentYearElement.nativeElement.innerText).toBe('March 2017');
                    });
                    describe('shift + page up is pressed ', () => {
                        beforeEach(() => {
                            datepicker.triggerEventHandler('keydown', { keyCode: 34, shiftKey: true, preventDefault: function () { } } as KeyboardEvent);
                            fixture.detectChanges();
                            jasmine.clock().tick(100);
                        });
                        it('the 15th is focused', () => {
                            const focusedElement = rootElement.query(By.css(':focus'));
                            expect(focusedElement.nativeElement.innerText).toBe('15');
                        });
                        it('current year is 2018 and month is March', () => {
                            expect(currentYearElement.nativeElement.innerText).toBe('March 2018');
                        });
                    });
                });
            });
        });
        describe('datepicker is initialized with three months', () => {
            
            const currentYear = 2018;
            const currentMonth = 2; // mars
            const currentDate = 15;
            const daysInMonth = 31;

            let daysInCurrentMonth: DebugElement[];

            let currentYearElement;
            let nextMonthElement;

            beforeEach(() => {
                jasmine.clock().uninstall();
                jasmine.clock().install();
                jasmine.clock().mockDate(new Date(currentYear, currentMonth, currentDate));
                component.expanded = false;

                component.minDate = new Date(currentYear, currentMonth - 1, 1);
                component.maxDate = new Date(currentYear, currentMonth + 1, 30);
                component.ngOnInit();
                fixture.detectChanges();

                nextMonthElement = fixture.debugElement.query(By.css('.datepicker__calendar__header__next-year'));

                daysInCurrentMonth = rootElement.queryAll(By.css('.datepicker__calendar__day'));
                currentYearElement = rootElement.query(By.css('.datepicker__calendar__header__year'));
            });

            it('focusableDays is set', () => {
                expect(component.focusableDays.length).toBe(daysInMonth);
            });
            describe('space is pressed', () => {
                let focusedElement: DebugElement;
                beforeEach(() => {
                    datepicker.triggerEventHandler('keydown', { keyCode: 32, preventDefault: function () { } } as KeyboardEvent);
                    fixture.detectChanges();
                    jasmine.clock().tick(100);
                });
                it('datepicker is expanded', () => {
                    expect(component.expanded).toBe(true);
                });
                it('attr.aria-expanded is true', () => {
                    expect(datepicker.attributes['aria-expanded']).toBe('true');
                });
                it('Current day in has focus', () => {
                    focusedElement = rootElement.query(By.css(':focus'));
                    expect(focusedElement.nativeElement.innerText).toBe('15');
                });
                it('current year is 2018 and month is March', () => {
                    expect(currentYearElement.nativeElement.innerText).toBe('March 2018');
                });

                describe('enter is pressed when a date is focused', ()=>{
                    beforeEach(() => {
                        daysInCurrentMonth[currentDate-1].triggerEventHandler('keydown', { keyCode: 13, preventDefault: function () { } } as KeyboardEvent);
                        fixture.detectChanges();
                    });
                    it('The focused date is selected', () => {
                        let date = new Date(2018,2,15);
                        expect(component.selectedDate).toEqual(date);
                    });
                });

                describe('and ctrl + home is pressed', () => {
                    beforeEach(() => {
                        datepicker.triggerEventHandler('keydown', { keyCode: 36, ctrlKey: true, preventDefault: function () { } } as KeyboardEvent);
                        fixture.detectChanges();
                        jasmine.clock().tick(100);

                    });
                    it('First day in year has focus', () => {
                        const focusedElement = rootElement.query(By.css(':focus'));
                        expect(focusedElement.nativeElement.innerText).toBe('1');
                    });
                    it('current year is 2018 and month is February', () => {
                        expect(currentYearElement.nativeElement.innerText).toBe('February 2018');
                    });
                    describe('space is pressed when a date is focused', ()=>{
                        beforeEach(() => {
                            daysInCurrentMonth[0].triggerEventHandler('keydown', { keyCode: 32, preventDefault: function () { } } as KeyboardEvent);
                            fixture.detectChanges();
                        });
                        it('The focused date is selected', () => {
                            let date = new Date(2018,1,1);
                            expect(component.selectedDate).toEqual(date);
                        });
                    });
                });



                describe('and ctrl + end is pressed', () => {
                    beforeEach(() => {
                        datepicker.triggerEventHandler('keydown', { keyCode: 35, ctrlKey: true, preventDefault: function () { } } as KeyboardEvent);
                        fixture.detectChanges();
                        jasmine.clock().tick(100);

                    });
                    it('Last day in year has focus', () => {
                        const focusedElement = rootElement.query(By.css(':focus'));
                        expect(focusedElement.nativeElement.innerText).toBe('30');
                    });
                    it('current year is 2018 and month is April', () => {
                        expect(currentYearElement.nativeElement.innerText).toBe('April 2018');
                    });
                });
                describe('and end is pressed', () => {
                    beforeEach(() => {
                        datepicker.triggerEventHandler('keydown', { keyCode: 35, preventDefault: function () { } } as KeyboardEvent);
                        fixture.detectChanges();
                    });
                    it('Last day in month has focus', () => {
                        const focusedElement = rootElement.query(By.css(':focus'));
                        const focusedDate = focusedElement.nativeElement.innerText;
                        expect(focusedDate).toBe(daysInMonth.toString());
                    });
                    describe('page up is pressed ', () => {
                        beforeEach(() => {
                            datepicker.triggerEventHandler('keydown', { keyCode: 33, preventDefault: function () { } } as KeyboardEvent);
                            fixture.detectChanges();
                            jasmine.clock().tick(100);
                        });
                        it('the 24th is focused', () => {
                            const focusedElement = rootElement.query(By.css(':focus'));
                            expect(focusedElement.nativeElement.innerText).toBe('28');
                        });
                        it('current year is 2018 and month is February', () => {
                            expect(currentYearElement.nativeElement.innerText).toBe('February 2018');
                        });
                    });
                    describe('page down is pressed ', () => {
                        beforeEach(() => {
                            datepicker.triggerEventHandler('keydown', { keyCode: 34, preventDefault: function () { } } as KeyboardEvent);
                            fixture.detectChanges();
                            jasmine.clock().tick(100);
                        });
                        it('the 24th is focused', () => {
                            const focusedElement = rootElement.query(By.css(':focus'));
                            expect(focusedElement.nativeElement.innerText).toBe('30');
                        });
                        it('current year is 2018 and month is April', () => {
                            expect(currentYearElement.nativeElement.innerText).toBe('April 2018');
                        });

                    });
                });
            });

        });
    });
});
