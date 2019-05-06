import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DatepickerNewComponent } from './datepicker-new.component';
import { DatepickerItemComponent } from './datepicker-item.component';
import { IconComponent } from '../icon/icon.component';
import { ErrorMessagePipe } from '../../pipes/errorMessagePipe';
import { ReactiveFormsModule } from '@angular/forms';

describe('[DatepickerNewComponent - Angular]', () => {
  let component: DatepickerNewComponent;
  let fixture: ComponentFixture<DatepickerNewComponent>;
  let rootElement: DebugElement;
  let headerElement: DebugElement;
  let headerInputElement: DebugElement;
  let calendarElement: DebugElement;
  // let calendarHeaderElement: DebugElement;
  let now: Date;

  beforeAll(() => {
    now = new Date(2019, 3, 1);
    jasmine.clock().uninstall();
    jasmine.clock().install();
    jasmine.clock().mockDate(now);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatepickerNewComponent,
        DatepickerItemComponent,
        IconComponent,
        ErrorMessagePipe
      ],
      imports: [ReactiveFormsModule, FontAwesomeModule]
    });
    fixture = TestBed.createComponent(DatepickerNewComponent);
    rootElement = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When header is clicked', () => {
    beforeEach(() => {
      headerElement = rootElement.query(By.css('.datepicker-new__header'));
    });
    describe('and calendar is collapsed', () => {
      beforeEach(() => {
        component.expanded = false;
      });
      it('calendar is expanded', () => {
        headerElement.triggerEventHandler('click', null);
        fixture.detectChanges();
        calendarElement = rootElement.query(By.css('.datepicker-new__calendar'));
        expect(calendarElement).toBeTruthy();
      });
      describe('and component is disabled', () => {
        beforeEach(() => {
          component.disabled = true;
        });
        it('calendar is not expanded', () => {
          headerElement.triggerEventHandler('click', null);
          fixture.detectChanges();
          calendarElement = rootElement.query(By.css('.datepicker-new__calendar'));
          expect(calendarElement).toBeFalsy();
        });
      });
      describe('and component is readonly', () => {
        beforeEach(() => {
          component.readonly = true;
          fixture.detectChanges();
          headerElement = rootElement.query(By.css('.datepicker-new__readonly-header'));
        });
        it('calendar is not expanded', () => {
          headerElement.triggerEventHandler('click', null);
          fixture.detectChanges();
          calendarElement = rootElement.query(By.css('.datepicker-new__calendar'));
          expect(calendarElement).toBeFalsy();
        });
      });
    });
    describe('and calendar is expanded', () => {
      beforeEach(() => {
        component.expanded = true;
      });
      it('calendar is collapsed', () => {
        headerElement.triggerEventHandler('click', null);
        fixture.detectChanges();
        calendarElement = rootElement.query(By.css('.datepicker-new__calendar'));
        expect(calendarElement).toBeFalsy();
      });
    });
  });

  describe('When min zoom is days', () => {
    beforeEach(() => {
      component.minZoom = 'days';
      component.ngOnChanges({ minZoom: new SimpleChange(null, component.minZoom, true) });
      fixture.detectChanges();
    });
    describe('and valid text is entered', () => {
      beforeEach(() => {
        headerInputElement = rootElement.query(By.css('.datepicker-new__header__input'));
      });
      describe('with format YYMMDD', () => {
        it('date is selected', () => {
          const text = '000229';
          headerInputElement.triggerEventHandler('change', { target: { value: text } });
          fixture.detectChanges();
          expect(component.selectedDate).toEqual(new Date(2000, 1, 29));
        });
      });
      describe('with format YYYYMMDD', () => {
        it('date is selected', () => {
          const text = '20000229';
          headerInputElement.triggerEventHandler('change', { target: { value: text } });
          fixture.detectChanges();
          expect(component.selectedDate).toEqual(new Date(2000, 1, 29));
        });
      });
      describe('with format YY-MM-DD', () => {
        it('date is selected', () => {
          const text = '00-02-29';
          headerInputElement.triggerEventHandler('change', { target: { value: text } });
          fixture.detectChanges();
          expect(component.selectedDate).toEqual(new Date(2000, 1, 29));
        });
      });
      describe('with format YYYY-MM-DD', () => {
        it('date is selected', () => {
          const text = '2000-02-29';
          headerInputElement.triggerEventHandler('change', { target: { value: text } });
          fixture.detectChanges();
          expect(component.selectedDate).toEqual(new Date(2000, 1, 29));
        });
      });
      describe('with format YY MM DD', () => {
        it('date is selected', () => {
          const text = '00 02 29';
          headerInputElement.triggerEventHandler('change', { target: { value: text } });
          fixture.detectChanges();
          expect(component.selectedDate).toEqual(new Date(2000, 1, 29));
        });
      });
      describe('with format YYYY MM DD', () => {
        it('date is selected', () => {
          const text = '2000 02 29';
          headerInputElement.triggerEventHandler('change', { target: { value: text } });
          fixture.detectChanges();
          expect(component.selectedDate).toEqual(new Date(2000, 1, 29));
        });
      });
    });
    describe('and invalid text is entered', () => {
      beforeEach(() => {
        headerInputElement = rootElement.query(By.css('.datepicker-new__header__input'));
        const text = 'invalid';
        headerInputElement.triggerEventHandler('change', { target: { value: text } });
        fixture.detectChanges();
      });
      it('no date is selected', () => {
        expect(component.selectedDate).toBeFalsy();
      });
      it('error is shown', () => {
        const validationStatusMessageElement = rootElement.query(By.css('.validation__status__message'));
        expect(validationStatusMessageElement.nativeElement.innerText).toBe('Felaktigt format');
      });
    });
    describe('and calendar is open', () => {
      beforeEach(() => {
        headerElement = rootElement.query(By.css('.datepicker-new__header'));
        headerElement.triggerEventHandler('click', null);
        fixture.detectChanges();
      });
      describe('and date is clicked', () => {
        it('date is selected', () => {
          const dateElement = rootElement.query(By.css('table tr:nth-child(4) td:nth-child(1) .datepicker-new__calendar__body__item'));
          dateElement.triggerEventHandler('click', null);
          expect(component.selectedDate).toEqual(new Date(now.getFullYear(), now.getMonth(), 15));
        });
      });
      describe('and previous arrow is clicked', () => {
        it('previous month is shown', () => {
        });
      });
      describe('and next arrow is clicked', () => {
        it('next month is shown', () => {
        });
      });
      describe('and header is clicked', () => {
        it('months are shown', () => {
        });
        describe('and month is clicked', () => {
          it('days are shown', () => {
          });
        });
        describe('and header is clicked', () => {
          it('years are shown', () => {
          });
          describe('and year is clicked', () => {
            it('months are shown', () => {
            });
          });
        });
      });
    });
  });

  describe('When min zoom is months', () => {
    beforeEach(() => {
      component.minZoom = 'months';
      component.ngOnChanges({ minZoom: new SimpleChange(null, component.minZoom, true) });
      fixture.detectChanges();
    });
    describe('and valid text is entered', () => {
      beforeEach(() => {
        headerInputElement = rootElement.query(By.css('.datepicker-new__header__input'));
      });
      describe('with format YYMM', () => {
        it('month is selected', () => {
          const text = '0002';
          headerInputElement.triggerEventHandler('change', { target: { value: text } });
          fixture.detectChanges();
          expect(component.selectedDate).toEqual(new Date(2000, 1, 1));
        });
      });
      describe('with format YYYYMM', () => {
        it('month is selected', () => {
          const text = '200002';
          headerInputElement.triggerEventHandler('change', { target: { value: text } });
          fixture.detectChanges();
          expect(component.selectedDate).toEqual(new Date(2000, 1, 1));
        });
      });
      describe('with format YY-MM', () => {
        it('month is selected', () => {
          const text = '00-02';
          headerInputElement.triggerEventHandler('change', { target: { value: text } });
          fixture.detectChanges();
          expect(component.selectedDate).toEqual(new Date(2000, 1, 1));
        });
      });
      describe('with format YYYY-MM', () => {
        it('month is selected', () => {
          const text = '2000-02';
          headerInputElement.triggerEventHandler('change', { target: { value: text } });
          fixture.detectChanges();
          expect(component.selectedDate).toEqual(new Date(2000, 1, 1));
        });
      });
      describe('with format YY MM', () => {
        it('month is selected', () => {
          const text = '00 02';
          headerInputElement.triggerEventHandler('change', { target: { value: text } });
          fixture.detectChanges();
          expect(component.selectedDate).toEqual(new Date(2000, 1, 1));
        });
      });
      describe('with format YYYY MM', () => {
        it('month is selected', () => {
          const text = '2000 02';
          headerInputElement.triggerEventHandler('change', { target: { value: text } });
          fixture.detectChanges();
          expect(component.selectedDate).toEqual(new Date(2000, 1, 1));
        });
      });
      describe('with format abreviated month YY', () => {
        it('month is selected', () => {
          const text = 'feb. 00';
          headerInputElement.triggerEventHandler('change', { target: { value: text } });
          fixture.detectChanges();
          expect(component.selectedDate).toEqual(new Date(2000, 1, 1));
        });
      });
      describe('with format abreviated month YYYY', () => {
        it('month is selected', () => {
          const text = 'feb. 2000';
          headerInputElement.triggerEventHandler('change', { target: { value: text } });
          fixture.detectChanges();
          expect(component.selectedDate).toEqual(new Date(2000, 1, 1));
        });
      });
      describe('with format month YY', () => {
        it('month is selected', () => {
          const text = 'februari 00';
          headerInputElement.triggerEventHandler('change', { target: { value: text } });
          fixture.detectChanges();
          expect(component.selectedDate).toEqual(new Date(2000, 1, 1));
        });
      });
      describe('with format month YYYY', () => {
        it('month is selected', () => {
          const text = 'februari 2000';
          headerInputElement.triggerEventHandler('change', { target: { value: text } });
          fixture.detectChanges();
          expect(component.selectedDate).toEqual(new Date(2000, 1, 1));
        });
      });
    });
    describe('and invalid text is entered', () => {
      it('error is shown', () => {
      });
    });
    describe('and month is clicked', () => {
      it('month is selected', () => {
      });
    });
    describe('and previous arrow is clicked', () => {
      it('previous year is shown', () => {
      });
    });
    describe('and next arrow is clicked', () => {
      it('next year is shown', () => {
      });
    });
    describe('and header is clicked', () => {
      it('years are shown', () => {
      });
      describe('and year is clicked', () => {
        it('months are shown', () => {
        });
      });
    });
  });

  describe('When min zoom is years', () => {
    beforeEach(() => {
      component.minZoom = 'years';
      component.ngOnChanges({ minZoom: new SimpleChange(null, component.minZoom, true) });
      fixture.detectChanges();
    });
    describe('and valid text is entered', () => {
      beforeEach(() => {
        headerInputElement = rootElement.query(By.css('.datepicker-new__header__input'));
      });
      describe('with format YY', () => {
        it('year is selected', () => {
          const text = '00';
          headerInputElement.triggerEventHandler('change', { target: { value: text } });
          fixture.detectChanges();
          expect(component.selectedDate).toEqual(new Date(2000, 0, 1));
        });
      });
      describe('with format YYYY', () => {
        it('year is selected', () => {
          const text = '2000';
          headerInputElement.triggerEventHandler('change', { target: { value: text } });
          fixture.detectChanges();
          expect(component.selectedDate).toEqual(new Date(2000, 0, 1));
        });
      });
    });
    describe('and invalid text is entered', () => {
      it('error is shown', () => {
      });
    });
    describe('and year is clicked', () => {
      it('year is selected', () => {
      });
    });
    describe('and previous arrow is clicked', () => {
      it('previous nine years are shown', () => {
      });
    });
    describe('and next arrow is clicked', () => {
      it('next nine years are shown', () => {
      });
    });
  });

});
