
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import {
  FormsModule, ReactiveFormsModule, ControlContainer,
  FormGroup, FormControl, Validators, AbstractControl, Form
} from '@angular/forms';
import { DebugElement } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { InputComponent } from '../../controls/input/input.component';

import { ErrorHandler } from '../../services/errorhandler';
import { TruncatePipe } from '../../pipes/truncatePipe';
import { ErrorMessagePipe } from '../../pipes/errorMessagePipe';

// Locale registration
import { registerLocaleData } from '@angular/common';
import localeSe from '@angular/common/locales/se';
import localeSerExtra from '@angular/common/locales/extra/se';
registerLocaleData(localeSe, 'sv-SE', localeSerExtra);

import { combineAll } from 'rxjs/operator/combineAll';
import { Observable } from 'rxjs/Observable';

describe('[InputComponent]', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let rootElement: DebugElement;

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [InputComponent, TruncatePipe, ErrorMessagePipe],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
      providers: [ErrorHandler, ControlContainer]
    });

    TestBed.overrideComponent(InputComponent, {
      set: {
        templateUrl: 'input.component.html'
      }
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(InputComponent);
      component = fixture.componentInstance;
      rootElement = fixture.debugElement;
      fixture.detectChanges();

      done();
    });
  });

  // Emulate OnBlur
  // Emulate OnChange

  // Emulate OnSubmit
  describe('When initialized with invalid state and showValidation is false', () => {
    beforeEach(() => {
      component.control = new FormControl('', { validators: [Validators.required], updateOn: 'submit' });
      component.errorMessage = 'error';
      component.formatNumber = true;
      component.showValidation = false;
      component.readonly = false;
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('CSS Class validated-input has been applied', () => {
      expect(rootElement.classes['validated-input']).toEqual(true);
    });

    it('no CSS Class validation-error has been applied', () => {
      expect(rootElement.classes['validation-error--editing']).toEqual(false);
      expect(rootElement.classes['validation-error--active']).toEqual(false);
      expect(rootElement.classes['validation-error--fixed']).toEqual(false);
    });

    it('There is an error message section', () => {
      const element = rootElement.query(By.css('.input-validation_status__message'));
      expect(element.nativeElement.innerText).toEqual('error');
    });

    describe('When submited without changes', () => {
      beforeEach(() => {
        component.showValidation = true;
        fixture.detectChanges();
        rootElement.triggerEventHandler('submit', event);
      });

      it('CSS Class validation-error--active has been applied', () => {
        expect(rootElement.classes['validation-error--active']).toEqual(true);
      });

      describe('When input is focused', () => {
        beforeEach(() => {
          component.control.markAsTouched();
          component.onFocus();
          fixture.detectChanges();
        });
        it('CSS Class validation-error--editing has been applied', () => {
          expect(rootElement.classes['validation-error--editing']).toEqual(true);
          expect(rootElement.classes['validation-error--active']).toEqual(false);
          expect(rootElement.classes['validation-error--fixed']).toEqual(false);
        });

        describe('When input is focused and corrected', () => {
          beforeEach(() => {
            component.onFocus();
            fixture.detectChanges();
          });
          it('CSS Class validation-error--editing has been applied', () => {
            expect(rootElement.classes['validation-error--editing']).toEqual(true);
            expect(rootElement.classes['validation-error--active']).toEqual(false);
            expect(rootElement.classes['validation-error--fixed']).toEqual(false);
          });

          describe('When input is out of focus and still corrected', () => {
            beforeEach(() => {
              component.onBlur(null);
              fixture.detectChanges();
            });
            it('CSS Class validation-error--active is still active', () => {
              expect(rootElement.classes['validation-error--editing']).toEqual(false);
              expect(rootElement.classes['validation-error--active']).toEqual(true);
              expect(rootElement.classes['validation-error--fixed']).toEqual(false);
            });

            describe('When submit is triggered with valid input', () => {
              beforeEach(() => {
                component.control.setValue(12312);
                fixture.detectChanges();
                rootElement.triggerEventHandler('submit', event);
              });
              it('Validation is not triggered', () => {
                expect(rootElement.classes['validation-error--editing']).toEqual(false);
                expect(rootElement.classes['validation-error--active']).toEqual(false);
                expect(rootElement.classes['validation-error--fixed']).toEqual(true);
              });
            });

            describe('When submit is triggered with string input', () => {
              beforeEach(() => {
                component.writeValue('abc def');
                component.onFocus();
                fixture.detectChanges();
              });
              it('Formatting is not triggered', () => {
                expect(component.displayValue).toEqual('abc def');
              });
            });
          });
        });
      });

      describe('When focused', () => {
        beforeEach(() => {
          component.control = new FormControl('', { validators: [Validators.required] });
          component.errorMessage = 'error';
          component.showValidation = false;
          component.readonly = false;
          component.ngOnInit();
          fixture.detectChanges();
          const element = rootElement.query(By.css('.input-container__textbox'));
          element.triggerEventHandler('focus', null);
        });
        it('Validation is not triggered', () => {
          const element = rootElement.query(By.css('.input-validation_status__message'));
          expect(element.nativeElement.innerText).toEqual('error');
          expect(rootElement.classes['validation-error--editing']).toEqual(false);
          expect(rootElement.classes['validation-error--active']).toEqual(false);
          expect(rootElement.classes['validation-error--fixed']).toEqual(false);
        });

        describe('When error is corrected first time', () => {
          let textboxElement: DebugElement;
          beforeEach(() => {
            textboxElement = rootElement.query(By.css('.input-container__textbox'));
            component.control.setValue('Valid');
            component.onFocus();
            fixture.detectChanges();
          });
          it('Validation is not triggered', () => {
            expect(rootElement.classes['validation-error--editing']).toEqual(false);
            expect(rootElement.classes['validation-error--active']).toEqual(false);
            expect(rootElement.classes['validation-error--fixed']).toEqual(false);
          });
        });
      });

      describe('When initialized with a value and formatNumber set to true', () => {
        beforeEach(() => {
          component.control = new FormControl(213123.123213, { validators: [Validators.required], updateOn: 'submit' });
          component.formatNumber = true;
          component.readonly = false;
          component.nrOfDecimals = 2;
          component.ngOnInit();
          component.writeValue(213123.123213);
          fixture.detectChanges();
        });

        it('value number is correctly formatted with 2 decimals', () => {
          expect(component.value).toEqual(213123.12);
          expect(component.control.value).toEqual(213123.12);
        });
      });

      describe('When initialized with updateOn blur and a value set', () => {
        beforeEach(() => {
          component.control = new FormControl('', { validators: [Validators.required], updateOn: 'blur' });
          component.formatNumber = true;
          component.readonly = false;
          component.nrOfDecimals = 1;
          component.ngOnInit();

          const element = rootElement.query(By.css('.input-container__textbox'));
          const input = element.nativeElement;
          element.triggerEventHandler('focus', event);
          input.value = '23.67';
          input.dispatchEvent(new Event('input'));
          element.triggerEventHandler('blur', event);
          fixture.detectChanges();
        });

        it('value number is correctly formatted with one decimal', () => {
          expect(component.value).toEqual(23.7);
          expect(component.control.value).toEqual(23.7);
        });
      });

      describe('When setting number value', () => {
        let element: DebugElement;
        beforeEach(() => {
          component.control = new FormControl('', { validators: [Validators.required], updateOn: 'change' });
          component.formatNumber = true;
          component.readonly = false;
          component.nrOfDecimals = 1;
          component.ngOnInit();

          element = rootElement.query(By.css('.input-container__textbox'));
          const input = element.nativeElement;
          element.triggerEventHandler('focus', event);
          input.value = '100.67';
          input.dispatchEvent(new Event('input'));
          element.triggerEventHandler('blur', event);
          fixture.detectChanges();
        });

        it('value number is correctly formatted', () => {
          expect(component.value).toEqual(100.7);
          expect(component.control.value).toEqual(100.7);
        });

        describe('When focused again', () => {
          beforeEach(() => {
            element.triggerEventHandler('focus', event);
            fixture.detectChanges();
          });

          it('the value should still be formatted correctly', () => {
            expect(component.value).toEqual(100.7);
            expect(component.control.value).toEqual(100.7);
          });

        });
      });
    });
  });
});
