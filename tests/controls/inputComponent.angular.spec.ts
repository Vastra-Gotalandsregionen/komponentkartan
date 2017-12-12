
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, ControlContainer } from '@angular/forms'
import { DebugElement } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { InputComponent } from '../../component-package/controls/input/input.component';

import { ErrorHandler } from '../../component-package/services/errorhandler';

import { IValidationResult, ValidationErrorState } from '../../component-package/models/validation.model';
import { TruncatePipe } from '../../component-package/pipes/truncatePipe';

import 'intl/locale-data/jsonp/se-SE.js';
import { combineAll } from 'rxjs/operator/combineAll';


describe('[InputComponent]', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let rootElement: DebugElement;
  const validationErrorStates = ValidationErrorState;

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [InputComponent, TruncatePipe],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
      providers: [ErrorHandler]
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

  describe('When initialized with invalid state', () => {
    beforeEach(() => {
      component.isInvalid = true;
      component.errormessage = 'error';
      component.readonly = false;
      component.ngOnInit();
      component.onBlur();
      fixture.detectChanges();
    });

    it('CSS Class validation-error--active is applied', () => {
      expect(rootElement.classes['validation-error--editing']).toEqual(false);
      expect(rootElement.classes['validation-error--active']).toEqual(true);
      expect(rootElement.classes['validation-error--fixed']).toEqual(false);
    });
    it('There is an error message section', () => {
      let element = rootElement.query(By.css('.input-validation_status__message'));
      expect(element.nativeElement.innerText).toEqual('error');
    });

    describe('When focused', () => {
      beforeEach(() => {
        component.onFocus();
        fixture.detectChanges();
      });
      it('CSS Class validation-error--editing is applied', () => {

        let element = rootElement.query(By.css('.input-validation_status__message'));
        expect(element.nativeElement.innerText).toEqual('error');
        expect(rootElement.classes['validation-error--editing']).toEqual(true);
        expect(rootElement.classes['validation-error--active']).toEqual(false);
        expect(rootElement.classes['validation-error--fixed']).toEqual(false);
      });

      describe('When error is corrected and field is blurred', () => {
        beforeEach(() => {
          component.isInvalid = false;
          component.onBlur();
          fixture.detectChanges();
        });
        it('CSS Class validation-error--fixed is applied', () => {
          expect(rootElement.classes['validation-error--editing']).toEqual(false);
          expect(rootElement.classes['validation-error--active']).toEqual(false);
          expect(rootElement.classes['validation-error--fixed']).toEqual(true);
        });
      })
    })
  });

  describe('When initialized with invalid state and validate on init is true', () => {
    beforeEach(() => {
      component = fixture.componentInstance;
      component.isInvalid = true;
      component.validateoninit = true
      component.errormessage = 'error';
      component.ngOnInit();
      // component.onBlur();
      fixture.detectChanges();
    });

    it('CSS Class validation-error--active is applied', () => {
      expect(rootElement.classes['validation-error--editing']).toEqual(false);
      expect(rootElement.classes['validation-error--active']).toEqual(true);
      expect(rootElement.classes['validation-error--fixed']).toEqual(false);
    });
    it('There is a error message section', () => {
      let element = rootElement.query(By.css('.input-validation_status__message'));
      expect(component.currentErrorMesage).toEqual('');
      expect(element.nativeElement.innerText).toEqual('error');
    });
  });
});

