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
import { TruncatePipe } from "../../component-package/pipes/truncatePipe";


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
                component.displayDatePicker();
            });
            it('the calendar is visible', () => {
                expect(component.isDatePickerVisible).toBe(true);
            });
            // describe('and user clicks outside the calendar', () => {
            //     beforeEach(() => {
            //         component.onOutsideClick({ target: new Document() })
            //     });
            //     it('the calendar is closed', () => {
            //         expect(component.isDatePickerVisible).toBe(false);
            //     });
            // });
        });
    });
});

